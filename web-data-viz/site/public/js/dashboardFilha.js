    const urlParams = new URLSearchParams(window.location.search);
    const idComputador = urlParams.get('idComputador');

    function mudarCor(){
        graficoRam.config.data.datasets[0].data = [10, 6]
        graficoRam.config.data.datasets[0].backgroundColor[0] = 'yellow';
        graficoRam.update();
    }

    setInterval(() => {
        console.log(urlParams.get('idComputador'))
        fetch(`/dashboard/buscarDadosRam/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
                     if(resposta.ok){
                         resposta.json().then(function (resposta) {
                             graficoRam.config.data.datasets[0].data = [resposta[0].uso_capacidade, resposta[0].capacidade_total - resposta[0].uso_capacidade]
                             graficoRam.update();
                         });
                     }
                 });

                 
                 fetch(`/dashboard/buscarDadosDisco/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
                             if(resposta.ok){
                                 resposta.json().then(function (resposta) {
                                    graficoDisco.config.data.datasets[0].data = [resposta[0].uso_capacidade, resposta[0].capacidade_total - resposta[0].uso_capacidade]
                                    graficoDisco.update();
                                 });
                             }
                         });

    }, 5000)

    // setInterval(() => {

    //     fetch(`/dashboard/buscarDadosRede/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
    //         if(resposta.ok){
    //             resposta.json().then(function (resposta) {
    //                 console.log(resposta);
    //             });
    //         }
    //     });
        
    //     fetch(`/dashboard/buscarDadosRam/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
    //         if(resposta.ok){
    //             resposta.json().then(function (resposta) {
    //                 dataRam.setValue(0, 1, resposta[0].capacidade_total);
    //                 dataRam.setValue(1, 1, resposta[0].capacidade_total - resposta[0].uso_capacidade);
    //                 chartRam.draw(dataRam, null);
    //             });
    //         }
    //     });

    //     fetch(`/dashboard/buscarDadosCpu/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
    //         if(resposta.ok){
    //             resposta.json().then(function (resposta) {
    //                 let time = new Date();
    //                 let hora = time.getHours();
    //                 let minutos = time.getMinutes();
    //                 let tempo = `${hora}:${minutos}`;

    //                 dataCPU.removeRows(0, dataCPU.getNumberOfRows());
                    
    //                 if(dadosUtilizacaoCPU.length == 7){
    //                     dadosUtilizacaoCPU.shift;
    //                 }

    //                 dadosUtilizacaoCPU.push([tempo, resposta[0].uso_capacidade])
    //                 dataCPU.addRows(dadosUtilizacaoCPU);

    //                 chartCPU.draw(dataCPU, null);
    //             });
    //         }
    //     });

        

    //             fetch(`/dashboard/buscarDiscos/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
    //                 if(resposta.ok){
    //                     resposta.json().then(function (resposta) {
    //                         const listaDeDiscos = resposta;
    //                         let i = 0;
    //                         listaDeDiscos.forEach(disco => {
    //                             if(chartDiscos.length < listaDeDiscos.length) {
    //                                 gerarGraficoDiscoUso(disco.id_hardware, disco.capacidade_total, i)
    //                             }
    //                             i++;
    //                         });
    //                         buscarDadosDiscos(listaDeDiscos);
    //                     });
    //                 }
    //             });
            
        
    // }, 3000);

    // function buscarDadosDiscos(listaDeDiscos){
    //     for(let i = 0; i < listaDeDiscos.length; i++){
    //         fetch(`/dashboard/buscarDadosDisco/${listaDeDiscos[i].id_hardware}`, { cache: 'no-store' }).then(function (resposta){
    //             if(resposta.ok){
    //                 resposta.json().then(function (resposta) {
    //                     if(resposta.length > 0){
    //                         dataDiscos[i].setValue(0, 1, resposta[0].uso_capacidade);
    //                         dataDiscos[i].setValue(1, 1, listaDeDiscos[i].capacidade_total - resposta[0].uso_capacidade);
    //                         chartDiscos[i].draw(dataDiscos[i], null);
    //                     } 
    //                 })
    //                 .catch(function (erro) {
    //                     console.error('Erro ao buscar dados do disco:', erro);
    //                 });
                    
                    
    //             }
    //         });
    //     }
    // }



    // Ajustando a posição do texto dentro dos gráficos
    var textoRede1 = document.getElementById('textoRede1');
    textoRede1.style.top = (document.getElementById('chartRede1').height / 2 - textoRede1.offsetHeight / 2) + 'px';
    textoRede1.style.left = (document.getElementById('chartRede1').width / 2 - textoRede1.offsetWidth / 2) + 'px';

    var textoRede2 = document.getElementById('textoRede2');
    textoRede2.style.top = (document.getElementById('chartRede2').height / 2 - textoRede2.offsetHeight / 2) + 'px';
    textoRede2.style.left = (document.getElementById('chartRede2').width / 2 - textoRede2.offsetWidth / 2) + 'px';
