"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Save,
  FolderOpen,
  Download,
  BrainCircuit,
  LogOut,
  Mountain,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

type HeaderProps = {
  onLoadClick: () => void;
  onGenerateClick: () => void;
  flowData: { nodes: any[]; edges: any[] };
};

export default function Header({
  onLoadClick,
  onGenerateClick,
  flowData,
}: HeaderProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return <UserIcon className="h-5 w-5" />;
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Authenticated",
        description: "You must be logged in to save a design.",
      });
      return;
    }
    try {
      const designId = `design_${Date.now()}`;
      const designRef = doc(collection(db, "users", user.uid, "designs"), designId);

      await setDoc(designRef, {
        id: designId,
        name: `My Design - ${new Date().toLocaleDateString()}`,
        ...flowData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Design Saved",
        description: "Your architecture has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving design:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save your design. Please try again.",
      });
    }
  };

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(flowData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "architekt-design.json";
    link.click();
    toast({
        title: "Design Exported",
        description: "Your design has been downloaded as a JSON file.",
    });
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 z-10 shrink-0">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Mountain className="h-6 w-6 text-primary" />
        <span className="font-bold hidden sm:inline-block">Architekt</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" size="sm" onClick={onLoadClick}>
          <FolderOpen className="mr-2 h-4 w-4" />
          Load
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
         <Button variant="outline" size="sm" onClick={onGenerateClick}>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
