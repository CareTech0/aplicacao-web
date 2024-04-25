const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/", function (req, res) {
    res.render("index");
});

router.post('/login', function (req, res) {
    loginController.autenticar(req, res);
})


module.exports = router;