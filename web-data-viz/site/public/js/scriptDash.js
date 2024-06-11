

document.addEventListener("DOMContentLoaded", function () {
  function abrirFiltro() {
    var filtro = document.getElementById("filtro");

    if (filtro.style.display === "none" || filtro.style.display === "") {
      filtro.style.display = "block";
      console.log("filtro abertoooooooo");
    } else {
      filtro.style.display = "none";
      console.log("filtro fechadoooooooooo");
    }
  }

  document.getElementById("botaoFiltro").addEventListener("click", abrirFiltro);
});

function abrirModal() {
  const gerenciarModal = document.getElementById("gerenciarModal");

  function abrirGerenciarModal() {
    gerenciarModal.style.display = "block";
    console.log("Modal aberto");
  }

  const gerenciarBotao = document.querySelectorAll(".fundo-botao");
  const fecharBotao = document.querySelectorAll(".closeDeslogar");

  gerenciarBotao.forEach(function (button) {
    button.addEventListener("click", function () {
      abrirGerenciarModal();
    });
  });

  fecharBotao.forEach(function (button) {
    button.addEventListener("click", function () {
      gerenciarModal.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target == gerenciarModal) {
      gerenciarModal.style.display = "none";
    }
    var filtro = document.getElementById("filtro");
    if (
      !event.target.closest(".box-botao-filtro") &&
      filtro.style.display === "block"
    ) {
      filtro.style.display = "none";
      console.log("filtro fechadoooooooooooooooo");
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  abrirModal();
});

document.getElementById('botaoAplicarFiltro').addEventListener('click', aplicarFiltro);

