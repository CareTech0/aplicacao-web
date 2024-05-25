const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/dashboardVo", function (req, res) {
    res.render("./dashboard/dashboardVo");
});

router.get("/dashboardFilha", function (req, res) {
    res.render("./dashboard/dashboardFilha");
});

router.get("/dashboard", function (req, res) {
    res.render("./dashboard/dashboard");
});

//Funcionalidades da dashboard filha ------------------------------------------------

//Buscar máquinas-----------------------------------------------------

router.get("/buscarMaquinas/:fkEmpresa", function (req, res) {
    dashboardController.buscarMaquinas(req, res);
});

//Inserir máquinas ---------------------------------------------------

router.post("/inserirMaquina", function (req, res) {
    dashboardController.inserirMaquina(req, res);
});

router.delete("/deletarComputador/:idComputador", function (req, res){
    dashboardController.deletarComputador(req, res);
});

module.exports = router;