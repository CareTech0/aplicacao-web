const express = require("express");
const router = express.Router();

router.get("/dashboardVo", function (req, res) {
    res.render("./dashboard/dashboardVo");
});

router.get("/dashboardFilha", function (req, res) {
    res.render("./dashboard/dashboardFilha");
});

router.get("/dashboard", function (req, res) {
    res.render("./dashboard/dashboard");
});

router.get("/cadastroMaquina", function (req, res) {
    res.render("./dashboard/cadastrarMaquina");
});

router.get("/bloqueio", function (req, res) {
    res.render("./dashboard/bloqueio");
});

//Funcionalidades da dashboard filha ------------------------------------------------




module.exports = router;