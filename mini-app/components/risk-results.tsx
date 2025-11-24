"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = { score: number };

export default function RiskResults({ score }: Props) {
  const getLevel = () => {
    if (score <= 4) return "Low";
    if (score <= 8) return "Moderate";
    if (score <= 12) return "High";
    return "Severe";
  };

  const getExplanation = () => {
    const level = getLevel();
    switch (level) {
      case "Low":
        return "Minimal risk. Keep monitoring weather updates.";
      case "Moderate":
        return "Some risks detected. Secure loose items and stay alert.";
      case "High":
        return "Significant risks present. Reinforce your home and prepare emergency items.";
      case "Severe":
        return "Immediate danger. Prepare for evacuation and follow LGU instructions.";
    }
  };

  const recommendations = [
    "Secure rooftop and windows",
    "Charge devices and power banks",
    "Prepare emergency kit",
    "Monitor local weather alerts",
    "Avoid going outdoors during strong winds",
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Overall Risk Level: {getLevel()}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{getExplanation()}</p>
        <h3 className="mt-4 font-semibold">Recommended actions</h3>
        <ul className="list-disc list-inside mt-2">
          {recommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
