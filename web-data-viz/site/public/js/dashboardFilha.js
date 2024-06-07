    google.charts.load('current', {'packages':['corechart']});
    google.charts.load('current', {'packages':['gauge']});

    google.charts.setOnLoadCallback(init);

    const urlParams = new URLSearchParams(window.location.search);
    const idComputador = urlParams.get('idComputador');

function init() {
    gerarGraficoMemoriaRamUso();
    gerarGraficoUtilizacaoCPU();
    //criarGraficosRede();    
}

var chartRam;
var dataRam;

function gerarGraficoMemoriaRamUso() {
    let totalMemory = 16; // Total de memória RAM disponível (em GB)
    let usedMemory = 10; // Memória RAM usada (em GB)

 
    dataRam = google.visualization.arrayToDataTable([
        ['Tipo', 'Uso de RAM'],
        ['Usado', usedMemory], // Total utilizado
        ['Livre', totalMemory - usedMemory], // Total disponível
       
    ]);

   
    var options = {
        pieHole: 0.5,
        pieSliceText: 'percentage', 
        pieSliceTextStyle: {
            color: '#000000',
            fontSize: '12px',
            bold: true
        },
        slices: {
            0: { color: '#FFDC83',  }, // Cor para o total utilizado
            1: { color: '#8ee79a', } // Cor para o total disponível
        },
        legend: 'none', // Ocultar a legenda
        tooltip: { trigger: 'hover' }, // Desativar tooltips
        enableInteractivity: false, // Desativar interatividade
        chartArea: {  width: '77%', height: '76%' }, // Definir a área do gráfico para 100% do contêiner
        backgroundColor: 'transparent',
        
     
    };

  
    chartRam = new google.visualization.PieChart(document.getElementById('graficoDeRoscaMemoria'));
    chartRam.draw(dataRam, options);

}

const chartDiscos = [];
const dataDiscos = [];

function gerarGraficoDiscoUso(idHardware, capacidadeTotal, posicaoGrafico) {  
    dataDiscos.push(google.visualization.arrayToDataTable([
        ['Tipo', 'Uso de Disco'],
        ['Usado', capacidadeTotal], // Total utilizado
        ['Livre', 0], // Total disponível
    ]));

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
        tooltip: { trigger: 'hover' }, // Desativar tooltips
        enableInteractivity: false, // Desativar interatividade
        chartArea: { width: '77%', height: '76%' }, // Definir a área do gráfico para 100% do contêiner
        backgroundColor: 'transparent'
    };

    document.getElementById('graficoDeDiscoContainer').innerHTML += `<div id="graficoDeDisco${idHardware}"></div>`;

    chartDiscos.push(new google.visualization.PieChart(document.getElementById(`graficoDeDisco${idHardware}`)));
    chartDiscos[posicaoGrafico].draw(dataDiscos[posicaoGrafico], options);
}

var charCPU;
var dataCPU;
var dadosUtilizacaoCPU = [];

function gerarGraficoUtilizacaoCPU() {
    dataCPU = new google.visualization.DataTable();
    dataCPU.addColumn('string', 'tempo');
    dataCPU.addColumn('number', 'Utilização da CPU (%)');

    let time = new Date();
    let hora = time.getHours();
    let minutos = time.getMinutes();
    let tempo = `${hora}:${minutos}`;

    

    // Adicionar os dados ao DataTable
    dataCPU.addRows(dadosUtilizacaoCPU);

    // Definir as opções do gráfico
    var options = {
        curveType: 'function',
        backgroundColor: 'transparent',
        legend: { position: 'none' },
        hAxis: { title: 'Tempo' },
        vAxis: { title: 'Utilização da CPU (%)', minValue: 0, maxValue: 100 },
        chartArea: { width: '80%', height: '70%' }
    };

    chartCPU = new google.visualization.LineChart(document.getElementById('graficoUtilizacaoCPU'));
    chartCPU.draw(dataCPU, options);
}


