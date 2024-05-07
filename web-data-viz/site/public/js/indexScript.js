$(document).ready(function () {
  $(".carousel").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnClick: false,
    speed: 1000,
  });
});

function abrirMenu(){
  const menu = document.getElementById("menu_cell")
  const cabecalho = document.getElementById("cabecalho")

  menu.style.display = "flex"
  cabecalho.style.display = "none"
}

function fecharMenu(){
  const menu = document.getElementById("menu_cell")
  const header = document.getElementById("cabecalho")

  header.style.display = "flex"
  menu.style.display = "none"
}

