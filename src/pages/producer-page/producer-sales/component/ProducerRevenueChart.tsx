import { DropdownMenuItemType } from "@/my-component/Dropdown";
import { RevenueChart, RevenueStatusOptionsProps } from "@/my-component/RevenueChart";
import { SaleSumaryWidgetType, SaleWidget } from "@/my-component/SimpleWidget";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const SaleWidgetsData: SaleSumaryWidgetType[] = [
  {
    title: "WEEKLY SALES",
    count: "$24,500",
  },
  {
    title: "ORDERS PLACED",
    count: "520",
  },
  {
    title: "AVG. VALUE",
    count: "$80.5",
  },
];
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
const MockMenuItems: DropdownMenuItemType<ApexOptions>[] = [
  {
    text: "last month",
    itemHref: "#",
    item: MockChartOpts,
  },
  {
    text: "last week",
    itemHref: "#",
    item: MockChartOpts,
  },
];
export default function ProducerSale() {
  const [SaleWidgets, setSaleWidgets] = useState<SaleSumaryWidgetType[]>([]);
  const [chartOptions, setChartOptions] = useState(MockChartOpts);
  //   const handleUpdateChart = (newOpt: ApexOptions) => {
  //     setChartOptions({ ...chartOptions, newOpt });
  //   };
  useEffect(() => {
    setSaleWidgets(SaleWidgetsData);
    let menuItem: DropdownMenuItemType<ApexOptions>[] = [
      {
        text: "last month",
        itemHref: "#",
        item: chartOptions,
        onClickEvent: (chartOpt: ApexOptions) => {
          chartOpt.xaxis;
          //handleUpdateChart(chartOpt);
        },
      },
      {
        text: "last week",
        itemHref: "#",
        item: chartOptions,
        onClickEvent: (chartOpt: ApexOptions) => {
          //handleUpdateChart(chartOpt);
        },
      },
    ];
    // MockMenuItems.forEach((item, idx) => {
    //   item.onClickEvent = (chartOpt: ApexOptions) => {
    //     chartOpt.colors = ["#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")];
    //     handleUpdateChart(chartOpt);
    //   };
    // });
  }, []);

  return (
    <>
      <div>
        <Row>
          <Col xs={10}>
            <RevenueChart chartsOpts={chartOptions} menuItems={MockMenuItems} />
            <SaleWidget saleSummaryWidgets={SaleWidgets as SaleSumaryWidgetType[]} />
          </Col>
        </Row>
      </div>
    </>
  );
}
