import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const state = {
    labels: ['1D', '2D', '3D', '4D', '5D', '6D'],
    datasets: [
        {
            label: 'Total Share Value',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgb(0, 0, 0, 1)',
            borderColor: 'rgba(195,245,60)',
            borderWidth: 2,
            data: [0, 31345.67, 43893.62, 57543.93, 38162.80]
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
