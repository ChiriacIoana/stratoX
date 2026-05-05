import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rsomoajidtfdtzuvgnhc.supabase.co",
  "sb_publishable_2jk2iyIOR1DyVMlfz3-iLg_-Oer1ejd"
);

export async function POST(req: NextRequest) {
  console.log("---- NEW REQUEST ----");

  let data;
  try {
    data = await req.json();
    console.log("RAW BODY FROM ESP:", data);
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    return NextResponse.json({ success: false, error: "Invalid JSON" });
  }

  const isoTimestamp = data.timestamp
    ? new Date(data.timestamp)
    : new Date();

  console.log("Parsed timestamp:", isoTimestamp.toISOString());

  if (isNaN(isoTimestamp.getTime())) {
    console.error("Invalid timestamp received:", data.timestamp);
  }

  const payload = {
    temperature: data.temperature,
    humidity: data.humidity,
    air_quality: data.air_quality,
    timestamp: isoTimestamp.toISOString(),

    forecast_status: data.forecast_status,
    forecast_5min: data.forecast_5min,
    trend: data.trend,
    confidence: data.confidence,
    risk_score: data.risk_score,
  };

  console.log("Payload to insert:", payload);

  if (
    payload.temperature === undefined ||
    payload.humidity === undefined ||
    payload.air_quality === undefined
  ) {
    console.error("Missing required fields!");
  }

  // insert into supabase
  const { data: insertData, error } = await supabase
    .from("weather_data")
    .insert([payload])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ success: false, error });
  }

  console.log("Insert success:", insertData);

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

