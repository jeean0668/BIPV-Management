import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js에서 사용할 요소들을 등록합니다.
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  buildPropos: { [key: string]: { name: string; count: number } };
}

const BuildingBarChart: React.FC<BarChartProps> = ({ buildPropos }) => {
  // buildPropos에서 용도별 이름과 개수를 추출하여 그래프 데이터로 변환
  const labels = Object.keys(buildPropos).map((key) => buildPropos[key].name);
  const dataValues = Object.keys(buildPropos).map((key) => buildPropos[key].count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '건물 개수',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 비활성화
      },
      title: {
        display: true,
        text: '건물 용도별 개수',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '개수',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BuildingBarChart;
