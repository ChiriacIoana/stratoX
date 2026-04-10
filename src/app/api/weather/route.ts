import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rsomoajidtfdtzuvgnhc.supabase.co",
  "sb_publishable_2jk2iyIOR1DyVMlfz3-iLg_-Oer1ejd"
);

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { error } = await supabase
    .from("weather_data")
    .insert([
      {
        temperature: data.temperature,
        humidity: data.humidity,
        air_quality: data.air_quality,
        timestamp: data.timestamp || new Date(),
      },
    ]);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const {data, error}  =await supabase
    .from("weather_data")
    .select("*")
    .order("timestamp", { ascending: true })
    .limit(50);


  if (error) {
    return NextResponse.json({
      success: false,
      error
    })
  }

  return NextResponse.json({
    success: true,
    data,
  });
}