"use client";

import { useEffect, useState } from "react";
import MetricPageLayout from "@/src/components/layout/MetricPageLayout";
import StatCard from "@/src/components/common/StatCard";

// this is absolute bs 

export default function ForecastPage() {
  const [forecast, setForecast] = useState<any>(null);

  // async function warmupModel() {
  //   const res = await fetch("/api/weather");
  //   const json = await res.json();

  //   if (!json.success) return;

  //   for (const row of json.data) {
  //     let timestamp = Math.floor(Date.now() / 1000);


  //     if (row.timestamp) {
  //       const parsed = new Date(row.timestamp);
  //       if (!isNaN(parsed.getTime())) {
  //         timestamp = Math.floor(parsed.getTime() / 1000);
  //       }
  //     }

  //     const payload = {
  //       temperature: row.temperature,
  //       humidity: row.humidity,
  //       air_quality: Math.min(row.air_quality ?? 0, 1023),
  //       timestamp,
  //     };

  //     await fetch("http://localhost:8000/sensor-data", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //   }
  // }

//   useEffect(() => {
//   //warmupModel(); // call immediately on mount
//   const interval = setInterval(warmupModel, 500000);
//   return () => clearInterval(interval);
// }, []);

  useEffect(() => {
  async function fetchData() {
  const res = await fetch("/api/weather");
  const json = await res.json();

  if (!json.success || json.data.length === 0) return;

  const latest = json.data[json.data.length - 1];

  setForecast(latest);
}

  fetchData();
  const interval = setInterval(fetchData, 2000);
  return () => clearInterval(interval);
}, []);

  
if (!forecast) {
  return <div className="p-6 text-white">Loading...</div>;
}

if (forecast.forecast_status === "warming_up") {
  return <div className="p-6 text-white">Warming up model...</div>;
}

  return (
    <MetricPageLayout>
      <div className="flex flex-col gap-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

          <StatCard
            title="Current AQI"
            value={forecast.air_quality}
            unit=""
            accentColor="bg-[#036bda]"
          />

          <StatCard
            title="Forecast (5min)"
            value={forecast.forecast_5min}
            unit=""
            accentColor="bg-[#2b6cb0]"
          />

          <StatCard
            title="Trend"
            value={forecast.trend}
            unit=""
            accentColor="bg-[#805ad5]"
          />

          <StatCard
            title="Confidence"
            value={forecast.confidence ? (forecast.confidence * 100).toFixed(1) : "0"}
            unit="%"
            accentColor="bg-[#38a169]"
          />

          <StatCard
            title="Risk Score"
            value={forecast.risk_score ? forecast.risk_score.toFixed(3) : "0"}
            unit=""
            accentColor="bg-[#e53e3e]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

          <div className="bg-[#13151a] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Air Quality Forecast
            </h2>

            <div className="space-y-4">

              {/* <div className="p-4 rounded-xl bg-[#0f1115] flex justify-between">
                <span>1 minute</span>
                <span className="text-[#036bda] font-bold">
                  {forecast.forecast_1min}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1115] flex justify-between">
                <span>3 minutes</span>
                <span className="text-[#036bda] font-bold">
                  {forecast.forecast_3min}
                </span>
              </div> */}

              <div className="p-4 rounded-xl bg-[#0f1115] flex justify-between">
                <span>5 minutes</span>
                <span className="text-[#036bda] font-bold">
                  {forecast.forecast_5min}
                </span>
              </div>

            </div>
          </div>

          <div className="bg-[#13151a] rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              System Status
            </h2>

            <div className="space-y-3 text-sm text-gray-300">

              <p>
                Status:{" "}
                <span className="text-white">
                  {forecast.forecast_status}
                </span>
              </p>

              <p>
                Model:{" "}
                <span className="text-white">
                  EMA + Forecast Net
                </span>
              </p>

              <p>
                Risk Level:{" "}
                <span className="text-white">
                  {forecast.risk_score < 0.1
                    ? "Low"
                    : forecast.risk_score < 0.3
                    ? "Medium"
                    : "High"}
                </span>
              </p>

            </div>
          </div>

        </div>

      </div>
    </MetricPageLayout>
  );
}