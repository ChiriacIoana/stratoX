"use client";

import BaseChart from "../common/BaseChart";
import { useWeatherData } from "../../hooks/useWeatherData";

export default function HumidityChart() {
  const data = useWeatherData();


  return (
    <BaseChart
      title="Humidity"
      data={data}
      dataKey="humidity"
      color="#2dd4bf"
      badgeLabel="24 hr"
    />
  );
}