import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Hero from "@/components/ui/hero";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero
        Title="Single-case Design Aid"
        Description="This is a prototype for a decision-making support for single-case experimental design researchers"
      >
        <div className="mt-8 gap-3 flex justify-center">
          <Button size={"lg"}>Get started</Button>
          <Button size={"lg"} variant={"outline"}>
            Learn more
          </Button>
        </div>
        {/* End Buttons */}
        <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
          <span className="text-sm text-muted-foreground">
            Open Source Repository:
          </span>
          <span className="text-sm font-bold">Git </span>
          <svg
            className="h-5 w-5 text-muted-foreground"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <a
            className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
            href="#"
          >
            Setup Guide
            <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
          </a>
        </div>
      </Hero>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Version 0.0.1</CardTitle>
          <CardDescription>Date: 08/02/24</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Initial framework and settings</li>
            <li>Core navigation and persistence</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
