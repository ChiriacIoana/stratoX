"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Navbar from "@/src/components/common/Navbar";
import Sidebar from "@/src/components/common/Sidebar";

Chart.register(...registerables);

// this is a mess change it
const hours = [
  "12am",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12pm",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
];

// put real data after you get some more
const temps = [
  19, 19, 18, 18, 19, 20, 21, 23, 25, 26, 28, 29, 30, 32, 33, 32, 30, 28, 27,
  26, 26, 25, 25, 25,
];

const CURRENT_IDX = 13;
const HIGH = 33;
const LOW = 19;
const AVG = 26;

export default function TemperaturePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    // no idea what this is
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight || 400);
    grad.addColorStop(0, "rgba(251,146,60,0.22)");
    grad.addColorStop(0.6, "rgba(251,146,60,0.05)");
    grad.addColorStop(1, "rgba(251,146,60,0)");

    const pointColors = temps.map((_, i) =>
      i === CURRENT_IDX ? "#fff" : "transparent",
    );
    const pointBorderColors = temps.map((_, i) =>
      i === CURRENT_IDX ? "#fb923c" : "transparent",
    );
    const pointRadii = temps.map((_, i) => (i === CURRENT_IDX ? 5 : 0));
    const pointHoverRadii = temps.map((_, i) => (i === CURRENT_IDX ? 7 : 5));

    chartRef.current = new Chart(canvas, {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            data: temps,
            borderColor: "#fb923c",
            borderWidth: 2.5,
            backgroundColor: grad,
            fill: true,
            tension: 0.45,
            pointRadius: pointRadii,
            pointHoverRadius: pointHoverRadii,
            pointBackgroundColor: pointColors,
            pointBorderColor: pointBorderColors,
            pointBorderWidth: 2,
          },
          {
            data: temps.map(() => AVG),
            borderColor: "rgba(251,146,60,0.18)",
            borderWidth: 1,
            borderDash: [4, 4],
            backgroundColor: "transparent",
            fill: false,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a1c24",
            borderColor: "rgba(251,146,60,0.25)",
            borderWidth: 1,
            titleColor: "rgba(255,255,255,0.4)",
            bodyColor: "#fff",
            padding: 12,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              title: (items) => items[0].label + ":00",
              label: (item) =>
                item.datasetIndex === 0
                  ? " " + Math.round(item.parsed.y ?? 0) + "°C"
                  : "",
              afterLabel: (item) =>
                item.datasetIndex === 0 && item.dataIndex === CURRENT_IDX
                  ? "  ← now"
                  : "",
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.035)" },
            border: { display: false },
            ticks: {
              color: "rgba(255,255,255,0.22)",
              font: { size: 10, family: "DM Sans, sans-serif" },
              maxTicksLimit: 12,
              callback: (_val, i) => (i % 3 === 0 ? hours[i] : ""),
            },
          },
          y: {
            position: "right",
            grid: { color: "rgba(255,255,255,0.035)" },
            border: { display: false },
            min: 14,
            max: 36,
            ticks: {
              color: "rgba(255,255,255,0.22)",
              font: { size: 10, family: "DM Sans, sans-serif" },
              stepSize: 4,
              callback: (v) => v + "°",
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 bg-[#111317] p-7 overflow-hidden">
          <div className="grid grid-cols-[320px_1fr] gap-[18px] h-full">
            {/* this is fine ig, maybe make smaller */}
            <div className="bg-[#13151a] border border-white/[0.06] rounded-[20px] p-[32px_28px] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/30 uppercase tracking-[1px] mb-[18px]">
                  Current temperature
                </p>
                <div className="flex items-start leading-none">
                  <span className="text-[96px] font-bold tracking-[-5px] text-white leading-none">
                    28
                  </span>
                  <span className="text-[32px] font-light text-white/40 mt-[14px] ml-[2px]">
                    °C
                  </span>
                </div>
                <p className="text-[13px] text-white/35 mt-3 tracking-[0.2px]">
                  Rainy storm clouds · Florida, US
                </p>
              </div>

              <div>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex flex-col">
                  {[
                    {
                      label: "Highest today",
                      value: `${HIGH}°C`,
                      color: "#f87171",
                    },
                    {
                      label: "Lowest today",
                      value: `${LOW}°C`,
                      color: "#7eb8f7",
                    },
                    {
                      label: "Day average",
                      value: `${AVG}°C`,
                      color: "#fb923c",
                    },
                  ].map((s, i, arr) => (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between py-[14px] ${
                        i < arr.length - 1 ? "border-b border-white/[0.05]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-[10px]">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: s.color }}
                        />
                        <span className="text-[12px] text-white/[0.38]">
                          {s.label}
                        </span>
                      </div>
                      <span
                        className="text-[18px] font-semibold tracking-[-0.5px]"
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* make smaller and responsive*/}
            <div className="bg-[#13151a] border border-white/[0.06] rounded-[20px] p-[28px_30px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] font-medium text-white/65">
                  Today's temperature curve
                </span>
                <span className="text-[11px] text-white/25">
                  April 13, 2026 · hourly
                </span>
              </div>
              <div className="flex-1 relative min-h-0">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label="Hourly temperature curve for today, rising from 19°C at midnight to a peak of 33°C in the afternoon then cooling to 25°C"
                >
                  Hourly temperature: 19°C at midnight, rising to 33°C at 1pm,
                  then cooling to 25°C by midnight.
                </canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
