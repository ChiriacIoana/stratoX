/**  ce vreau sa fie aici
current weather
charts
predictions overview
device status ?
last data received: time
**/

"use client";
import Sidebar from "../../components/common/Sidebar";
import StatCard from "../../components/common/StatCard";

import TemperatureChart from "../../components/weather/TemperatureChart";
import HumidityChart from "../../components/weather/HumidityChart";
import AirQualityChart from "../../components/weather/AirQualityChart";
import Navbar from "@/src/components/common/Navbar";
import { useWeatherData } from "@/src/hooks/useWeatherData";

function getAirQualityLabel(value: number) {
  if (value < 400) return "Good";
  if (value < 800) return "Moderate";
  if (value < 1200) return "Poor";
  return "Dangerous";
}

export default function Dashboard() {
  const data = useWeatherData();
  const latest = data[data.length - 1];

  const quality = getAirQualityLabel(latest?.air_quality ?? 0);
  const temperatureDif = latest
    ? (latest.temperature - data[data.length - 2].temperature).toFixed(1)
    : null;
  const humidityDif = latest
    ? (latest.humidity - data[data.length - 2].humidity).toFixed(1)
    : null;
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-auto bg-[#111317] p-6">
          <h1 className="text-3xl mb-6">Dashboard</h1>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Temperature"
              value={latest?.temperature ?? "--"}
              unit="°C"
              accentColor="bg-[#fb923c]"
              trend={{
                label: `${temperatureDif}°`,
                positive: temperatureDif
                  ? parseFloat(temperatureDif) > 0
                  : false,
              }}
            />
            <StatCard
              title="Humidity"
              value={latest?.humidity ?? "--"}
              unit="%"
              accentColor="bg-[#2dd4bf]"
              trend={{
                label: `${humidityDif}%`,
                positive: humidityDif ? parseFloat(humidityDif) > 0 : false,
              }}
            />
            <StatCard
              title="Air Quality"
              value={latest?.air_quality ?? "--"}
              unit="val"
              accentColor="bg-[#7eb8f7]"
              trend={{ label: quality, positive: quality === "Good" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <TemperatureChart />
            <HumidityChart />
            <AirQualityChart />
          </div>
        </div>
      </div>
    </div>
  );
}
