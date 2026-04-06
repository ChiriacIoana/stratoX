type Props = {
  title: string;
  value: number | string;
  unit: string;
  accentColor?: string;   // tailwind bg color e.g. "bg-[#7eb8f7]"
  trend?: {
    label: string;
    positive: boolean;
  };
};

export default function StatCard({
  title,
  value,
  unit,
  accentColor = "bg-[#7eb8f7]",
  trend,
}: Props) {
  return (
    <div className="bg-[#13151a] border border-white/[0.06] rounded-2xl p-[18px_20px] w-full">
      {/* Label */}
      <div className="flex items-center gap-[6px] mb-[10px]">
        <span className={`w-[6px] h-[6px] rounded-full shrink-0 ${accentColor}`} />
        <p className="text-[11px] font-medium text-white/40 uppercase tracking-[0.8px]">
          {title}
        </p>
      </div>

      {/* Value */}
      <h2 className="text-[30px] font-semibold tracking-[-1px] leading-none text-white">
        {value}
        <span className="text-sm font-normal text-white/45 ml-[3px]">{unit}</span>
      </h2>

      {/* Trend */}
      {trend && (
        <p className="mt-[10px] text-[11px] text-white/30">
          <span className={trend.positive ? "text-[#4ade80]" : "text-[#f87171]"}>
            {trend.label}
          </span>{" "}
          from yesterday
        </p>
      )}
    </div>
  );
}