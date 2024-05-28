const { json } = require("express");
const dashboardModel = require("../models/dashboardModel");

function buscarMaquinas(req, res){
    const fkEmpresa = req.params.fkEmpresa;

    dashboardModel.buscarMaquinas(fkEmpresa).then( function (resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum Resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirMaquina(req, res){
    const estacaoDeTrabalho = req.body.estacao_de_trabalho;
    const login = req.body.login;
    const senha = req.body.senha;
    const fkEmpresa = req.body.fkEmpresa;

    dashboardModel.inserirMaquina(estacaoDeTrabalho, login, senha, fkEmpresa).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum Resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarComputador(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.deletarComputador(idComputador).then(function (resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum Resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function editarMaquina(req, res){
    const estacaoDeTrabalho = req.body.estacaoDeTrabalho;
    const login = req.body.login;
    const senha = req.body.senha;

    dashboardModel.editarMaquina(estacaoDeTrabalho, login, senha).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum Resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = { inserirMaquina, buscarMaquinas, deletarComputador, editarMaquina }