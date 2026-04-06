"use client";

import BaseChart from "../common/BaseChart";
import { fakeWeatherData } from "../../lib/fakeData";

export default function AirQualityChart() {
  return (
    <BaseChart
      title="Air Quality"
      data={fakeWeatherData}
      dataKey="air"
      color="#7eb8f7"
      badgeLabel="24 hr"
    />
  );
}