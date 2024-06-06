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

function editarMaquina(estacaoDeTrabalho, login, senha){
    const instrucao = `
        update computador set estacao_de_trabalho = '${estacaoDeTrabalho}', login = '${login}', senha = '${senha}'
    `;

    return database.executar(instrucao);
}

function buscarDadosRam(idComputador){
    const instrucao = `
        select h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.fk_computador = r.fk_hardware where h.id_hardware = ${idComputador} and nome_hardware = 'ram' order by horario DESC LIMIT 1;
    `;

    return database.executar(instrucao);
}

function buscarDadosCpu(idComputador){
    const instrucao = `
        select h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'cpu' order by horario DESC LIMIT 1;
    `;

    return database.executar(instrucao);
}

function buscarDiscos(idComputador){
    const instrucao = `
       select id_hardware, capacidade_total from hardware where fk_computador = ${idComputador} and nome_hardware = 'disco';
    `;

    return database.executar(instrucao);
}

function buscarDadosDisco(idHardware){
    const instrucao = `
        select registros.uso_capacidade from registros where fk_hardware = ${idHardware} order by horario DESC LIMIT 1;
    `;

    return database.executar(instrucao);
}

module.exports = { 
    inserirMaquina,
    buscarMaquinas,
    deletarComputador,
    editarMaquina,
    buscarDadosRam,
    buscarDadosCpu,
    buscarDiscos,
    buscarDadosDisco
}