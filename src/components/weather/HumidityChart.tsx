"use client";

import BaseChart from "../common/BaseChart";
import { fakeWeatherData } from "../../lib/fakeData";

export default function HumidityChart() {
  return (
    <BaseChart
      title="Humidity"
      data={fakeWeatherData}
      dataKey="humidity"
      color="#2dd4bf"
      badgeLabel="24 hr"
    />
  );
}