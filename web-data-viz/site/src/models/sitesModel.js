const database = require("../database/config");

function buscarSites(fkEmpresa){
    const instrucao = `
        select * from sites_bloqueados where fk_empresa = ${fkEmpresa}
    `;

    return database.executar(instrucao);
}

module.exports = { buscarSites }