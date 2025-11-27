"use client";

import { useState } from "react";

type RainfallIntensity = "light" | "moderate" | "heavy" | "extreme";

export default function SimulationBox() {
  const [intensity, setIntensity] = useState<RainfallIntensity>("light");

  const getRiskLevel = (intensity: RainfallIntensity) => {
    switch (intensity) {
      case "light":
        return "Low";
      case "moderate":
        return "Moderate";
      case "heavy":
        return "High";
      case "extreme":
        return "Severe";
      default:
        return "Low";
    }
  };

  const riskLevel = getRiskLevel(intensity);

  return (
    <div className="mt-6 p-4 bg-black rounded-lg text-white">
      <h2 className="text-2xl mb-4">Typhoon Simulation</h2>
      <label className="block mb-2">
        <span className="mr-2">Rainfall Intensity:</span>
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value as RainfallIntensity)}
          className="bg-white text-black rounded px-2 py-1"
        >
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="heavy">Heavy</option>
          <option value="extreme">Extreme</option>
        </select>
      </label>
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <p className="text-lg">
          Risk Level: <span className="font-semibold">{riskLevel}</span>
        </p>
      </div>
    </div>
  );
}
