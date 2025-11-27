"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = { score: number };

export default function SimulationBox({ score }: Props) {
  // Simple placeholder simulation based on risk level
  const getLevel = () => {
    if (score <= 4) return "Low";
    if (score <= 8) return "Moderate";
    if (score <= 12) return "High";
    return "Severe";
  };

  const level = getLevel();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Simulation: {level} Risk</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          This is a placeholder simulation showing wind speed and roof
          interaction for a {level.toLowerCase()} risk level.
        </p>
        {/* In a real app, you would render a canvas or animation here */}
      </CardContent>
    </Card>
  );
}
