const { json } = require("express");
const sitesModel = require("../models/sitesModel");


function inserirSite(req, res){
    const nomeSite = req.body.nome_site;
    const urlSite = req.body.url_site;
    const fkEmpresa = req.body.fkEmpresa;

    sitesModel.inserirSite(nomeSite, urlSite, fkEmpresa).then(function (resultado) {
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

function buscarSites(req, res){
    const fkEmpresa =  req.params.fkEmpresa;

    sitesModel.buscarSites(fkEmpresa).then(function (resultado) {
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

function deletarSite(req, res){
    const idSite = req.params.idSite;

    sitesModel.deletarSite(idSite).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function editarSite(req, res){
    const idSite = req.params.idSite;
    const nome = req.body.nome;
    const url = req.body.url;

    sitesModel.editarSite(idSite, nome, url).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = { buscarSites, deletarSite, inserirSite, editarSite }