
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Comportamento dos Botões da Tela
/////////////////////////////////////////////////////////////////////////////////////////////////////
localStorage.clear();
let type = null;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
  switch(event.target.id){
    case 'homeButton':
        window.location.href = "../../logicamente/logicamente.html";
        break;

    case 'rulesButton':
        document.getElementById('rulesModal').style.display = 'block';
        break;
    case ('livreButton'):{
      type_resta1 = "none"
      localStorage.setItem('type', type_resta1);
      window.location.href = "../jogo/tangram_jogo.html";
      break;
  }

    case ('restartButton'): { // Detects when the user clicks on the "Restart" button
        document.getElementById('restartModal').style.display = 'block';
        modal = 1;
        break;
    }
    
    default:
        if (event.target.classList.contains('close')) {
            document.getElementById('rulesModal').style.display = 'none';
            document.getElementById('boardModal').style.display = 'none';
        }
        else if (event.target == document.getElementById('rulesModal')|| event.target == document.getElementById('boardModal')) {
            event.target.style.display = 'none';
        }
  }
});