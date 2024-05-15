const database = require("../database/config");

function autenticar(email, senha){
    console.log("loginFinal");
    const instrucao = `
        select * from usuario where login_email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(razao_socail, email_empresa, cnpj){
    console.log("cadastroFinal");
    const instrucao = `insert into empresa (razao_social, email_empresa, cnpj) VALUES ('${razao_socail}', '${email_empresa}', '${cnpj}')`;

    return database.executar(instrucao);
}

module.exports = { autenticar, cadastrar }