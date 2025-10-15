"use client";

import { useEffect, useState } from "react";
import type { Node } from "reactflow";
import {
  COMPONENTS_SCHEMA,
  ComponentConfig,
  ConfigParameter,
} from "@/lib/components-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Settings } from "lucide-react";

type ConfigPanelProps = {
  selectedNode: Node | null;
  onClose: () => void;
  onConfigChange: (nodeId: string, newConfig: ComponentConfig) => void;
};

export default function ConfigPanel({
  selectedNode,
  onClose,
  onConfigChange,
}: ConfigPanelProps) {
  const [config, setConfig] = useState<ComponentConfig>({});

  useEffect(() => {
    if (selectedNode) {
      setConfig(selectedNode.data.config || {});
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <aside className="w-80 border-l bg-card p-4 shrink-0 hidden md:flex flex-col items-center justify-center text-center">
         <Settings className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">Select a component</h3>
        <p className="text-sm text-muted-foreground/80">Select a component on the canvas to view and edit its properties.</p>
      </aside>
    );
  }

  const componentSchema = COMPONENTS_SCHEMA.find(
    (c) => c.type === selectedNode.data.type
  );

  const handleInputChange = (id: string, value: string | number) => {
    const newConfig = { ...config, [id]: value };
    setConfig(newConfig);
    onConfigChange(selectedNode.id, newConfig);
  };

  const renderField = (param: ConfigParameter) => {
    const value = config[param.id];
    switch (param.type) {
      case "string":
        return (
          <Input
            value={value as string}
            onChange={(e) => handleInputChange(param.id, e.target.value)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={value as number}
            onChange={(e) => handleInputChange(param.id, Number(e.target.value))}
          />
        );
      case "enum":
        return (
          <Select
            value={value as string}
            onValueChange={(val) => handleInputChange(param.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${param.label}`} />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 border-l bg-card shrink-0 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{selectedNode.data.label}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {componentSchema ? (
            componentSchema.config.map((param) => (
              <div key={param.id} className="space-y-2">
                <Label htmlFor={param.id}>{param.label}</Label>
                {renderField(param)}
                {param.description && (
                  <p className="text-xs text-muted-foreground">
                    {param.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No configuration available for this component.</p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
