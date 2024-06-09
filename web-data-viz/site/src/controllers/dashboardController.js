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

function buscarDadosRam(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarDadosRam(idComputador).then (function (resultado) {
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

function buscarDadosRede(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarDadosRede(idComputador).then (function (resultado) {
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

function buscarDadosCpu(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarDadosCpu(idComputador).then (function (resultado) {
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

function buscarUltimoDadoCpu(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarUltimoDadoCpu(idComputador).then (function (resultado) {
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

function buscarUltimoDadoRede(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarUltimoDadoRede(idComputador).then (function (resultado) {
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

function buscarDiscos(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarDiscos(idComputador).then (function (resultado) {
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

function buscarMaiorRede(req, res){
    const idComputador = req.params.idComputador;
    const hoje = req.params.hoje;

    dashboardModel.buscarMaiorRede(idComputador, hoje).then (function (resultado) {
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

function buscarMinimoRede(req, res){
    const idComputador = req.params.idComputador;
    const hoje = req.params.hoje;

    dashboardModel.buscarMinimoRede(idComputador, hoje).then (function (resultado) {
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

function buscarMediaRede(req, res){
    const idComputador = req.params.idComputador;
    const hoje = req.params.hoje;

    dashboardModel.buscarMediaRede(idComputador, hoje).then (function (resultado) {
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

function buscarDadosDisco(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarDadosDisco(idComputador).then (function (resultado) {
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

function buscarUsoDiscoMaquina(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarUsoDiscoMaquina(idComputador).then (function (resultado) {
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


function buscarDadosDaMaquina(req, res){
    const fkEmpresa = req.params.fkEmpresa;

    dashboardModel.buscarDadosDaMaquina(fkEmpresa).then (function (resultado) {
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


function buscarNomeEstacao(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarNomeEstacao(idComputador).then (function (resultado) {
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

function buscarDadosAlerta(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarDadosAlerta(idComputador).then (function (resultado) {

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

function buscarCriticosDoDia(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarCriticosDoDia(idComputador).then (function (resultado) {
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

function buscarProblemasSemana(req, res){
    const idComputador = req.params.idComputador;

    dashboardModel.buscarProblemasSemana(idComputador).then (function (resultado) {
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

module.exports = { 
    inserirMaquina,
    buscarMaquinas,
    deletarComputador,
    editarMaquina,
    buscarDadosRam,
    buscarDadosCpu,
    buscarDiscos,
    buscarDadosDisco,
    buscarDadosDaMaquina,
    buscarDadosRede,
    buscarNomeEstacao,
    buscarDadosAlerta,
    buscarCriticosDoDia,
    buscarProblemasSemana,
    buscarMaiorRede,
    buscarMinimoRede,
    buscarUltimoDadoCpu,
    buscarUltimoDadoRede,
    buscarMediaRede,
    buscarUsoDiscoMaquina
}