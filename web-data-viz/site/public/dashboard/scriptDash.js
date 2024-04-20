google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    
    var cpuData = google.visualization.arrayToDataTable([
        ['Tempo', 'Uso de CPU'],
        ['09:00', 99],
        ['09:10', 96],
        ['09:20', 95],
        ['09:30', 100],
    ]);

    var cpuOptions = {
        title: 'Monitoramento da CPU',
        titleTextStyle: {
            fontSize: 18, 
            textAlign: 'center' 
        },
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
        colors: ['#007bff'],
        backgroundColor: 'transparent',
    };

    var cpuOptionsPequena = {
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
        colors: ['#007bff'],
        backgroundColor: 'transparent',
    };

    var cpuChart = new google.visualization.AreaChart(document.getElementById('cpu-chart'));
    cpuChart.draw(cpuData, cpuOptions);

    var cpuChartPequena = new google.visualization.AreaChart(document.getElementById('cpu-chart-pequena'));
    cpuChartPequena.draw(cpuData, cpuOptionsPequena);

    
    var ramData = google.visualization.arrayToDataTable([
        ['Tempo', 'Uso de RAM'],
        ['09:00', 50],
        ['09:10', 55],
        ['09:20', 78],
        ['09:30', 90],
    ]);

    var ramOptions = {
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
        colors: ['#00cc66'],
        backgroundColor: 'transparent',
    };

    var ramChartPequena = new google.visualization.AreaChart(document.getElementById('ram-chart-pequena'));
    ramChartPequena.draw(ramData, ramOptions);

    var discoData = google.visualization.arrayToDataTable([
        ['Tempo', 'Uso de Disco'],
        ['09:00', 60],
        ['09:10', 55],
        ['09:20', 70],
        ['09:30', 45],
    ]);

    var discoOptions = {
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
        colors: ['#ffcc00'],
        backgroundColor: 'transparent',
    };

    var discoChartPequena = new google.visualization.AreaChart(document.getElementById('disco-chart-pequena'));
    discoChartPequena.draw(discoData, discoOptions);

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
    redeChartPequena.draw(redeData, redeOptions);



    
}