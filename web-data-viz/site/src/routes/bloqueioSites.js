const express = require("express");
const router = express.Router();

const sitesController = require("../controllers/sitesController");

router.get("/", function (req, res) {
    res.render("./dashboard/bloqueio");
});

router.post("/inserirSite", function (req, res) {
    sitesController.inserirSite(req, res);
});

router.get("/buscarSites/:fkEmpresa", function (req, res){
    sitesController.buscarSites(req, res);
});


router.delete("/deletarSite/:idSite", function(req, res) {
    sitesController.deletarSite(req, res);
});


module.exports = router;