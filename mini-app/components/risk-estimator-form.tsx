"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import RiskResults from "./risk-results";
import SimulationBox from "./simulation-box";

type FormState = {
  houseType: string;
  hazards: string[];
  roofCondition: string;
  floodHeight: string;
  windSpeed: string;
};

export default function RiskEstimatorForm() {
  const [state, setState] = useState<FormState>({
    houseType: "",
    hazards: [],
    roofCondition: "",
    floodHeight: "",
    windSpeed: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const hazardOptions = [
    "Tall trees",
    "Power lines",
    "River/Coast",
    "Loose debris",
    "Open field",
    "None",
  ];

  const handleHazardChange = (value: string) => {
    setState((prev) => {
      const newHazards = prev.hazards.includes(value)
        ? prev.hazards.filter((h) => h !== value)
        : [...prev.hazards, value];
      if (newHazards.includes("None")) {
        return { ...prev, hazards: ["None"] };
      }
      return { ...prev, hazards: newHazards };
    });
  };

  const validate = (): boolean => {
    if (!state.houseType) {
      setError("Please select a house type.");
      return false;
    }
    if (!state.roofCondition) {
      setError("Please select roof condition.");
      return false;
    }
    if (!state.floodHeight) {
      setError("Please select past flood height.");
      return false;
    }
    const wind = Number(state.windSpeed);
    if (isNaN(wind) || wind < 0) {
      setError("Wind speed must be a non‑negative number.");
      return false;
    }
    setError(null);
    return true;
  };

  const calculateScore = () => {
    if (!validate()) return;
    let total = 0;
    switch (state.houseType) {
      case "Wood":
        total += 3;
        break;
      case "Light Materials":
        total += 4;
        break;
      case "Mixed":
        total += 2;
        break;
      case "Cement":
        total += 1;
        break;
    }
    if (!state.hazards.includes("None")) {
      total += state.hazards.length;
    }
    switch (state.roofCondition) {
      case "Average":
        total += 1;
        break;
      case "Old/Damaged":
        total += 3;
        break;
    }
    switch (state.floodHeight) {
      case "Below ankle":
        total += 1;
        break;
      case "Knee-high":
        total += 2;
        break;
      case "Waist-high":
        total += 3;
        break;
    }
    const wind = Number(state.windSpeed);
    if (wind >= 150) total += 3;
    else if (wind >= 100) total += 2;
    else if (wind >= 60) total += 1;
    setScore(total);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <Label htmlFor="houseType">House Type</Label>
        <Select
          value={state.houseType}
          onValueChange={(v) => setState((s) => ({ ...s, houseType: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select house type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Wood">Wood</SelectItem>
            <SelectItem value="Cement">Cement</SelectItem>
            <SelectItem value="Mixed">Mixed</SelectItem>
            <SelectItem value="Light Materials">Light Materials</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Nearby Hazards</Label>
        <div className="flex flex-col space-y-1">
          {hazardOptions.map((h) => (
            <div key={h} className="flex items-center space-x-2">
              <Checkbox
                id={h}
                checked={state.hazards.includes(h)}
                onCheckedChange={() => handleHazardChange(h)}
              />
              <Label htmlFor={h}>{h}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="roofCondition">Roof Condition</Label>
        <Select
          value={state.roofCondition}
          onValueChange={(v) => setState((s) => ({ ...s, roofCondition: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select roof condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Average">Average</SelectItem>
            <SelectItem value="Old/Damaged">Old/Damaged</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="floodHeight">Past Flood Height</Label>
        <Select
          value={state.floodHeight}
          onValueChange={(v) => setState((s) => ({ ...s, floodHeight: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select flood height" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Below ankle">Below ankle</SelectItem>
            <SelectItem value="Knee-high">Knee-high</SelectItem>
            <SelectItem value="Waist-high">Waist-high</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="windSpeed">Expected Wind Speed(km/h)[can be changed while simulating]</Label>
        <p className="text-sm mb-1">Wind Speed: {state.windSpeed} kph</p>
        <input
          id="windSpeed"
          type="range"
          min="0"
          max="300"
          value={Number(state.windSpeed)}
          onChange={(e) => setState((s) => ({ ...s, windSpeed: e.target.value }))}
          className="w-full"
        />
      </div>
      <Button onClick={calculateScore}>Simulate Risk</Button>
      {score !== null && <RiskResults score={score} />}
      {score !== null && <SimulationBox windSpeed={Number(state.windSpeed)} />}
    </div>
  );
}
