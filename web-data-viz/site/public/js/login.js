const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const btnLogin = document.getElementById("btn_login");
const formularioLogin = document.getElementById("form_login");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    var emailIpt = document.getElementById('login_email');
    var senhaIpt = document.getElementById('login_senha');

    var email = emailIpt.value;
    var senha = senhaIpt.value;


    fetch("/index/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailLoginServer: email,
            senhaLoginServer: senha
        }),

    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.EMAIL_USER = json.email;
                sessionStorage.NOME_USER = json.nome;
                sessionStorage.ID_USER = json.id;
                sessionStorage.SENHA_USER = json.senha;
                sessionStorage.FK_EMPRESA = json.fk_empresa;

                setTimeout(function () {
                    window.location = '/dashboard'
                }, 1000)
            })
        } else {
            alert("Erro");
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false

});