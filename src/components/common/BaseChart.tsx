"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  TooltipContentProps,
} from "recharts";

type DataPoint = Record<string, string | number>;

type Props = {
  title: string;
  data: DataPoint[];
  dataKey: string;
  color: string;      
  badgeLabel?: string;
};

function CustomTooltip({ active, payload, label }: TooltipContentProps<any, any>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e2028] border border-white/10 rounded-xl px-3 py-2 text-xs">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-white font-medium">{payload[0].value}</p>
    </div>
  );
}

export default function BaseChart({ title, data, dataKey, color, badgeLabel = "24 hr" }: Props) {
 
  const fillId = `fill-${dataKey}`;

  return (
    <div className="bg-[#13151a] border border-white/[0.06] rounded-2xl p-[18px_20px] w-full">
    
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-medium text-white/75 tracking-[0.2px]">
          {title}
        </span>
        <span
          className="text-[10px] px-2 py-[3px] rounded-full border"
          style={{
            color,
            borderColor: `${color}40`,
            background: `${color}14`,
          }}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="transparent"
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="transparent"
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
              tickLine={false}
            />
            <Tooltip content={CustomTooltip} cursor={{ stroke: "rgba(255,255,255,0.08)" }} wrapperStyle={{ outline: "none" }} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${fillId})`}
              dot={false}
              activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}