function criarGraficosRede() {
        var ctx1 = document.getElementById('chartRede1').getContext('2d');
        var doughnutChart1 = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ["#4CAF50", "#a7a7a7"]
                }]
            },
            options: {
                rotation: 270,
                circumference: 180,
                cutout: '70%',
                hover: { mode: null },
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            return value + ' Mbps';
                        },
                        color: '#000',
                        font: {
                            size: '20'
                        }
                    }
                }
            }
        });

        var ctx2 = document.getElementById('chartRede2').getContext('2d');
        var doughnutChart2 = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [50, 50],
                    backgroundColor: ["#2196F3", "#a7a7a7"]
                }]
            },
            options: {
                rotation: 270,
                circumference: 180,
                cutout: '70%',
                hover: { mode: null },
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            return value + ' Mbps';
                        },
                        color: '#000',
                        font: {
                            size: '20'
                        }
                    }
                }
            }
        });
    }
    
    setInterval(() => {
        
        fetch(`/dashboard/buscarDadosRam/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    dataRam.setValue(0, 1, resposta[0].capacidade_total);
                    dataRam.setValue(1, 1, resposta[0].capacidade_total - resposta[0].uso_capacidade);
                    chartRam.draw(dataRam, null);
                });
            }
        });

        fetch(`/dashboard/buscarDadosCpu/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    let time = new Date();
                    let hora = time.getHours();
                    let minutos = time.getMinutes();
                    let tempo = `${hora}:${minutos}`;

                    dataCPU.removeRows(0, dataCPU.getNumberOfRows());
                    
                    if(dadosUtilizacaoCPU.length == 7){
                        dadosUtilizacaoCPU.shift;
                    }

                    dadosUtilizacaoCPU.push([tempo, resposta[0].uso_capacidade])
                    dataCPU.addRows(dadosUtilizacaoCPU);

                    chartCPU.draw(dataCPU, null);
                });
            }
        });

        

                fetch(`/dashboard/buscarDiscos/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
                    if(resposta.ok){
                        resposta.json().then(function (resposta) {
                            const listaDeDiscos = resposta;
                            let i = 0;
                            listaDeDiscos.forEach(disco => {
                                if(chartDiscos.length < listaDeDiscos.length) {
                                    gerarGraficoDiscoUso(disco.id_hardware, disco.capacidade_total, i)
                                }
                                i++;
                            });
                            buscarDadosDiscos(listaDeDiscos);
                        });
                    }
                });
            
        
    }, 3000);

    function buscarDadosDiscos(listaDeDiscos){
        for(let i = 0; i < listaDeDiscos.length; i++){
            fetch(`/dashboard/buscarDadosDisco/${listaDeDiscos[i].id_hardware}`, { cache: 'no-store' }).then(function (resposta){
                if(resposta.ok){
                    resposta.json().then(function (resposta) {
                        if(resposta.length > 0){
                            dataDiscos[i].setValue(0, 1, listaDeDiscos[i].capacidade_total);
                            dataDiscos[i].setValue(1, 1, resposta[0].uso_capacidade);
                            chartDiscos[i].draw(dataDiscos[i], null);
                        } else {
                            dataDiscos[i].setValue(0, 1, listaDeDiscos[i].capacidade_total);
                            dataDiscos[i].setValue(1, 1, 0);
                            chartDiscos[i].draw(dataDiscos[i], null);
                        }
                    })
                    .catch(function (erro) {
                        console.error('Erro ao buscar dados do disco:', erro);
                    });
                    
                    
                }
            });
        }
    }



    // Ajustando a posição do texto dentro dos gráficos
    var textoRede1 = document.getElementById('textoRede1');
    textoRede1.style.top = (document.getElementById('chartRede1').height / 2 - textoRede1.offsetHeight / 2) + 'px';
    textoRede1.style.left = (document.getElementById('chartRede1').width / 2 - textoRede1.offsetWidth / 2) + 'px';

    var textoRede2 = document.getElementById('textoRede2');
    textoRede2.style.top = (document.getElementById('chartRede2').height / 2 - textoRede2.offsetHeight / 2) + 'px';
    textoRede2.style.left = (document.getElementById('chartRede2').width / 2 - textoRede2.offsetWidth / 2) + 'px';
