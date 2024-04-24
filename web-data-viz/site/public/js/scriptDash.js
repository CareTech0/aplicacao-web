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

document.addEventListener("DOMContentLoaded", function () {
    const deslogarModal = document.getElementById('deslogarModal');
    const closeButtons = document.querySelectorAll('.close');
    const spanDeslogar = document.querySelector('.item-menu-deslogar');
    
    function abrirDeslogarModal() { 
        deslogarModal.style.display = 'block';
    }
    
    spanDeslogar.addEventListener('click', function() {
        abrirDeslogarModal(); 
    });
    
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            deslogarModal.style.display = 'none';        
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == deslogarModal) {
            deslogarModal.style.display = 'none';        
        }
    });
    }); 