import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Hero from "@/components/ui/hero";

export default function InformationPage() {
  return (
    <main className="flex flex-col items-center justify-between gap-4">
      <Hero
        Title="Qualicase Project"
        Description="The Qualicase project was designed to support methodological decision-making consistent with recent and modern SCED standards"
      ></Hero>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Description of Qualicase and Project</CardTitle>
          <CardDescription>
            Posted on Date: 00/00/00 by{" "}
            <span className="font-semibold">XXXX XXXX</span>
          </CardDescription>
        </CardHeader>
        <CardContent>TODO [Description of Project] </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Guidance and Instructions for Use</CardTitle>
          <CardDescription>
            Posted on Date: 00/00/00 by{" "}
            <span className="font-semibold">XXXX XXXX</span>
          </CardDescription>
        </CardHeader>
        <CardContent>TODO [Guide for Use]</CardContent>
      </Card>
    </main>
  );
}
