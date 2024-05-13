$(document).ready(function () {
  $(".carousel").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnClick: false,
    speed: 1000,
  });
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const services = document.getElementById("jumpServices");
const contact = document.getElementById("jumpContact")

hamburger.addEventListener("click", () => nav.classList.toggle("active"));
services.addEventListener("click", () => nav.classList.toggle("active"));
contact.addEventListener("click", () => nav.classList.toggle("active"));