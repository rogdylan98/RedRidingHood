import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const state = {
    labels: ['1D', '1W', '1M', '3M', '1Y', 'ALL'],
    datasets: [
        {
            label: 'Total Share Value',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0, 0, 0, 0]
        }
    ]
}

const PortfolioChart = () => {
    return (
        <div>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text:'Portfolio Value',
                        fontSize:20
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }} />
        </div>
    )
}

export default PortfolioChart
