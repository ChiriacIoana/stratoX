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

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-auto bg-[#111317] p-6">
          <h1 className="text-3xl mb-6">Dashboard</h1>

          <div className="grid grid-cols-4 gap-4 mb-6">
           <StatCard title="Temperature" value={28} unit="°C" accentColor="bg-[#fb923c]" trend={{ label: "+2.1°", positive: true }} />
            <StatCard title="Humidity" value={84} unit="%" accentColor="bg-[#2dd4bf]" trend={{ label: "+5%", positive: false }} />
            <StatCard title="Air Quality" value={110} unit="AQI" accentColor="bg-[#7eb8f7]" trend={{ label: "+10", positive: true }} />
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
