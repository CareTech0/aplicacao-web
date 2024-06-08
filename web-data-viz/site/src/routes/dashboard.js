const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/dashboardVo", function (req, res) {
    res.render("./dashboard/dashboardVo");
});

router.get("/dashboardFilha", function (req, res) {
    const idComputador = req.query.idComputador;
    res.render("dashboard/dashboardFilha", { idComputador });
});

router.get("/dashboard", function (req, res) {
    res.render("./dashboard/dashboard");
});

//Funcionalidades da dashboard filha ------------------------------------------------

router.get("/buscarDadosRede/:idComputador", function (req, res) {
    dashboardController.buscarDadosRede(req, res);
});

router.get("/buscarDadosRam/:idComputador", function (req, res) {
    dashboardController.buscarDadosRam(req, res);
});

router.get("/buscarDadosCpu/:idComputador", function (req, res){
    dashboardController.buscarDadosCpu(req, res);
});

router.get("/buscarDiscos/:idComputador", function (req, res) {
    dashboardController.buscarDiscos(req, res);
});

router.get("/buscarDadosDisco/:idHardware", function (req, res) {
    dashboardController.buscarDadosDisco(req, res);
});

//Buscar máquinas-----------------------------------------------------

router.get("/buscarMaquinas/:fkEmpresa", function (req, res) {
    dashboardController.buscarMaquinas(req, res);
});

router.get("/buscarDadosDaMaquina/:fkEmpresa", function (req, res) {
    dashboardController.buscarDadosDaMaquina(req, res);
})

router.get("/buscarDadosAlerta/:idComputador", function (req, res) {
    dashboardController.buscarDadosAlerta(req, res);
});

router.get("/buscarCriticosDoDia/:idComputador", function (req, res) {
    dashboardController.buscarDadosAlerta(req, res);
});


//Inserir máquinas ---------------------------------------------------

router.post("/inserirMaquina", function (req, res) {
    dashboardController.inserirMaquina(req, res);
});

//deletar máquina ----------------------------------------------------

router.delete("/deletarComputador/:idComputador", function (req, res){
    dashboardController.deletarComputador(req, res);
});

//Editar máquina -----------------------------------------------------

router.put("/editarMaquina/:idComputador", function (req, res) {
    dashboardController.editarMaquina(req, res);
});

module.exports = router;