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

setTimeout(()=> {
    fetch(`/dashboard/buscarMaquinas/${sessionStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (resposta) {
        if(resposta.ok){
            resposta.json().then(function (resposta){
                //DashVô
                // const tabelaCriticosHoje = document.getElementById('comp_estado_critico_hoje_table');
                // if(tabelaCriticosHoje.innerHTML == ""){
                //     buscarCriticosDoDia(resposta);

                // }


                buscarProblemasSemana(resposta);

            });
        }
    });
}, 3000)

setInterval(()=>{
    fetch(`/dashboard/buscarMaquinas/${sessionStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (resposta) {
        if(resposta.ok){
            resposta.json().then(function (resposta){
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
                        


                    });  
                });
            }
        });
    });
}