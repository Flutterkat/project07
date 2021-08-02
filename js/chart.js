const line = document.getElementById('lineChart');
const bar = document.getElementById('barChart');
const doughnut = document.getElementById('doughnutChart');
const chartLinks = document.getElementById('chart-links');
const hourly = document.getElementsByClassName('hourly');
const daily = document.getElementsByClassName('daily');
const weekly = document.getElementsByClassName('weekly');
const monthly = document.getElementsByClassName('monthly');
const bellIcon = document.querySelector('.bell-icon');
const hourlyLabels = ['00:00', '00:15', '00:30', '00:45', '01:00'];
const hourlyData = [50, 75, 35, 45, 26];
const dailyLabels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const dailyData = [1760, 1390, 1530, 1850, 1200, 1300, 1200];
const weeklyLabels = ['June week 1', 'June week 2', 'June week 3', 'June week 4'];
const weeklyData = [7500, 9750, 4632, 6990];
const monthlyLabels = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June'];
const monthlyData = [20500, 15750, 16632, 23990, 10500, 25700];
let lineChart = '';



Chart.defaults.scale.beginAtZero = true;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.title.display = true;

let graphfunc = (type, labels, data) => {
     lineChart = new Chart(line, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Hourly',
                data: data,
                backgroundColor: [
                    'rgba(164, 166, 222, .5)'
                ],
                borderColor: [
                    'rgba(164, 166, 222, 1)'
                ],
                borderWidth: 2,
    
                fill: {
                    target: 'origin',
                    below: 'rgba(164, 166, 222, .5)'
                },
                tension: .5,
            }]
        },
});
}

//
graphfunc('line', hourlyLabels, hourlyData);
let canvas = document.createElement('canvas')
let section = document.getElementById('chart-divs')
chartLinks.addEventListener('click', (e)=> {
    let target = e.target.className;
    if (target === 'chart-link hourly') {
        lineChart.destroy();
        graphfunc('line', hourlyLabels, hourlyData);
    }
    if (target === 'chart-link daily') {
        lineChart.destroy();
        graphfunc('line', dailyLabels, dailyData);
    }
    if (target === 'chart-link weekly') {
        lineChart.destroy();
        graphfunc('line', weeklyLabels, weeklyData);
    }
    if (target === 'chart-link monthly') {
        lineChart.destroy();
        graphfunc('line', monthlyLabels, monthlyData);
    }
});

let barChart = new Chart(bar, {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: 'Daily',
            data: dailyData,
            backgroundColor: ['#7477bf']
        }],
    }
});

let doughnutChart = new Chart(doughnut, {
    type: 'doughnut',
    data: {
        labels: ['Desktop', 'Tablet', 'Phones'],
        datasets: [{
            label: 'Mobile Users',
            data: [21567, 15689, 30245],
            backgroundColor: ['#7477bf', '#81c98f', '#51b6c8']
        }],
    },
    options: {
        layout:{
            
        },
        plugins: {
            height: 250,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 25,
                    
                }
            }
        }
    }
});

