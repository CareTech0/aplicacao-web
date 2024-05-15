const id = sessionStorage.ID_USER;

function validarSessao(){
    if(id == null){
        window.location="/index";
    }
}

function sairConta(){
    sessionStorage.clear();
    window.location = "/index";
}