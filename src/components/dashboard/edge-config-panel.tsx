
"use client";

import { useEffect, useState } from "react";
import type { Edge } from "reactflow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Trash2, Link } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type EdgeConfigPanelProps = {
  selectedEdge: Edge | null;
  onClose: () => void;
  onConfigChange: (edgeId: string, newConfig: Partial<Edge>) => void;
  onDeleteEdge: (edgeId: string) => void;
};

export default function EdgeConfigPanel({
  selectedEdge,
  onClose,
  onConfigChange,
  onDeleteEdge,
}: EdgeConfigPanelProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isDashed, setIsDashed] = useState(false);

  useEffect(() => {
    if (selectedEdge) {
      setIsAnimated(!!selectedEdge.animated);
      setIsDashed(!!selectedEdge.style?.strokeDasharray);
    }
  }, [selectedEdge]);

  if (!selectedEdge) {
    return null;
  }

  const handleAnimatedChange = (animated: boolean) => {
    setIsAnimated(animated);
    onConfigChange(selectedEdge.id, { animated });
  };

  const handleDashedChange = (dashed: boolean) => {
    setIsDashed(dashed);
    const style = dashed ? { strokeDasharray: '5,5' } : {};
    onConfigChange(selectedEdge.id, { style });
  };

  const handleDelete = () => {
    if (selectedEdge) {
      onDeleteEdge(selectedEdge.id);
    }
  };

  return (
    <aside className="w-80 border-l bg-card shrink-0 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Pathway</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="animated-switch">Animated</Label>
                <Switch 
                    id="animated-switch"
                    checked={isAnimated}
                    onCheckedChange={handleAnimatedChange}
                />
            </div>
            <p className="text-xs text-muted-foreground -mt-4">
                Adds a moving effect to the pathway.
            </p>
            <div className="flex items-center justify-between">
                <Label htmlFor="dashed-switch">Dashed Line</Label>
                <Switch 
                    id="dashed-switch"
                    checked={isDashed}
                    onCheckedChange={handleDashedChange}
                />
            </div>
             <p className="text-xs text-muted-foreground -mt-4">
                Changes the pathway to a dashed line.
            </p>
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
      <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Pathway
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the pathway.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
}

    