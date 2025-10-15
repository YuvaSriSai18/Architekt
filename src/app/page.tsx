
'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  LayoutTemplate,
  Download,
  Share2,
  BrainCircuit,
  MousePointer,
  Cable,
  Settings2,
} from "lucide-react";
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "1");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
      title: "Interactive Design Canvas",
      description:
        "A drag-and-drop interface for visually constructing system architectures.",
    },
    {
      icon: <Settings2 className="w-8 h-8 text-primary" />,
      title: "Configurable Components",
      description:
        "Dynamically configure parameters for each component in your design.",
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "Save & Export",
      description:
        "Save designs to the cloud and export them as JSON for sharing and documentation.",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      title: "AI-Powered Generation",
      description:
        "Generate initial architecture diagrams from a simple text prompt.",
    },
  ];

  const howItWorks = [
    {
      icon: <MousePointer className="w-10 h-10 text-primary" />,
      title: "1. Drag & Drop",
      description:
        "Select components from the library and drop them onto the canvas.",
    },
    {
      icon: <Cable className="w-10 h-10 text-primary" />,
      title: "2. Connect & Configure",
      description:
        "Draw pathways between components and configure their settings in the side panel.",
    },
    {
      icon: <Share2 className="w-10 h-10 text-primary" />,
      title: "3. Save & Share",
      description:
        "Save your complete design to the cloud or export it as a JSON file.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section
          className={cn(
            "w-full py-20 md:py-32 lg:py-40 transition-opacity duration-1000 ease-in",
            isMounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none">
                    Visually Design Scalable Systems
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Architekt is an intuitive playground to design, configure,
                    and save your system architectures with ease. Powered by AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Get Started Free</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <div className="relative transform-gpu transition-transform duration-500 hover:scale-105">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    data-ai-hint={heroImage.imageHint}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features for Modern Architects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to bring your system designs to life, from
                  concept to configuration-as-code.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full transform-gpu transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get Started in 3 Simple Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Go from idea to a shareable architecture diagram in minutes.
                </p>
              </div>
            </div>
             <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:max-w-none lg:grid-cols-3">
              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-4 p-4">
                  <div className="flex items-center justify-center bg-primary/10 rounded-full p-4 w-20 h-20 mb-4 border-2 border-primary/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to build your next masterpiece?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up and start designing your system architecture in minutes.
                No credit card required.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/dashboard">Start Designing Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
