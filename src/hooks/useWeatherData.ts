'use client';

import { useEffect, useState } from "react";

export type WeatherPoint = {
    time: string;
    temperature: number;
    humidity: number;
    air_quality: number;
};

export function useWeatherData() {
    const [data, setData] = useState<WeatherPoint[]>([]);

    useEffect(() => {
        const fetchData = () => {
            fetch("/api/weather")
                .then((res) => res.json())
                .then((res) => {
                    const formatted = res.data.map((item: any) => ({
                         time: new Date(item.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                    }),
                        temperature: item.temperature,
                        humidity: item.humidity,
                        air_quality: item.air_quality,
                    }))
                    setData(formatted);
                });
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    return data;
}