const database = require("../database/config");

function buscarSites(fkEmpresa){
    const instrucao = `
        select * from sites_bloqueados where fk_empresa = ${fkEmpresa}
    `;

    return database.executar(instrucao);
}

function inserirSite(nomeSite, urlSite, fkEmpresa){
    const instrucao = `
        insert into sites_bloqueados (nome, url, fk_empresa) values ('${nomeSite}', '${urlSite}', ${fkEmpresa})
    `;

    return database.executar(instrucao);
}

function deletarSite(idSite){
    const instrucao = `
        delete from sites_bloqueados where id_sites = ${idSite}
    `;

    return database.executar(instrucao);
}

module.exports = { inserirSite , buscarSites, deletarSite }