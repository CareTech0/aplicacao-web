function abrirModalDeslogar() {
const deslogarModal = document.getElementById("deslogarModal");
const closeButtons = document.querySelectorAll(".closeDeslogar");
const spanDeslogar = document.querySelector(".item-menu-deslogar");

function abrirDeslogarModal() {
  deslogarModal.style.display = "block";
}

spanDeslogar.addEventListener("click", function () {
  abrirDeslogarModal();
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    deslogarModal.style.display = "none";
  });
});

window.addEventListener("click", function (event) {
  if (event.target == deslogarModal) {
    deslogarModal.style.display = "none";
  }
});
}
