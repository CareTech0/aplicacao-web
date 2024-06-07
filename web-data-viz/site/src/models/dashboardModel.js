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
    // const instrucao = `
    // select r.id_registros, h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'ram' order by horario DESC LIMIT 1;
    // `;
    const instrucao = `
    SELECT TOP 1 
    r.id_registros, 
    h.nome_hardware, 
    h.capacidade_total, 
    h.id_hardware, 
    r.qtd_processos, 
    r.uso_capacidade, 
    r.horario 
FROM 
    hardware AS h 
JOIN 
    registros AS r 
ON 
    h.id_hardware = r.fk_hardware 
WHERE 
    h.fk_computador = ${idComputador} 
    AND nome_hardware = 'ram' 
ORDER BY 
    r.horario DESC;
    `

    return database.executar(instrucao);
}

function buscarDadosRede(idComputador){
    // const instrucao = `
    // select r.id_registros, h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'ram' order by horario DESC LIMIT 1;
    // `;
    const instrucao = `
    SELECT TOP 1 
    r.id_registros, 
    h.nome_hardware, 
    h.capacidade_total, 
    h.id_hardware, 
    r.qtd_processos, 
    r.uso_capacidade, 
    r.horario 
FROM 
    hardware AS h 
JOIN 
    registros AS r 
ON 
    h.id_hardware = r.fk_hardware 
WHERE 
    h.fk_computador = ${idComputador} 
    AND nome_hardware = 'rede' 
ORDER BY 
    r.horario DESC;
    `

    return database.executar(instrucao);
}


function buscarDadosCpu(idComputador){  
    // const instrucao = `
    //     select h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'cpu' order by horario DESC LIMIT 1;
    // `;

    const instrucao = `
    SELECT TOP 1 
    h.nome_hardware, 
    h.capacidade_total, 
    h.id_hardware, 
    r.qtd_processos, 
    r.uso_capacidade, 
    r.horario 
FROM 
    hardware AS h 
JOIN 
    registros AS r 
ON 
    h.id_hardware = r.fk_hardware 
WHERE 
    h.fk_computador = ${idComputador} 
    AND nome_hardware = 'cpu' 
ORDER BY 
    r.horario DESC;
    `

    return database.executar(instrucao);
}

function buscarDiscos(idComputador){
    // const instrucao = `
    //    select id_hardware, capacidade_total from hardware where fk_computador = ${idComputador} and nome_hardware = 'disco';
    // `;

    const instrucao = `
    SELECT 
    id_hardware, 
    capacidade_total 
FROM 
    hardware 
WHERE 
    fk_computador = ${idComputador} 
    AND nome_hardware = 'disco';
    `

    return database.executar(instrucao);
}

function buscarDadosDisco(idHardware){
    // const instrucao = `
    //     select registros.uso_capacidade from registros where fk_hardware = ${idHardware} order by horario DESC LIMIT 1;
    // `;

    const instrucao = `
    SELECT TOP 1 
    uso_capacidade 
FROM 
    registros 
WHERE 
    fk_hardware = ${idHardware} 
ORDER BY 
    horario DESC;
    `

    return database.executar(instrucao);
}

function buscarDadosDaMaquina(fkEmpresa){
    // const instrucao = `
    // select * from hardware as h join computador c on h.fk_computador = c.id_computador join registros as r on h.id_hardware = r.fk_hardware WHERE r.horario BETWEEN DATE_SUB(NOW(), INTERVAL 5 MINUTE) AND NOW() AND fk_empresa = ${fkEmpresa};
    // `;

    const instrucao = `
    SELECT 
    *
FROM 
    hardware AS h 
JOIN 
    computador c 
ON 
    h.fk_computador = c.id_computador 
JOIN 
    registros AS r 
ON 
    h.id_hardware = r.fk_hardware 
WHERE 
    r.horario BETWEEN DATEADD(MINUTE, -5, GETDATE()) AND GETDATE() 
    AND fk_empresa = ${fkEmpresa}
    ORDER BY 
    horario DESC
    `

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
    buscarDadosDisco,
    buscarDadosDaMaquina,
    buscarDadosRede
}