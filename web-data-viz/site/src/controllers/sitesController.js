const { json } = require("express");
const sitesModel = require("../models/sitesModel");

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
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
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
            console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = { buscarSites, deletarSite }