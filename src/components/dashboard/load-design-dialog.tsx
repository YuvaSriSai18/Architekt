"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import { FolderOpen, AlertCircle } from "lucide-radix";
import { formatDistanceToNow } from "date-fns";

type Design = {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
  updatedAt?: { seconds: number; nanoseconds: number };
};

type LoadDesignDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onLoadDesign: (design: { nodes: any[]; edges: any[] }) => void;
};

export default function LoadDesignDialog({
  isOpen,
  onOpenChange,
  onLoadDesign,
}: LoadDesignDialogProps) {
  const { user } = useAuth();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      const fetchDesigns = async () => {
        setLoading(true);
        setError(null);
        try {
          const designsRef = collection(db, "users", user.uid, "designs");
          const q = query(designsRef, orderBy("updatedAt", "desc"), limit(50));
          const querySnapshot = await getDocs(q);
          const userDesigns = querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Design)
          );
          setDesigns(userDesigns);
        } catch (err) {
          console.error("Failed to fetch designs:", err);
          setError("Could not load your saved designs. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchDesigns();
    }
  }, [isOpen, user]);

  const handleLoad = (design: Design) => {
    onLoadDesign({ nodes: design.nodes, edges: design.edges });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Load Design</DialogTitle>
          <DialogDescription>
            Select one of your previously saved designs to load it onto the
            canvas.
          </DialogDescription>
        </DialogHeader>
        <div className="h-96">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-2">
              {loading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              {!loading && error && (
                 <div className="flex flex-col items-center justify-center h-full text-center text-destructive p-4 border border-dashed rounded-lg">
                    <AlertCircle className="w-10 h-10 mb-2"/>
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                 </div>
              )}
              {!loading && !error && designs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4 border border-dashed rounded-lg">
                    <FolderOpen className="w-10 h-10 mb-2"/>
                    <p className="font-semibold">No Saved Designs</p>
                    <p className="text-sm">You haven't saved any designs yet. Save a design to see it here.</p>
                </div>
              )}
              {!loading &&
                designs.map((design) => (
                  <div
                    key={design.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary"
                  >
                    <div>
                      <p className="font-semibold">{design.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {design.updatedAt
                          ? `Saved ${formatDistanceToNow(
                              new Date(design.updatedAt.seconds * 1000)
                            )} ago`
                          : "Saved recently"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLoad(design)}
                    >
                      Load
                    </Button>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
