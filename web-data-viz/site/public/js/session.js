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

                        console.log(`
                            ${capacidadeTotal} ${usoCapacidade} ${nomeHardware}
                        `);

                    });  
                });
            }
        });
    });
}