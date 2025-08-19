
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
    
    case ('playButton'):{
        if (type != null){
            localStorage.setItem('type', type);
            window.location.href = "../jogo/tangram_jogo.html";
        }
        else{
            document.getElementById('boardModal').style.display = 'block';
        }
        break;
    }
    case ('livreButton'):{
      type = "none"
      localStorage.setItem('type', type);
      window.location.href = "../jogo/tangram_jogo.html";
      break;
  }

    case ('restartButton'): { // Detects when the user clicks on the "Restart" button
        document.getElementById('restartModal').style.display = 'block';
        modal = 1;
        break;
    }
    
    // Botões de animais/objetos
    case 'aguiaButton':
        type = "aguia_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("aguiaButton").classList.add("active");
        break;
    
    case 'anjoButton':
        type = "anjo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("anjoButton").classList.add("active");
        break;
    
    case 'barcoButton':
        type = "barco_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("barcoButton").classList.add("active");
        break;
    
    case 'buleButton':
        type = "bule_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("buleButton").classList.add("active");
        break;
    
    case 'cachorroButton':
        type = "cachorro_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("cachorroButton").classList.add("active");
        break;
    
    case 'cameloButton':
        type = "camelo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("cameloButton").classList.add("active");
        break;
    
    case 'cameraButton':
        type = "camera_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("cameraButton").classList.add("active");
        break;
    
    case 'camisaButton':
        type = "camisa_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("camisaButton").classList.add("active");
        break;
    
    case 'canguruButton':
        type = "canguru_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("canguruButton").classList.add("active");
        break;
    
    case 'caranguejoButton':
        type = "caranguejo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("caranguejoButton").classList.add("active");
        break;
    
    case 'casaButton':
        type = "casa_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("casaButton").classList.add("active");
        break;
    
    case 'casteloButton':
        type = "castelo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("casteloButton").classList.add("active");
        break;
    
    case 'cataVentoButton':
        type = "cataVento_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("cataVentoButton").classList.add("active");
        break;
    
    case 'cavaloButton':
        type = "cavalo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("cavaloButton").classList.add("active");
        break;
    
    case 'celeiroButton':
        type = "celeiro_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("celeiroButton").classList.add("active");
        break;
    
    case 'cisneButton':
        type = "cisne_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("cisneButton").classList.add("active");
        break;
    
    case 'coracaoButton':
        type = "coracao_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("coracaoButton").classList.add("active");
        break;
    
    case 'doceButton':
        type = "doce_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("doceButton").classList.add("active");
        break;
    
    case 'espadaButton':
        type = "espada_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("espadaButton").classList.add("active");
        break;
    
    case 'galoButton':
        type = "galo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("galoButton").classList.add("active");
        break;
    
    case 'girafaButton':
        type = "girafa_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("girafaButton").classList.add("active");
        break;
    
    case 'lampadaButton':
        type = "lampada_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("lampadaButton").classList.add("active");
        break;
    
    case 'meninoComCopoButton':
        type = "meninoComCopo_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("meninoComCopoButton").classList.add("active");
        break;
    
    case 'moinhoDeVentoButton':
        type = "moinhoDeVento_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("moinhoDeVentoButton").classList.add("active");
        break;
    
    case 'peixeButton':
        type = "peixe_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("peixeButton").classList.add("active");
        break;
    
    case 'peruButton':
        type = "peru_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("peruButton").classList.add("active");
        break;
    
    case 'pinheiroButton':
        type = "pinheiro_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("pinheiroButton").classList.add("active");
        break;
    
    case 'ponteButton':
        type = "ponte_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("ponteButton").classList.add("active");
        break;
    
    case 'regadorButton':
        type = "regador_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("regadorButton").classList.add("active");
        break;
    
    case 'rinoceronteButton':
        type = "rinoceronte_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("rinoceronteButton").classList.add("active");
        break;
    
    case 'tartarugaButton':
        type = "tartaruga_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("tartarugaButton").classList.add("active");
        break;
    
    case 'vacaButton':
        type = "vaca_matrix";
        document.querySelectorAll(".buttonGroup button").forEach(button => {
            button.classList.remove("active");
        });
        document.getElementById("vacaButton").classList.add("active");
        break;
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