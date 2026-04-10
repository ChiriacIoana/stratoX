"use client";

import BaseChart from "../common/BaseChart";
import { useWeatherData } from "../../hooks/useWeatherData";

export default function AirQualityChart() {
  const data = useWeatherData();

  return (
    <BaseChart
      title="Air Quality"
      data={data}
      dataKey="air_quality"
      color="#7eb8f7"
      badgeLabel="24 hr"
    />
  );
}