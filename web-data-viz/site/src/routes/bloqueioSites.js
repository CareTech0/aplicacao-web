const express = require("express");
const router = express.Router();

const sitesController = require("../controllers/sitesController");

router.get("/", function (req, res) {
    res.render("./dashboard/bloqueio");
});

router.get("/buscarSites/:fkEmpresa", function (req, res){
    sitesController.buscarSites(req, res);
})


module.exports = router;