$(document).ready(function () {
  $(".carousel").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnClick: false,
    speed: 1000,
  });

  const coresPreSelecionadas = ['#A6C0E4', '#3F8EBF', '#90BEDA'];
  
  function changeHeaderColor(index) {
    let element = document.querySelector('.header');
    let cor = coresPreSelecionadas[index];
    element.style.backgroundColor = cor;
  }

  $(".carousel").on('afterChange', function(event, slick, currentSlide) {
    changeHeaderColor(currentSlide % coresPreSelecionadas.length);
  });

  $(".carousel").on('afterChange', function(event, slick, currentSlide) {
    changeHeaderColor(currentSlide % coresPreSelecionadas.length);
  });

  changeHeaderColor(0);
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));