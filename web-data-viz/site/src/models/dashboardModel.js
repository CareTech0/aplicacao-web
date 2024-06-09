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

function buscarUsoDiscoMaquina(idComputador){
    const instrucao = `
    select top 1
    c.id_computador,
    c.estacao_de_trabalho,
    h.nome_hardware,
    (r.uso_capacidade / h.capacidade_total) as uso_percentual
    from computador as c join hardware as h on c.id_computador=h.fk_computador
    join registros as r on h.id_hardware=r.fk_hardware
    where c.id_computador=${idComputador} and h.nome_hardware='disco';
    `;

    return database.executar(instrucao);
}

function deletarComputador(idComputador){
    const instruco = `
        exec deletarComputador @idDoComputador=${idComputador};
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
    console.log("Model: idComputador = " + idComputador)
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
    select top 10 
r.id_registros,    
h.nome_hardware,
r.uso_capacidade,
r.horario,
h.fk_computador from hardware as h join registros as r on id_hardware=fk_hardware
where h.fk_computador = ${idComputador} and h.nome_hardware = 'rede'
order by horario desc;
    `

    return database.executar(instrucao);
}


function buscarDadosCpu(idComputador){  
    // const instrucao = `
    //     select h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'cpu' order by horario DESC LIMIT 1;
    // `;

    const instrucao = `
    select top 10
r.id_registros,     
h.nome_hardware,
r.uso_capacidade,
r.horario,
h.fk_computador from hardware as h join registros as r on id_hardware=fk_hardware
where h.fk_computador = ${idComputador} and h.nome_hardware = 'cpu'
order by horario desc;
    `

    return database.executar(instrucao);
}

function buscarUltimoDadoCpu(idComputador){  
    // const instrucao = `
    //     select h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'cpu' order by horario DESC LIMIT 1;
    // `;

    const instrucao = `
    select top 1 
r.id_registros,    
h.nome_hardware,
r.uso_capacidade,
r.horario,
h.fk_computador from hardware as h join registros as r on id_hardware=fk_hardware
where h.fk_computador = ${idComputador} and h.nome_hardware = 'cpu'
order by horario desc;
    `

    return database.executar(instrucao);
}

function buscarUltimoDadoRede(idComputador){
    // const instrucao = `
    // select r.id_registros, h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'ram' order by horario DESC LIMIT 1;
    // `;
    const instrucao = `
    select top 1 
r.id_registros,    
h.nome_hardware,
r.uso_capacidade,
r.horario,
h.fk_computador from hardware as h join registros as r on id_hardware=fk_hardware
where h.fk_computador = ${idComputador} and h.nome_hardware = 'rede'
order by horario desc;
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

function buscarNomeEstacao(idComputador){

    const instrucao = `
    SELECT estacao_de_trabalho from computador where id_computador = ${idComputador}
    `

    return database.executar(instrucao);
}

function buscarMaiorRede(idComputador, hoje){
    const instrucao = `
    select max(uso_capacidade) as max_rede from hardware as h join registros as r on id_hardware=fk_hardware
    where cast(r.horario as date) = '${hoje}' and h.nome_hardware='rede' and h.fk_computador = ${idComputador};
    `

    return database.executar(instrucao);
}

function buscarMinimoRede(idComputador, hoje){
    const instrucao = `
    select min(uso_capacidade) as min_rede from hardware as h join registros as r on id_hardware=fk_hardware
    where cast(r.horario as date) = '${hoje}' and h.nome_hardware='rede' and h.fk_computador = ${idComputador};
    `

    return database.executar(instrucao);
}

function buscarMediaRede(idComputador, hoje){
    const instrucao = `
    select avg(uso_capacidade) as med_rede from hardware as h join registros as r on id_hardware=fk_hardware
    where cast(r.horario as date) = '${hoje}' and h.nome_hardware='rede' and h.fk_computador = ${idComputador};
    `

    return database.executar(instrucao);
}

function buscarPrimeiroInsert(idComputador, data){
    const instrucao = `
    select top 1 
    c.estacao_de_trabalho,
    r.horario
    from registros as r join hardware as h on r.fk_hardware=h.id_hardware
    join computador as c on c.id_computador=h.fk_computador
    where cast(horario as date) = '${data}' and id_computador = ${idComputador}
    order by horario asc;
    `

    return database.executar(instrucao);
}

function buscarDadosDisco(idComputador){
    // const instrucao = `
    //     select registros.uso_capacidade from registros where fk_hardware = ${idHardware} order by horario DESC LIMIT 1;
    // `;

    const instrucao = `
    SELECT TOP 1 
    h.nome_hardware, 
    h.capacidade_total, 
    h.id_hardware,
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
    AND nome_hardware = 'disco' 
ORDER BY 
    r.horario DESC;
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
    horario ASC
    `

    return database.executar(instrucao);
}

function buscarDadosAlerta(idComputador){
    // const instrucao = `
    // select r.id_registros, h.nome_hardware, h.capacidade_total, h.id_hardware , r.qtd_processos, r.uso_capacidade, r.horario from hardware as h join registros as r on h.id_hardware = r.fk_hardware where h.fk_computador = ${idComputador} and nome_hardware = 'ram' order by horario DESC LIMIT 1;
    // `;
    const instrucao = `
    SELECT TOP 4
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
ORDER BY 
    r.horario DESC;
    `

    return database.executar(instrucao);
}

function possibilidadeTravamentoHojeRam(idComputador){
    const instrucao = `
    SELECT * FROM hardware as h JOIN computador as c ON h.fk_computador = c.id_computador JOIN registros as r ON h.id_hardware = r.fk_hardware
    where c.fk_empresa = ${idComputador} and
    CONVERT(DATE, r.horario) = CONVERT(DATE, GETDATE()) and
    h.nome_hardware = 'ram'
    `;

    return database.executar(instrucao)
}

function possibilidadeTravamentoHojeCpu(idComputador){
    const instrucao = `
        SELECT * FROM hardware as h JOIN computador as c ON h.fk_computador = c.id_computador JOIN registros as r ON h.id_hardware = r.fk_hardware
        where c.fk_empresa = ${idComputador} and
        CONVERT(DATE, r.horario) = CONVERT(DATE, GETDATE()) and
        h.nome_hardware = 'ram'
    `;

    return database.executar(instrucao)
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
    buscarDadosRede,
    buscarUltimoDadoCpu,
    buscarUltimoDadoRede,
    buscarMaiorRede,
    buscarMinimoRede,
    buscarMediaRede,
    buscarNomeEstacao,
    buscarDadosAlerta,
    buscarUsoDiscoMaquina,
    possibilidadeTravamentoHojeRam,
    possibilidadeTravamentoHojeCpu,
    buscarPrimeiroInsert
}