google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(gerarGraficoMemoriaRamUso);
google.charts.setOnLoadCallback(gerarGraficoDiscoUso);
google.charts.setOnLoadCallback(gerarGraficoUtilizacaoCPU);

function gerarGraficoMemoriaRamUso() {
    let totalMemory = 16; // Total de memória RAM disponível (em GB)
    let usedMemory = 10; // Memória RAM usada (em GB)
    let memoryUsage = (usedMemory / totalMemory) * 100; // Uso de memória RAM em porcentagem

 
    var data = google.visualization.arrayToDataTable([
        ['Tipo', 'Uso de RAM'],
        ['Usado', usedMemory], // Total utilizado
        ['Livre', totalMemory - usedMemory], // Total disponível
       
    ]);

   
    var options = {
        pieHole: 0.5,
        pieSliceText: 'percentage', 
        pieSliceTextStyle: {
            color: '#ffffff',
            fontSize: '12px',
            bold: true
        },
        slices: {
            0: { color: '#FFDC83',  }, // Cor para o total utilizado
            1: { color: '#8ee79a', } // Cor para o total disponível
        },
        legend: 'none', // Ocultar a legenda
        tooltip: { trigger: 'none' }, // Desativar tooltips
        enableInteractivity: false, // Desativar interatividade
        chartArea: {  width: '77%', height: '76%' }, // Definir a área do gráfico para 100% do contêiner
        backgroundColor: 'transparent'
     
    };

  
    var chart = new google.visualization.PieChart(document.getElementById('graficoDeRoscaMemoria'));
    chart.draw(data, options);

}

function gerarGraficoDiscoUso() {
    let totalStorage = 500; // Total de armazenamento disponível (em GB)
    let usedStorage = 300; // Armazenamento usado (em GB)
    let storageFree = totalStorage - usedStorage; // Espaço livre (em GB)

    var data = google.visualization.arrayToDataTable([
        ['Tipo', 'Uso de Disco'],
        ['Usado', usedStorage], // Total utilizado
        ['Livre', storageFree], // Total disponível
    ]);

    var options = {
        pieHole: 0.5,
        pieSliceText: 'percentage', 
        pieSliceTextStyle: {
            color: '#ffffff',
            fontSize: '12px',
            bold: true
        },
        slices: {
            0: { color: '#FFDC83' }, // Cor para o total utilizado
            1: { color: '#8ee79a' } // Cor para o total disponível
        },
        legend: 'none', // Ocultar a legenda
        tooltip: { trigger: 'none' }, // Desativar tooltips
        enableInteractivity: false, // Desativar interatividade
        chartArea: { width: '70%', height: '73%' }, // Definir a área do gráfico para 100% do contêiner
        backgroundColor: 'transparent'
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficoDeDisco'));
    chart.draw(data, options);
}

function gerarGraficoUtilizacaoCPU() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Segundos');
    data.addColumn('number', 'Utilização da CPU (%)');

    // Simular dados de utilização da CPU
    var dadosUtilizacaoCPU = [
        [0, 10],
        [10, 20],
        [20, 30],
        [30, 40],
        [40, 50],
        [50, 60],
        [60, 70],
        [70, 80],
        [80, 90],
        [90, 100]
    ];

    // Adicionar os dados ao DataTable
    data.addRows(dadosUtilizacaoCPU);

    // Definir as opções do gráfico
    var options = {
       
        curveType: 'function',
        backgroundColor: 'transparent',
        legend: { position: 'bottom' },
        hAxis: { title: 'Segundos' },
        vAxis: { title: 'Utilização da CPU (%)', minValue: 0, maxValue: 100 },
        chartArea: { width: '80%', height: '70%' } // Ajustar o tamanho da área do gráfico conforme necessário
    };

    var chart = new google.visualization.LineChart(document.getElementById('graficoUtilizacaoCPU'));
    chart.draw(data, options);
}