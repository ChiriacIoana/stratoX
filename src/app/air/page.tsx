"use client";

import { useWeatherData } from "@/src/hooks/useWeatherData";
import MetricChart from "@/src/components/weather/MetricChart";
import MetricStatsCard from "@/src/components/common/MetricStatsCard";
import MetricPageLayout from "@/src/components/layout/MetricPageLayout";

export default function AirQualityPage() {
  const data = useWeatherData();

  return (
    <MetricPageLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        
        <MetricStatsCard
          data={data}
          valueKey="air_quality"
          unit=" "
          color="#036bda"
          title="Air Quality"
        />

        <div className="bg-[#13151a] rounded-2xl p-6 w-full max-w-[900px] mx-auto lg:mx-0">
          <MetricChart
            data={data}
            valueKey="air_quality"
            color="#036bda"
            unit="  AQI"
          />
        </div>

      </div>
    </MetricPageLayout>
  );
}