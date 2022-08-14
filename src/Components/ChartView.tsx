import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ConfigType {
  options: ApexOptions;
  series: ApexOptions["series"];
}

interface PropType {
  data: [number, number][];
}

function ChartView(props: PropType) {
  const [config, setConfig] = useState<ConfigType>({
    options: {
      chart: {
        id: "area-datetime",
        toolbar: {
          show: false,
        },
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396",
              },
            },
          },
        ],
        xaxis: [],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        min: props.data[0][0],
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },
    series: [
      {
        data: props.data,
      },
    ],
  });


  return (
    <div>
      <ReactApexChart
        options={config.options}
        series={config.series}
        type="area"
        width="1000"
      />
    </div>
  );
}

export default ChartView;
