
function direcionarRAM() {    
      window.location.href = "dashboardFilhaRAM.html";
} 
function direcionarDISCO() {    
    window.location.href = "dashboardFilhaDISCO.html";
} 

function direcionarREDE() {    
    window.location.href = "dashboardFilhaREDE.html";
} 

function direcionarCPU() {    
    window.location.href = "dashboardFilhaCPU.html";
} 

function voltar() {    
    window.location.href = "dashboard.html";
} 

document.addEventListener("DOMContentLoaded", function () {
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);

function drawChart1() {
    var data = google.visualization.arrayToDataTable([
        ['Data', 'Quantidade'],
        ['Segunda', 10],
        ['Terça', 35],
        ['Quarta', 10],
        ['Quinta', 30],
        ['Sexta', 25]
    ]);

    var options = {
        title: 'MÁQUINAS COM PROBLEMAS RECORRENTES NA SEMANA',
        width: '100%',
        height: '100%', 
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart1'));

    chart.draw(data, options);
}

function drawChart2() {
    var data = google.visualization.arrayToDataTable([
        ['Dia', 'Percentual'],
        ['Segunda', 20],
        ['Terça', 35],
        ['Quarta', 45],
        ['Quinta', 60]
    ]);

    var options = {
        title: 'LOGIN FORA DO HORÁRIO ESPERADO NA ÚLTIMA SEMANA',
        legend: { position: 'none' },
        width: '100%',
        height: '100%', 
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart2'));

    chart.draw(data, options);
}


function drawChart3() {
    var data = google.visualization.arrayToDataTable([
        ['Máquina', 'Uso de RAM '],
        ['Máquina 1', 80],
        ['Máquina 2', 50],
        ['Máquina 3', 90]
    ]);

    var options = {
        // title: '', -->
        legend: { position: 'none' },
        hAxis: { title: 'Máquinas' },
        vAxis: { title: 'Percentual de Uso de RAM', minValue: 0, maxValue: 100 }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart3'));

    chart.draw(data, options);
}




    const deslogarModal = document.getElementById('deslogarModal');
    const closeButtons = document.querySelectorAll('.close');
    const spanDeslogar = document.querySelector('.item-menu-deslogar');
    
    function abrirDeslogarModal() { 
        deslogarModal.style.display = 'block';
    }
    
    spanDeslogar.addEventListener('click', function() {
        abrirDeslogarModal(); 
    });
    
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            deslogarModal.style.display = 'none';        
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == deslogarModal) {
            deslogarModal.style.display = 'none';        
        }
    });

    
    }); 

    