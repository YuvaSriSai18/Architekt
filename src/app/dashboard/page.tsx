
"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { generateInitialDesignFromPrompt } from "@/ai/flows/generate-initial-design-from-prompt";
import { loadAndValidateDesign } from "@/ai/flows/load-and-validate-design";

import Header from "@/components/dashboard/header";
import ComponentLibrary from "@/components/dashboard/component-library";
import ConfigPanel from "@/components/dashboard/config-panel";
import {
  ComponentConfig,
  COMPONENTS_SCHEMA,
} from "@/lib/components-schema";
import LoadDesignDialog from "@/components/dashboard/load-design-dialog";
import GenerateDesignDialog from "@/components/dashboard/generate-design-dialog";
import EdgeConfigPanel from "@/components/dashboard/edge-config-panel";

let id = 1;
const getId = () => `dnd-node_${id++}`;

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isLoadDialogOpen, setLoadDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setGenerateDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "default" }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const componentSchema = COMPONENTS_SCHEMA.find((c) => c.type === type);
      if (!componentSchema) return;

      const newNode: Node = {
        id: getId(),
        type: "default",
        position,
        data: {
          label: componentSchema.label,
          type: componentSchema.type,
          config: componentSchema.config.reduce((acc, cur) => {
            acc[cur.id] = cur.defaultValue;
            return acc;
          }, {} as ComponentConfig),
        },
        style: {
          backgroundColor: componentSchema.color,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };
  
  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };


  const updateNodeConfig = (nodeId: string, newConfig: ComponentConfig) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              config: newConfig,
            },
          };
        }
        return node;
      })
    );
    if(selectedNode?.id === nodeId){
        setSelectedNode(prev => prev ? {...prev, data: {...prev.data, config: newConfig}} : null);
    }
  };

  const updateEdgeConfig = (edgeId: string, newConfig: Partial<Edge>) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === edgeId) {
            const isAnimated = newConfig.animated;
            const isDashed = newConfig.style?.strokeDasharray;
            let edgeStyle = { ...edge.style };

            if(isDashed) {
                edgeStyle.strokeDasharray = '5,5';
            } else {
                delete edgeStyle.strokeDasharray;
            }
            
            return { ...edge, ...newConfig, style: edgeStyle };
        }
        return edge;
      })
    );
    if(selectedEdge?.id === edgeId){
        setSelectedEdge(prev => prev ? {...prev, ...newConfig} : null);
    }
  };


  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  };

  const handleDeleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    setSelectedEdge(null);
  };


  const handleLoadDesign = async (design: {
    nodes: Node[];
    edges: Edge[];
  }) => {
    const designJson = JSON.stringify(design);
    const componentsSchemaJson = JSON.stringify(COMPONENTS_SCHEMA);

    try {
      const { isValid, validationFeedback } = await loadAndValidateDesign({
        designJson,
        componentsSchema: componentsSchemaJson,
      });

      if (isValid) {
        toast({
          title: "Design Validated",
          description: "The loaded design is valid.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Design Validation Failed",
          description: validationFeedback,
        });
      }
    } catch (error) {
      console.error("Validation failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during design validation.",
      });
    }

    setNodes(design.nodes || []);
    setEdges(design.edges || []);
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const handleGenerateDesign = async (prompt: string) => {
    try {
      const { design } = await generateInitialDesignFromPrompt({ prompt });
      const parsedDesign = JSON.parse(design);

      const coloredNodes = parsedDesign.nodes.map((node: Node) => {
        const schema = COMPONENTS_SCHEMA.find(c => c.type === node.data.type);
        return {
          ...node,
          style: { backgroundColor: schema?.color || '#ffffff' }
        }
      });
      setNodes(coloredNodes || []);
      setEdges(parsedDesign.edges || []);
      setSelectedNode(null);
      setSelectedEdge(null);
      toast({
        title: "Design Generated",
        description: "A new design has been generated by AI.",
      });
    } catch (error) {
      console.error("AI generation failed:", error);
      toast({
        variant: "destructive",
        title: "AI Generation Error",
        description:
          "Could not generate design. The model may have returned an invalid format.",
      });
    }
  };
  
  const handlePaneClick = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }
  
  const defaultEdgeOptions = {
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full flex-col bg-background">
        <Header
          onLoadClick={() => setLoadDialogOpen(true)}
          onGenerateClick={() => setGenerateDialogOpen(true)}
          flowData={{ nodes, edges }}
        />
        <div className="flex flex-1 overflow-hidden">
          <ComponentLibrary />
          <main
            className="flex-1 h-full"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              onPaneClick={handlePaneClick}
              defaultEdgeOptions={defaultEdgeOptions}
              fitView
            >
              <Controls />
              <Background />
            </ReactFlow>
          </main>
          {selectedNode ? (
             <ConfigPanel
                selectedNode={selectedNode}
                onClose={() => setSelectedNode(null)}
                onConfigChange={updateNodeConfig}
                onDeleteNode={handleDeleteNode}
            />
          ) : selectedEdge ? (
            <EdgeConfigPanel
                selectedEdge={selectedEdge}
                onClose={() => setSelectedEdge(null)}
                onConfigChange={updateEdgeConfig}
                onDeleteEdge={handleDeleteEdge}
            />
          ) : (
            <ConfigPanel selectedNode={null} onClose={() => {}} onConfigChange={() => {}} onDeleteNode={() => {}} />
          )}
        </div>
      </div>
      <LoadDesignDialog
        isOpen={isLoadDialogOpen}
        onOpenChange={setLoadDialogOpen}
        onLoadDesign={handleLoadDesign}
      />
      <GenerateDesignDialog
        isOpen={isGenerateDialogOpen}
        onOpenChange={setGenerateDialogOpen}
        onGenerate={handleGenerateDesign}
      />
    </ReactFlowProvider>
  );
}

    