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

  menu.style.display = "flex"
}

function fecharMenu(){
  const menu = document.getElementById("menu_cell")

  menu.style.display = "none"
}