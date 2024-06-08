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

setInterval(()=>{
    fetch(`/dashboard/buscarMaquinas/${sessionStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (resposta) {
        if(resposta.ok){
            resposta.json().then(function (resposta){
                //DashVô
                const tabelaCriticosHoje = document.getElementById('comp_estado_critico_hoje_table');
                if(tabelaCriticosHoje != undefined){
                    buscarCriticosDoDia(resposta);
                }
                //alerta
                buscarDadosAlerta(resposta);
            });
        }
    });
}, 12000)

function buscarDadosAlerta(dadosDasMaquinas){
    dadosDasMaquinas.forEach(maquina => {
        fetch(`/dashboard/buscarDadosAlerta/${maquina.id_computador}`, { cache: 'no-store' }).then(function (resposta) {
            if(resposta.ok){
                resposta.json().then(function (resposta){
                    resposta.forEach(dados => {
                        const nomeEstacao = maquina.estacao_de_trabalho;
                        const capacidadeTotal = dados.capacidade_total;
                        const usoCapacidade = dados.uso_capacidade;
                        const nomeHardware = dados.nome_hardware;

                        let usoPorcentagem = 0;
                        if(nomeHardware != 'rede'){
                            if(nomeHardware == 'disco' || nomeHardware == 'ram') usoPorcentagem = (usoCapacidade * 100) / capacidadeTotal;
                            else usoPorcentagem = usoCapacidade;
                        }

                        console.log(`
                            ${capacidadeTotal} ${usoCapacidade} ${nomeHardware} ${usoPorcentagem}
                        `);
                         
                        if (usoPorcentagem > 90) {
                            Swal.fire({
                                toast: true,
                                position: 'top-end',
                                icon: 'error',
                                title: `<b>Nova ocorrência!</b>\n ${nomeEstacao} está em estado <b>CRÍTICO<b>.\n <b>${nomeHardware.toUpperCase()}: ${usoPorcentagem.toFixed(2)}%</b>`,
                                showConfirmButton: false,
                                timer: 8000,
                                timerProgressBar: true
                            });
                        } else if (usoPorcentagem > 80 && usoPorcentagem <= 90) {
                            Swal.fire({
                                toast: true,
                                position: 'top-end',
                                icon: 'warning',
                                title: `<b>Nova ocorrência!</b>\n ${nomeEstacao} está em estado de <b>ATENÇÃO</b>.\n <b> ${nomeHardware.toUpperCase()}: ${usoPorcentagem.toFixed(2)}%</b>`,
                                showConfirmButton: false,
                                timer: 8000,
                                timerProgressBar: true
                            });
                        } else {

                        }
                    });  
                });
            } 
        });
    });
} setInterval(() => {
    buscarDadosAlerta(dadosDasMaquinas);
}, 400000);