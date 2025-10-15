import Link from "next/link";
import { Mountain } from "lucide-react";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Mountain className="h-10 w-10 mx-auto text-primary" />
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Welcome to Architekt
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account or create a new one to start designing.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
