import ComponentContainerCard from "./ComponentContainerCard";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { DropdownMenuItemType } from "./Dropdown";
import { useEffect, useRef, useState } from "react";
export interface RevenueStatusOptionsProps {
  SeriesData: number[];
  X_AxisValue: string[];
}
const MockRevenueStatusData: RevenueStatusOptionsProps = {
  SeriesData: [
    0, 160, 100, 210, 145, 400, 155, 210, 120, 275, 110, 200, 100, 90, 220, 100, 180, 140, 315, 130,
    105, 165, 120, 160, 100, 210, 145, 400, 155, 210, 120,
  ],
  X_AxisValue: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ],
};
const MockChartOpts: ApexOptions = {
  chart: {
    height: 345,
    type: "bar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
    },
  },
  colors: ["#FFAA1D"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: false,
    width: 2,
  },
  series: [
    {
      name: "Income",
      data: MockRevenueStatusData.SeriesData,
    },
  ],
  labels: MockRevenueStatusData.X_AxisValue,
  yaxis: {
    labels: {
      offsetX: -12,
      offsetY: 2,
      formatter: function (value) {
        return value + ".vnd";
      },
    },
  },
  grid: {
    borderColor: "#e0e6ed",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    show: true,
  },
  tooltip: {
    marker: {
      show: true,
    },
    x: {
      show: true,
    },
  },
  fill: {
    opacity: 1,
  },
};
export interface RevenueStatusProps {
  chartsOpts: ApexOptions;
  menuItems: DropdownMenuItemType<ApexOptions>[];
}
const RevenuStatus = ({ chartsOpts, menuItems }: RevenueStatusProps) => {
  const chartRef = useRef<ReactApexChart>(null);

  return (
    <ComponentContainerCard title="Revenue Status" label="This Month" menuItems={menuItems}>
      <div>
        <ReactApexChart
          height={345}
          options={chartsOpts}
          series={chartsOpts.series}
          type="bar"
          ref={chartRef}
        />
      </div>
    </ComponentContainerCard>
  );
};

export const RevenueChart = RevenuStatus;
