const database = require("../database/config");

function autenticar(email, senha){
    console.log("loginFinal")
    const instrucao = `
        select * from user_dash where email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucao);
}

module.exports = { autenticar }