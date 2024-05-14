function direcionarRAM() {
  window.location.href = "dashboardFilhaRAM.html";
}
function direcionarDISCO() {
  window.location.href = "dashboardFilhaDISCO.html";
}

function direcionarREDE() {
  window.location.href = "dashboardFilhaREDE.html";
}

function direcionarCPU() {
  window.location.href = "dashboardFilhaCPU.html";
}

function voltar() {
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function() {
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

