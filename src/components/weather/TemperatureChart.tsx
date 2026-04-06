"use client";

import BaseChart from "../common/BaseChart";
import { fakeWeatherData } from "../../lib/fakeData";

export default function TemperatureChart() {
  return (
    <BaseChart
      title="Temperature"
      data={fakeWeatherData}
      dataKey="temperature"
      color="#fb923c"
      badgeLabel="24 hr"
    />
  );
}