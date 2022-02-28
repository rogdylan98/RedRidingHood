import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);



const PortfolioChart = ( { endpoint }) => {
    const data_list = [];
    for (let i = 0; i < 5; i++) {
        let random;
        if (endpoint === 0) {
            random = Math.random() * (1000);
        } else {
            random = Math.random() * ((endpoint + 1000) - (endpoint - 1000) + (endpoint - 1000))
        }
        data_list.push(random)
    }
    data_list.push(endpoint)
    console.log(data_list)

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
                data: data_list
            }
        ]
    }

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
