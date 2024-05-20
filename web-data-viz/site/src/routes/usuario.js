const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    res.render("./dashboard/usuarios");
});

router.get("/buscarUsuarios/:fkEmpresa", function (req, res) {
    usuarioController.buscarUsuarios(req, res);
});

router.post("/criarUsuario", function (req, res) {
    usuarioController.criarUsuario(req, res);
});

router.delete("/deletarUsuario/:idUser", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

module.exports = router;