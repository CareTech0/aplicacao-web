const { json } = require("express");
const loginModel = require("../models/loginModel");

function autenticar(req, res){
    const emailLogin = req.body.emailLoginServer;
    const senhaLogin  = req.body.senhaLoginServer;

    console.log(emailLogin);
    console.log(senhaLogin);

    loginModel.autenticar(emailLogin, senhaLogin)
    .then(
        function (resultado){
            if(resultado.length == 1){
                res.json({
                    id: resultado[0].id_user,
                    nome: resultado[0].nome,
                    email: resultado[0].email,
                    tipo_user: resultado[0].tipo_usuario,
                    senha: resultado[0].senha,
                    fk_empresa: resultado[0].fk_empresa,
                    fk_plano: resultado[0].fk_plano,
                })
            } else if(resultado.length == 0){
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        }
    ).catch(
        function(erro){
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar a autenticação! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function cadastrar(req, res){
    const razaoSocial = req.body.razao_socail;
    const email_empresa = req.body.email_empresa;
    const cnpj = req.body.cnpj;

    loginModel.cadastrar(razaoSocial, email_empresa, cnpj)
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

function buscarPlanos(req, res){
    const fkPlano = req.body.fk_plano;

    loginModel.buscarPlanos(fkPlano)
        .then(
            function(resultado){
                if(resultado.length == 1){
                    res.json({
                        nome: resultado[0].nome,
                        valor: resultado[0].valor,
                        qtd_maquinas: resultado[0].qtd_maquinas,
                        qtd_usuarios: resultado[0].qtd_usuarios,
                    })
                }
            }
        )
        .catch(
            function(erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a autenticação! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }


module.exports = { autenticar, cadastrar, buscarPlanos }