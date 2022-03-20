import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Dataset {
  label: string;
  data: string[];
  borderWidth: number;
  backgroundColor: string[];
}

interface ChartParams {
  chartdata: {
    datasets: Dataset[];
  };
  className?: string;
}

export default function Chart({ chartdata, className }: ChartParams) {
  return (
    <>
      <div className={className || ''}>
        <Bar data={chartdata} />
      </div>
    </>
  );
}
