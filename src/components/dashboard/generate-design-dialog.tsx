"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type GenerateDesignDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGenerate: (prompt: string) => Promise<void>;
};

export default function GenerateDesignDialog({
  isOpen,
  onOpenChange,
  onGenerate,
}: GenerateDesignDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    if (!prompt) return;
    setLoading(true);
    await onGenerate(prompt);
    setLoading(false);
    onOpenChange(false);
  };
  
  const examplePrompts = [
    "A simple web application with a load balancer, two web servers, and a PostgreSQL database.",
    "A scalable microservices architecture for an e-commerce site with a cache and a message queue.",
    "A real-time chat application with a WebSocket server and a NoSQL database.",
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate Design with AI</DialogTitle>
          <DialogDescription>
            Describe the system you want to build, and our AI will generate an
            initial architecture for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="prompt">Your Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., A three-tier web application with a cache..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Examples</Label>
            <div className="flex flex-wrap gap-2 mt-2">
                {examplePrompts.map((example, i) => (
                    <Button key={i} variant="outline" size="sm" onClick={() => handleExampleClick(example)}>
                        {example.split(' ').slice(0, 4).join(' ')}...
                    </Button>
                ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleGenerateClick} disabled={loading || !prompt}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
