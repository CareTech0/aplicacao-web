const database = require("../database/config");
const { editarSite } = require("./sitesModel");

function buscarUsuarios(fkEmpresa){
    const instrucao = `
        select * from usuario where fk_empresa = ${fkEmpresa}
    `;

    return database.executar(instrucao);
}

function criarUsuario(nome, email, senha, tipoUser, fkEmpresa){
    const instrucao = `
        insert into usuario (nome, login_email, senha, fk_empresa, tipo_usuario) values ('${nome}', '${email}', '${senha}', ${fkEmpresa}, '${tipoUser}')
    `;

    return database.executar(instrucao);
}

function deletarUsuario(idUser){
    const instrucao = `
        delete from usuario where id_user = ${idUser}
    `;

    return database.executar(instrucao);
}

function editarUsuario(nome, email, senha, tipoUser, idUser){
    const instrucao = `
        UPDATE usuario SET nome = '${nome}', login_email = '${email}', senha = '${senha}', tipo_usuario = '${tipoUser}' WHERE id_user = ${idUser}
    `;

    return database.executar(instrucao);
}

module.exports = { buscarUsuarios, criarUsuario, deletarUsuario, editarUsuario }