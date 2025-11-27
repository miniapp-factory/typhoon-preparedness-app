"use client";

interface SimulationBoxProps {
  score: number;
}

export default function SimulationBox({ score }: SimulationBoxProps) {
  const getLevel = () => {
    if (score <= 4) return "Low";
    if (score <= 8) return "Moderate";
    if (score <= 12) return "High";
    return "Severe";
  };

  const level = getLevel();

  return (
    <div className="mt-6 p-4 bg-black rounded-lg text-white">
      <h2 className="text-2xl mb-4">Typhoon Simulation</h2>
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <p className="text-lg">
          Risk Level: <span className="font-semibold">{level}</span>
        </p>
      </div>
    </div>
  );
}

