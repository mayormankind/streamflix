"use client"

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ViewershipChartProps {
  data: { day: string; views: number }[]
}

export function ViewershipChart({ data }: ViewershipChartProps) {
  return (
    <ChartContainer
      config={{
        views: {
          label: "Streams",
          color: "var(--primary)",
        },
      }}
      className="h-full w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />

        <Area
          type="monotone"
          dataKey="views"
          stroke="var(--color-views)"
          fill="url(#colorViews)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartContainer>
  )
}
