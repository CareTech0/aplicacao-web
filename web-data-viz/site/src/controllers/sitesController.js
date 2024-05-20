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

module.exports = { buscarSites }