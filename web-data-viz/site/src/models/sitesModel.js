const database = require("../database/config");

function buscarSites(fkEmpresa){
    const instrucao = `
        select * from sites_bloqueados where fk_empresa = ${fkEmpresa}
    `;

    return database.executar(instrucao);
}

function deletarSite(idSite){
    const instrucao = `
        delete from sites_bloqueados where id_sites = ${idSite}
    `;

    return database.executar(instrucao);
}

module.exports = { buscarSites, deletarSite }