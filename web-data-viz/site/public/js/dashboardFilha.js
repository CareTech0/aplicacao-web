    const urlParams = new URLSearchParams(window.location.search);
    const idComputador = urlParams.get('idComputador');

    const usoCpu = [];
    const lableCpu = [];
    const idRegistroCpu = []

    const usoRede = [];
    const lableRede = [];
    const idRegistroRede= []

    
    function atualizarGraficoRam(){
        fetch(`/dashboard/buscarDadosRam/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    console.log("resposta da query de ram")
                    console.log(resposta)
                    console.log("Percentual")
                    console.log(resposta[0].uso_capacidade / resposta[0].capacidade_total)
                    graficoRam.config.data.datasets[0].data = [resposta[0].uso_capacidade, resposta[0].capacidade_total - resposta[0].uso_capacidade]
                    
                    let utilizacaoPercentual = (resposta[0].uso_capacidade / resposta[0].capacidade_total).toFixed(2);

                    utilizacaoMemoria.innerHTML = `${utilizacaoPercentual * 100}%` 
                    totalMemoria.innerHTML = `${resposta[0].capacidade_total.toFixed(2)}Gb`
                    disponivelMemoria.innerHTML = `${(resposta[0].capacidade_total - resposta[0].uso_capacidade).toFixed(1)}Gb`

                    if(utilizacaoPercentual <= 0.7){
                        statusMemoria.innerHTML = `Ideal`
                        iconeAlertaRam,innerHTML = `<img src="../assets/imgs/check.png">`
                        graficoRam.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`, 'rgb(54, 162, 235)']
                    }else if(utilizacaoPercentual <= 0.9){
                        statusMemoria.innerHTML = `Atenção`
                        iconeAlertaRam.innerHTML = `<img src="../assets/imgs/alerta.png">`
                        graficoRam.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`, 'rgb(54, 162, 235)']
                    }else {
                        statusMemoria.innerHTML = `Crítico`
                        iconeAlertaRam.innerHTML = `<img src="../assets/imgs/x.png">`
                        graficoRam.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`, 'rgb(54, 162, 235)']
                    }


                    graficoRam.update();
                });
            }
        });
    }

    function atualizarGraficoDisco(){
        fetch(`/dashboard/buscarDadosDisco/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                   graficoDisco.config.data.datasets[0].data = [resposta[0].uso_capacidade, resposta[0].capacidade_total - resposta[0].uso_capacidade]

                   let utilizacaoPercentual = (resposta[0].uso_capacidade / resposta[0].capacidade_total).toFixed(1);

                   utilizacaoDisco.innerHTML = `${(utilizacaoPercentual * 100)}%`
                   totalDisco.innerHTML = `${resposta[0].capacidade_total.toFixed(1)}Gb`
                   disponivelDisco.innerHTML = `${(resposta[0].capacidade_total - resposta[0].uso_capacidade).toFixed(1)}Gb` 

                   if(utilizacaoPercentual <= 0.7){
                        statusDisco.innerHTML = `Ideal`
                        iconeAlertaDisco.innerHTML = `<img src="../assets/imgs/check.png">`
                        graficoDisco.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`, 'rgb(54, 162, 235)']
                    }else if(utilizacaoPercentual <= 0.8){
                        statusDisco.innerHTML = `Atenção`
                        iconeAlertaDisco.innerHTML = `<img src="../assets/imgs/alerta.png">`
                        graficoDisco.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`, 'rgb(54, 162, 235)']
                    }else {
                        statusDisco.innerHTML = `Crítico`
                        iconeAlertaDisco.innerHTML = `<img src="../assets/imgs/x.png">`
                        graficoDisco.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`, 'rgb(54, 162, 235)']
                    }

                   graficoDisco.update();
                });
            }
        });
    }


    //Carrega os graficos ao carregar a página, função sendo chamada na abertura da tag Body
    function carregarGraficos(){
        fetch(`/dashboard/buscarNomeEstacao/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    nomeEstacao.innerHTML = `${resposta[0].estacao_de_trabalho}`
                });
            }
        });

        //Busca e adiciona no gráfico os ultimos dados registrados de memória RAM
        atualizarGraficoRam()
        //Busca e adiciona no gráfico os ultimos dados registrados de Disco
        atualizarGraficoDisco()
        //Busca e adiciona no gráfico os ultimos dados registrados de CPU
        fetch(`/dashboard/buscarDadosCpu/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    console.log(resposta)
                    let usoCapacidadeCpuFormatado 
                    for(let i = resposta.length - 1; i >= 0; i--){
                        const lableHoraMinutos = resposta[i].horario;
                        const date = new Date(lableHoraMinutos);
                        
                        let usoCapacidadeCpu = resposta[i].uso_capacidade;
                        usoCapacidadeCpuFormatado = usoCapacidadeCpu.toFixed(1)

                        // Obter a hora e os minutos
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');

                        const time = `${hours}:${minutes}`;
                        console.log(time);
                        idRegistroCpu.push(resposta[0].id_registros)
                        lableCpu.push(time)
                        usoCpu.push(usoCapacidadeCpuFormatado)
                    }

                    let utilizacaoPercentual = usoCpu[usoCpu.length-1]

                    utiilizacaoCpu.innerHTML = `${usoCpu[usoCpu.length-1]}%`

                    
                    if(utilizacaoPercentual <= 70){
                        statusCpu.innerHTML = `Ideal`
                        iconeAlertaCpu.innerHTML = `<img src="../assets/imgs/check.png">`;
                        graficoCpu.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`]
                    }else if(utilizacaoPercentual <= 80){
                        statusCpu.innerHTML = `Atenção`
                        iconeAlertaCpu.innerHTML = `<img src="../assets/imgs/alerta.png">`;
                        graficoCpu.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`]
                    }else {
                        statusCpu.innerHTML = `Crítico`
                        iconeAlertaCpu.innerHTML = `<img src="../assets/imgs/x.png">`;
                        graficoCpu.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`]
                    }

                    console.log(lableCpu)
                    console.log(usoCpu)
                    graficoCpu.config.data.datasets[0].data = usoCpu;
                    graficoCpu.config.data.labels = lableCpu;
                    graficoCpu.update();
                });
            }
        });

        fetch(`/dashboard/buscarDadosRede/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    console.log(resposta)
                    for(let i = resposta.length - 1; i >= 0; i--){
                        const lableHoraMinutos = resposta[i].horario;
                        const date = new Date(lableHoraMinutos);
                        
                        
                        let usoCapacidadeRede = resposta[i].uso_capacidade;
                        let usoCapacidadeRedeFormatado = usoCapacidadeRede.toFixed(1)
                        

                        // Obter a hora e os minutos
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');

                        const time = `${hours}:${minutes}`;
                        console.log(time);
                        idRegistroRede.push(resposta[i].id_registros)
                        lableRede.push(time)
                        usoRede.push(usoCapacidadeRedeFormatado)
                    }
                    

                    buscarMaiorRede()
                    buscarMinimoRede()
                    buscarMediaRede()

                    let velRede = usoRede[usoRede.length-1]

                    if(velRede < 1){
                        statusRede.innerHTML = `Crítico`
                        iconeAlertaRede.innerHTML = `<img src="../assets/imgs/x.png">`
                        graficoRede.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`]
                    }else if(velRede < 5){
                        statusRede.innerHTML = `Atenção`
                        iconeAlertaRede.innerHTML = `<img src="../assets/imgs/alerta.png">`
                        graficoRede.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`]
                    }else {
                        statusRede.innerHTML = `Ideal`
                        iconeAlertaRede.innerHTML = `<img src="../assets/imgs/check.png">`
                        graficoRede.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`] 
                    }

                    graficoRede.config.data.datasets[0].data = usoRede;
                    graficoRede.config.data.labels = lableRede;
                    graficoRede.update();
                });
            }
        });

        setInterval(() => {
            console.log(urlParams.get('idComputador'))
            fetch(`/dashboard/buscarDadosRam/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
                         if(resposta.ok){
                             resposta.json().then(function (resposta) {
                                graficoRam.config.data.datasets[0].data = [resposta[0].uso_capacidade, resposta[0].capacidade_total - resposta[0].uso_capacidade]

                                let utilizacaoPercentual = (resposta[0].uso_capacidade / resposta[0].capacidade_total).toFixed(2);

                                utilizacaoMemoria.innerHTML = `${utilizacaoPercentual * 100}%`
                                totalMemoria.innerHTML = `${resposta[0].capacidade_total.toFixed(1)}Gb`
                                disponivelMemoria.innerHTML = `${(resposta[0].capacidade_total - resposta[0].uso_capacidade).toFixed(1)}Gb` 

                                if(utilizacaoPercentual <= 0.7){
                                    statusMemoria.innerHTML = `Ideal`
                                    iconeAlertaRam,innerHTML = `<img src="../assets/imgs/check.png">`
                                    graficoRam.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`, 'rgb(54, 162, 235)']
                                }else if(utilizacaoPercentual <= 0.9){
                                    statusMemoria.innerHTML = `Atenção`
                                    iconeAlertaRam.innerHTML = `<img src="../assets/imgs/alerta.png">`
                                    graficoRam.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`, 'rgb(54, 162, 235)']
                                }else {
                                    statusMemoria.innerHTML = `Crítico`
                                    iconeAlertaRam.innerHTML = `<img src="../assets/imgs/x.png">`
                                    graficoRam.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`, 'rgb(54, 162, 235)']
                                }

                                graficoRam.update();
                             });
                         }
                     });
    
            fetch(`/dashboard/buscarDadosDisco/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                   graficoDisco.config.data.datasets[0].data = [resposta[0].uso_capacidade, resposta[0].capacidade_total - resposta[0].uso_capacidade]

                   let utilizacaoPercentual = (resposta[0].uso_capacidade / resposta[0].capacidade_total).toFixed(1);

                   utilizacaoDisco.innerHTML = `${(utilizacaoPercentual * 100)}%`
                   totalDisco.innerHTML = `${resposta[0].capacidade_total.toFixed(1)}Gb`
                   disponivelDisco.innerHTML = `${(resposta[0].capacidade_total - resposta[0].uso_capacidade).toFixed(1)}Gb` 

                   if(utilizacaoPercentual <= 0.7){
                        statusDisco.innerHTML = `Ideal`
                        iconeAlertaDisco.innerHTML = `<img src="../assets/imgs/check.png">`
                        graficoDisco.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`, 'rgb(54, 162, 235)']
                    }else if(utilizacaoPercentual <= 0.8){
                        statusDisco.innerHTML = `Atenção`
                        iconeAlertaDisco.innerHTML = `<img src="../assets/imgs/alerta.png">`
                        graficoDisco.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`, 'rgb(54, 162, 235)']
                    }else {
                        statusDisco.innerHTML = `Crítico`
                        iconeAlertaDisco.innerHTML = `<img src="../assets/imgs/x.png">`
                        graficoDisco.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`, 'rgb(54, 162, 235)']
                    }

                   graficoDisco.update();
                });
            }
        });         
            

            fetch(`/dashboard/buscarUltimoDadoCpu/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
                if(resposta.ok){
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        
                        const lableHoraMinutos = resposta[0].horario;
                        const date = new Date(lableHoraMinutos);
                            
                        let usoCapacidadeCpu = resposta[0].uso_capacidade;
                        let usoCapacidadeCpuFormatado = usoCapacidadeCpu.toFixed(1)
    
                        // Obter a hora e os minutos
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                        
                        const time = `${hours}:${minutes}`;
                        console.log(time);
                        if(idRegistroCpu[idRegistroCpu.length-1] != resposta[0].id_registros) {
                            if(lableCpu.length > 10){
                                lableCpu.shift()
                                usoCpu.shift()
                                idRegistroCpu.shift()
                            }

                            lableCpu.push(time)
                            usoCpu.push(usoCapacidadeCpuFormatado)
                            idRegistroCpu.push(resposta[0].idRegistroCpu)
                            
                            console.log(lableCpu)
                            console.log(usoCpu)

                            utiilizacaoCpu.innerHTML = `${usoCpu[usoCpu.length-1]}%`

                            let utilizacaoPercentual = usoCpu[usoCpu.length-1]

                            
                            if(utilizacaoPercentual <= 70){
                                statusCpu.innerHTML = `Ideal`
                                iconeAlertaCpu.innerHTML = `<img src="../assets/imgs/check.png">`;
                                graficoCpu.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`]
                            }else if(utilizacaoPercentual <= 80){
                                statusCpu.innerHTML = `Atenção`
                                iconeAlertaCpu.innerHTML = `<img src="../assets/imgs/alerta.png">`;
                                graficoCpu.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`]
                            }else {
                                statusCpu.innerHTML = `Crítico`
                                iconeAlertaCpu.innerHTML = `<img src="../assets/imgs/x.png">`;
                                graficoCpu.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`]
                            }

                            graficoCpu.config.data.datasets[0].data = usoCpu;
                            graficoCpu.config.data.labels = lableCpu;
                            graficoCpu.update();
                        }
                    });
                }
            });

            fetch(`/dashboard/buscarUltimoDadoRede/${idComputador}`, { cache: 'no-store' }).then(function (resposta){
                if(resposta.ok){
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        
                        const lableHoraMinutos = resposta[0].horario;
                        const date = new Date(lableHoraMinutos);
                            
                        let usoCapacidadeRede = resposta[0].uso_capacidade;
                        let usoCapacidadeCpuFormatado = usoCapacidadeRede.toFixed(1)
    
                        // Obter a hora e os minutos
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                        
                        const time = `${hours}:${minutes}`;
                        console.log('rede:');
                        console.log(idRegistroRede[idRegistroRede.length-1])
                        console.log(resposta[0].id_registros)
                        if(idRegistroRede[idRegistroRede.length-1] != resposta[0].id_registros) {
                            if(lableRede.length >= 10){
                                lableRede.shift()
                                usoRede.shift()
                                idRegistroRede.shift()
                            }
                            idRegistroRede.push(resposta[0].id_registros)
                            lableRede.push(time)
                            usoRede.push(usoCapacidadeCpuFormatado)

                            buscarMaiorRede()
                            buscarMinimoRede()
                            buscarMediaRede()

                            let velRede = usoRede[usoRede.length-1]

                            if(velRede < 1){
                                statusRede.innerHTML = `Crítico`
                                iconeAlertaRede.innerHTML = `<img src="../assets/imgs/x.png">`
                                graficoRede.config.data.datasets[0].backgroundColor = [`rgba(252, 80, 74, 0.897)`]
                            }else if(velRede < 5){
                                statusRede.innerHTML = `Atenção`
                                iconeAlertaRede.innerHTML = `<img src="../assets/imgs/alerta.png">`
                                graficoRede.config.data.datasets[0].backgroundColor = [`rgba(252, 249, 74, 0.897)`]
                            }else {
                                statusRede.innerHTML = `Ideal`
                                iconeAlertaRede.innerHTML = `<img src="../assets/imgs/check.png">`
                                graficoRede.config.data.datasets[0].backgroundColor = [`rgb(102, 204, 115)`] 
                            }
                            
                            graficoRede.config.data.datasets[0].data = usoRede;
                            graficoRede.config.data.labels = lableRede;
                            graficoRede.update();
                        }
                    });
                }
            });
    
        }, 5000)

    }


    function buscarDiaHoje(){
        let hoje = new Date();

        // Extrair o ano, mês e dia
        let ano = hoje.getFullYear();
        let mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Os meses são indexados a partir de 0, então adicionamos 1
        let dia = hoje.getDate().toString().padStart(2, '0');

        // Formatar a data como AAAA-MM-DD
        let dataFormatada = `${ano}-${mes}-${dia}`;
        return dataFormatada
    }

    function buscarMaiorRede(){
        let hoje = buscarDiaHoje()

        fetch(`/dashboard/buscarMaiorRede/${idComputador}/${hoje}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    console.log("MAXIMO DE REDE")
                    console.log((resposta[0].max_rede).toFixed(2))

                    let maxHoje = (resposta[0].max_rede).toFixed(2)
                    maxRede.innerHTML = `${maxHoje}Mb/s`
                });
            }
        });
        
    }

    function buscarMinimoRede(){
        let hoje = buscarDiaHoje()

        fetch(`/dashboard/buscarMinimoRede/${idComputador}/${hoje}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    console.log("MINIMO DE REDE")
                    console.log((resposta[0].min_rede).toFixed(2))

                    let minHoje = (resposta[0].min_rede).toFixed(2)
                    minRede.innerHTML = `${minHoje}Mb/s`
                });
            }
        });
    }

    function buscarMediaRede(){
        let hoje = buscarDiaHoje()

        fetch(`/dashboard/buscarMediaRede/${idComputador}/${hoje}`, { cache: 'no-store' }).then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (resposta) {
                    console.log("MEDIA DE REDE")
                    console.log((resposta[0].med_rede).toFixed(2))

                    let medHoje = (resposta[0].med_rede).toFixed(2)
                    mediarede.innerHTML = `${medHoje}Mb/s`
                });
            }
        });
    }



    // Ajustando a posição do texto dentro dos gráficos
    var textoRede1 = document.getElementById('textoRede1');
    textoRede1.style.top = (document.getElementById('chartRede1').height / 2 - textoRede1.offsetHeight / 2) + 'px';
    textoRede1.style.left = (document.getElementById('chartRede1').width / 2 - textoRede1.offsetWidth / 2) + 'px';

    var textoRede2 = document.getElementById('textoRede2');
    textoRede2.style.top = (document.getElementById('chartRede2').height / 2 - textoRede2.offsetHeight / 2) + 'px';
    textoRede2.style.left = (document.getElementById('chartRede2').width / 2 - textoRede2.offsetWidth / 2) + 'px';
