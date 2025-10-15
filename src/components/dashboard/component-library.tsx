"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { COMPONENTS_SCHEMA } from "@/lib/components-schema";

export default function ComponentLibrary() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 border-r bg-card p-4 shrink-0 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <ScrollArea className="h-full">
        <div className="grid grid-cols-2 gap-4">
          {COMPONENTS_SCHEMA.map((component) => (
            <div
              key={component.type}
              className="group flex flex-col items-center p-2 border rounded-lg cursor-grab bg-secondary/50 hover:bg-secondary hover:shadow-md transition-all"
              onDragStart={(event) => onDragStart(event, component.type)}
              draggable
            >
              <component.Icon className="w-10 h-10 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
              <span className="mt-2 text-xs text-center font-medium">
                {component.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
