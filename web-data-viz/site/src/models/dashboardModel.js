const database = require("../database/config");

function inserirMaquina(estacaoDeTrabalho, login, senha, fkEmpresa){
    const instrucao = `
        insert into computador (estacao_de_trabalho, login, senha, fk_empresa) values ('${estacaoDeTrabalho}', '${login}', '${senha}', ${fkEmpresa})
    `;

    return database.executar(instrucao);
}

function buscarMaquinas(fkEmpresa){
    const instrucao = `
        select * from computador where fk_empresa = ${fkEmpresa}
    `;

    return database.executar(instrucao);
}

function deletarComputador(idComputador){
    const instruco = `
        call deletarComputador(${idComputador})
    `;

    return database.executar(instruco);
}

module.exports = { inserirMaquina, buscarMaquinas, deletarComputador }