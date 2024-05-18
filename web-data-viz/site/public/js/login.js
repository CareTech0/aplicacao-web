const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const formularioLogin = document.getElementById('form_login');
const formularioCadastro = document.getElementById('form_cad');

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
                sessionStorage.TIPO_USER = json.tipo_user;
                sessionStorage.FK_EMPRESA = json.fk_empresa;

                buscarPlanos(json.fk_plano);

                setTimeout(function () {
                    window.location = '/dashboard/dashboardVo'
                }, 1000)
            })
        } else {
            let element = document.querySelector('.invalid-message');
            element.style.display = 'block';
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false
});

formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    let razaoSocial = document.getElementById("cad_razao_social").value;
    let emailEmpresa = document.getElementById("cad_email").value;
    let cnpj = document.getElementById("cad_cnpj").value;

    fetch("/index/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            razao_socail: razaoSocial,
            email_empresa: emailEmpresa,
            cnpj: cnpj,
        }),
    })
    .then(function (resposta){
        if(resposta.ok) {
            document.getElementById("cad_razao_social").value = "";
            document.getElementById("cad_email").value = "";
            document.getElementById("cad_cnpj").value = "";
            container.classList.remove("sign-up-mode");
        } else {
            alert("Erro ao cadastrar");
        }
    }).catch(function (resposta){
        console.log(`#ERRO: ${resposta}`);
        alert("Erro no banco");
    });
});

function buscarPlanos(fkPlano){
    fetch("/index/buscarPlanos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fk_plano: fkPlano,
        }),
    })
    .then(function (resposta){
        if(resposta.ok){
            resposta.json().then(json => {
                sessionStorage.NOME_PLANO = json.nome;
                sessionStorage.VALOR_PLANO = json.valor;
                sessionStorage.QTD_MAQUINAS_PLANO = json.qtd_maquinas;
                sessionStorage.QTD_USUARIOS_PLANO = json.qtd_usuarios;
            });
        }
    })
    .catch(function (resposta){
        console.log(`#ERRO: ${resposta}`)
    });
}

function mascaraCNPJ(campoCNPJ) {
    campoCNPJ.value = campoCNPJ.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    campoCNPJ.value = campoCNPJ.value.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
    campoCNPJ.value = campoCNPJ.value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
    campoCNPJ.value = campoCNPJ.value.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca barra entre o oitavo e o nono dígitos
    campoCNPJ.value = campoCNPJ.value.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca traço entre o 12º e o 13º dígitos
}
