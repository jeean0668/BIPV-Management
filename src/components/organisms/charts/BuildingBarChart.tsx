"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

interface BuildingBarChartProps {
  buildPropos: { [key: string]: { name: string; count: number } };
}

// 용도별 데이터와 색상을 정의
const chartConfig = {
  building: {
    label: "Building Count",
    color: "#2563eb",
  },
} satisfies ChartConfig

// 가장 개수가 많은 5개 항목만 선택하는 함수
function getTop5BuildingPurposes(buildPropos: { [key: string]: { name: string; count: number } }) {
  const buildingArray = Object.keys(buildPropos).map(key => ({
    name: buildPropos[key].name,
    count: buildPropos[key].count,
  }));

  // count 값을 기준으로 내림차순 정렬 후 상위 5개 항목 선택
  return buildingArray
    .sort((a, b) => b.count - a.count) // 내림차순 정렬
    .slice(0, 5); // 상위 5개만 반환
}

export function BuildingBarChart({ buildPropos }: BuildingBarChartProps) {
  // 상위 5개 항목만 추출
  const chartData = getTop5BuildingPurposes(buildPropos);

  return (
    // <div className="overflow-x-auto w-full">
      // <div className="min-w-[600px]"> {/* 최소 너비 설정 */}
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData} width={600} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)} // 이름이 길면 4자만 표시
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="var(--color-building)" radius={4} />
          </BarChart>
        </ChartContainer>
      // </div>
    // </div>
  );
}
