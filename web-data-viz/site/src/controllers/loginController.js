const loginModel = require("../models/loginModel")

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
                    senha: resultado[0].senha,
                    fk_empresa: resultado[0].fk_empresa
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

module.exports = { autenticar, cadastrar }