google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() { 

    var redeData = google.visualization.arrayToDataTable([
        ['Tempo', 'Uso de Rede'],
        ['09:00', 50],
        ['09:10', 55],
        ['09:20', 53],
        ['09:30', 60],
    ]);

    var redeOptions = {        
        curveType: 'function',
        legend: { position: 'none' },
        areaOpacity: 0.3,
        hAxis: {
            title: 'Tempo',
            textStyle: { color: '#999' },
        },
        vAxis: {
            textStyle: { color: '#999' },
        },
        lineWidth: 2,
        colors: ['#ff9966'],
        backgroundColor: 'transparent',
    };

    var redeChartPequena = new google.visualization.AreaChart(document.getElementById('rede-chart-pequena'));
    redeChartPequena.draw(redeData, redeOptionsPequena);

    var redeChart = new google.visualization.AreaChart(document.getElementById('rede-chart'));
    redeChart.draw(redeData, redeOptions);   
    
}