const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/", function (req, res) {
    res.render("index");
});

router.post('/login', function (req, res) {
    loginController.autenticar(req, res);
});

router.post('/cadastrar', function (req, res) {
    loginController.cadastrar(req, res);
});

router.post('/buscarPlanos', function (req, res){
    loginController.buscarPlanos(req, res);
});


module.exports = router;