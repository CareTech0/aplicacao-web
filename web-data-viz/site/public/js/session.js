const id = sessionStorage.ID_USER;

function validarSessao(){
    if(id == null){
        window.location="/index";
    }
}

function sairConta(){
    sessionStorage.clear();
    window.location = "/index";
}

setInterval(() => {
    fetch(`/dashboard/buscarMaquinas/${sessionStorage.FK_EMPRESA}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(maquinas => {
                    console.log('Máquinas recebidas:', maquinas);
                    buscarDadosAlerta(maquinas);
                });
            } else {
                console.error('Erro ao buscar máquinas:', resposta.statusText);
            }
        })
        .catch(error => {
            console.error('Erro na requisição fetch para buscar máquinas:', error);
        });
}, 35000); 

function buscarDadosAlerta(dadosDasMaquinas) {
    dadosDasMaquinas.forEach(maquina => {
        fetch(`/dashboard/buscarDadosAlerta/${maquina.id_computador}`, { cache: 'no-store' })
            .then(resposta => {
                if (resposta.ok) {
                    console.log('Resposta de dados de alerta recebida para a máquina:', maquina.id_computador);
                    resposta.json().then(resposta => {
                        console.log('Dados de alerta recebidos:', resposta);
                        const agora = new Date();
                        const cincoMinutosAtras = new Date(agora.getTime() - 300000);

                        let encontrouDadosRecentes = false;
                        let alertas = [];

                        resposta.forEach(dados => {
                            const horarioMaquina = new Date(dados.horario);
                            if (horarioMaquina >= cincoMinutosAtras && horarioMaquina <= agora) {
                                encontrouDadosRecentes = true;
                                const capacidadeTotal = dados.capacidade_total;
                                const usoCapacidade = dados.uso_capacidade;
                                const nomeHardware = dados.nome_hardware;

                                let usoPorcentagem = 0;
                                if (nomeHardware !== 'rede') {
                                    if (nomeHardware === 'disco' || nomeHardware === 'ram') {
                                        usoPorcentagem = (usoCapacidade * 100) / capacidadeTotal;
                                    } else if (nomeHardware === 'cpu') {
                                        usoPorcentagem = usoCapacidade;
                                    }

                                    if (usoPorcentagem > 90) {
                                        alertas.push({
                                            nomeHardware,
                                            estado: 'CRÍTICO',
                                            usoPorcentagem
                                        });
                                    } else if (usoPorcentagem > 80) {
                                        alertas.push({
                                            nomeHardware,
                                            estado: 'ATENÇÃO',
                                            usoPorcentagem
                                        });
                                    }
                                }
                            }
                        });

                        if (encontrouDadosRecentes) {
                            alertas.forEach(alerta => {
                                Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: alerta.estado === 'CRÍTICO' ? 'error' : 'warning',
                                    title: `<b>Nova ocorrência!</b>\n ${maquina.estacao_de_trabalho} está em estado de <b>${alerta.estado}</b>.\n <b>${alerta.nomeHardware.toUpperCase()}: ${alerta.usoPorcentagem.toFixed(2)}%</b>`,
                                    showConfirmButton: false,
                                    timer: 8000,
                                    timerProgressBar: true
                                });
                            });
                        } else {
                            console.log('Máquina desligada:', maquina);
                        }
                    });
                } else {
                    console.error('Erro ao buscar dados de alerta:', resposta.statusText);
                }
            })
            .catch(error => {
                console.error('Erro na requisição fetch para buscar dados de alerta:', error);
            });
    });
}
