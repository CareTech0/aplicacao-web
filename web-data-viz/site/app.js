process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", (path.join(__dirname, "/public")));

const PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3303 : 8080;

app.use(cors());

const indexRouter = require("./src/routes/index");
const dashboardRouter = require("./src/routes/dashboard");
const usuarioRouter = require("./src/routes/usuario");
const bloqueioSites = require("./src/routes/bloqueioSites");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/index", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/usuario", usuarioRouter);
app.use("/bloqueioSites", bloqueioSites);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
