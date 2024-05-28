const { json } = require("express");
const usuarioModel = require("../models/usuarioModel");

function buscarUsuarios(req, res){
    const fkEmpresa =  req.params.fkEmpresa;

    usuarioModel.buscarUsuarios(fkEmpresa).then(function (resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum Resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function criarUsuario(req, res){
    const nome = req.body.nome_user;
    const email = req.body.email_user;
    const senha = req.body.senha_user;
    const tipoUser = req.body.tipo_user;
    const fkEmpresa = req.body.fk_empresa;

    usuarioModel.criarUsuario(nome, email, senha, tipoUser, fkEmpresa)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    )
    .catch (function (erro){
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarUsuario(req, res){
    const idUser = req.params.idUser;

    usuarioModel.deletarUsuario(idUser).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(erro);
            console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function editarUsuario(req, res){
    const idUser = req.params.idUser;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const tipoUser = req.body.tipoUser;


    usuarioModel.editarUsuario(nome, email, senha, tipoUser, idUser)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    )
    .catch (function (erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { buscarUsuarios, criarUsuario, deletarUsuario, editarUsuario }