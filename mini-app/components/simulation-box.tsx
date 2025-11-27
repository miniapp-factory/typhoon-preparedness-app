"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

type Props = { score: number };

export default function SimulationBox({ score }: Props) {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const getLevel = () => {
    if (score <= 4) return "Low";
    if (score <= 8) return "Moderate";
    if (score <= 12) return "High";
    return "Severe";
  };

  const level = getLevel();

  // Map level to wind speed factor
  const windFactor = {
    Low: 0.2,
    Moderate: 0.5,
    High: 0.8,
    Severe: 1.0,
  }[level];

  return (
    <div className="mt-6 p-4 bg-black rounded-lg">
      <h2 className="text-white mb-4">Simulation: {level} Risk</h2>
      <div className="relative w-full h-64 bg-black rounded-md overflow-hidden">
        {/* House */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: "120px",
            height: "80px",
            backgroundColor: "#FFFFFF",
            borderTop: "80px solid #FFFFFF",
            borderLeft: "60px solid transparent",
            borderRight: "60px solid transparent",
          }}
        >
          {/* Roof */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "-60px",
              width: "240px",
              height: "80px",
              backgroundColor: "#FFA500",
            }}
          />
        </div>
        {/* Wind particles */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "#000000" } },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#0000FF" },
              links: { enable: false },
              move: {
                direction: "right",
                enable: true,
                outModes: { default: "out" },
                speed: windFactor * 5,
                straight: true,
              },
              number: { value: 50, density: { enable: true, area: 800 } },
              opacity: { value: 0.7 },
              shape: { type: "circle" },
              size: { value: 3 },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
