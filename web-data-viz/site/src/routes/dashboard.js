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

//Kpis da dashboard vô
router.get("/buscarUsoDiscoMaquina/:idComputador", function (req, res) {
    dashboardController.buscarUsoDiscoMaquina(req, res);
});

router.get("/buscarPrimeiroInsert/:idComputador/:data", function (req, res) {
    dashboardController.buscarPrimeiroInsert(req, res);
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

router.get("/buscarUltimoDadoCpu/:idComputador", function (req, res){
    dashboardController.buscarUltimoDadoCpu(req, res);
});

router.get("/buscarUltimoDadoRede/:idComputador", function (req, res) {
    dashboardController.buscarUltimoDadoRede(req, res);
});

router.get("/buscarDiscos/:idComputador", function (req, res) {
    dashboardController.buscarDiscos(req, res);
});

router.get("/buscarDadosDisco/:idComputador", function (req, res) {
    dashboardController.buscarDadosDisco(req, res);
});

router.get("/buscarMaiorRede/:idComputador/:hoje", function (req, res) {
    dashboardController.buscarMaiorRede(req, res);
});

router.get("/buscarMinimoRede/:idComputador/:hoje", function (req, res) {
    dashboardController.buscarMinimoRede(req, res);
});

router.get("/buscarMediaRede/:idComputador/:hoje", function (req, res) {
    dashboardController.buscarMediaRede(req, res);
});

router.get("/buscarNomeEstacao/:idComputador", function (req, res) {
    dashboardController.buscarNomeEstacao(req, res);
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

router.get("/possibilidadeTravamentoHojeRam/:idComputador", function (req, res) {
    dashboardController.possibilidadeTravamentoHojeRam(req, res);
});

router.get("/possibilidadeTravamentoHojeCpu/:idComputador", function (req, res) {
    dashboardController.possibilidadeTravamentoHojeCpu(req, res);
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