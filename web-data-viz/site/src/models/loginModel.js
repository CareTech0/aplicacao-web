const database = require("../database/config");

function autenticar(email, senha){
    const instrucao = `
        select usuario.*, empresa.fk_plano from usuario join empresa on fk_empresa = empresa.id_empresa where login_email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(razao_socail, email_empresa, cnpj){
    const instrucao = `insert into empresa (razao_social, email_empresa, cnpj) VALUES ('${razao_socail}', '${email_empresa}', '${cnpj}')`;

    return database.executar(instrucao);
}

function buscarPlanos(fkPlano){
    const instrucao = `
        select * from plano where id_plano = ${fkPlano}
    `;

    return database.executar(instrucao);
}

module.exports = { autenticar, cadastrar, buscarPlanos }