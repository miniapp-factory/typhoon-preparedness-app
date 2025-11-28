"use client";

import { useEffect, useRef } from "react";

interface SimulationBoxProps {
  windSpeed: number;
}

export default function SimulationBox({ windSpeed }: SimulationBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roofXRef = useRef(0);
  const roofYRef = useRef(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      if (!ctx) return;
      // Clear canvas
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // House base
      const houseWidth = 40;
      const houseHeight = 30;
      const houseX = canvas.width / 2 - houseWidth / 2;
      const houseY = canvas.height - houseHeight - 10;

      // Shake house if windSpeed >= 120
      let shakeOffset = 0;
      if (windSpeed >= 120) {
        shakeOffset = Math.floor(Math.random() * 4) - 2; // -2 to 2
      }

      // Draw house body
      ctx.fillStyle = "#FFF";
      ctx.fillRect(houseX + shakeOffset, houseY, houseWidth, houseHeight);

      // Roof
      const roofHeight = 20;
      const roofX = houseX + shakeOffset;
      const roofY = houseY - roofHeight;

      // Roof detachment
      if (windSpeed >= 180) {
        roofXRef.current += 1;
        roofYRef.current -= 0.5;
      }

      const currentRoofX = roofX + roofXRef.current;
      const currentRoofY = roofY + roofYRef.current;

      ctx.fillStyle = "#00BFFF";
      ctx.beginPath();
      ctx.moveTo(currentRoofX, currentRoofY);
      ctx.lineTo(currentRoofX + houseWidth, currentRoofY);
      ctx.lineTo(currentRoofX + houseWidth / 2, currentRoofY - roofHeight);
      ctx.closePath();
      ctx.fill();

      // Wind lines
      const lineCount = 10;
      const speed = Math.max(1, windSpeed / 10);
      offsetRef.current = (offsetRef.current + speed) % canvas.width;

      ctx.strokeStyle = "#888";
      ctx.lineWidth = 2;
      for (let i = 0; i < lineCount; i++) {
        const y = (i * 20 + offsetRef.current) % canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [windSpeed]);

  return (
    <div className="mt-6">
      <h2 className="text-white mb-4">Typhoon Wind Simulator</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="bg-black rounded"
      />
    </div>
  );
}

