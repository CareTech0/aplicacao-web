google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(gerarGraficoMemoriaRamUso);

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
        chartArea: { width: '80%', height: '90%' }, // Definir a área do gráfico para 100% do contêiner
        backgroundColor: 'transparent'
     
    };

    // Instancie e desenhe o gráfico, passando os dados e opções
    var chart = new google.visualization.PieChart(document.getElementById('graficoDeRoscaMemoria'));
    chart.draw(data, options);

}