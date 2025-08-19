/////////////////////////////////////////////////////////////////////////////////////////////////////
// Variáveis e Constantes Globais
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Variáveis principais
const pieces = [];
let selectedPiece = null;
let rotateCircle = null;
let isDragging = false;
let isRotating = false;
let dragOffset = { x: 0, y: 0 };
let startAngle = 0;
let center = { x: 0, y: 0 };
const svg = document.getElementById('svgCanvas');
const piecesData = [ // Dados das peças
  
  { points: "0,0   300,0  0,300",           fill: "#e67e22", rotation: 225, tx: 189,  ty: -50, nome: "tri_lar"},  // Triangulo laranja
  { points: "0,0   300,0  0,300",           fill: "#2ecc71", rotation: 135, tx: 176,  ty: 162, nome: "tri_ver_g"}, // Triangulo verde grande
  { points: "0,0   212,0  212,212",         fill: "#3498db", rotation: 90,  tx: 295,  ty: 269, nome: "tri_azul"}, // Triangulo azul
  
  { points: "0,0   150,0  0,150",           fill: "#1abc9c", rotation: 315, tx: 401, ty: 57, nome: "tri_ver_p"}, // Triangulo verde pequeno
  { points: "0,0   150,0  0,150",           fill: "#e74c3c", rotation: 45,  tx: 189, ty: 269, nome: "tri_verme"}, // Triangulo vermelho
  { points: "0,0   150,0  150,150   0,150", fill: "#f1c40f", rotation: 45,  tx: 295, ty: 162, nome: "qua_ama"}, // Quadrado amarelo
  
  { points: "106,0 317,0  211,106   0,106", fill: "#9b59b6", rotation: 0,   tx: 135,  ty: 322, nome: "para_rox"}, // Paralelograma roxo
];

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Funções para criar as peças e o círculo de rotação
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para criar elementos SVG
function createSVGElement(tag, attrs) {
  const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const attr in attrs) {
    elem.setAttribute(attr, attrs[attr]);
  }
  return elem;
}

// Cria as peças
piecesData.forEach((data, i) => {
  const piece = createSVGElement('polygon', {
    points: data.points,
    fill: data.fill,
    class: 'piece',
    name: data.nome,
  });
  svg.appendChild(piece);
  const bbox = piece.getBBox();
  switch(data.nome) {
    case 'tri_lar':
      piece.setAttribute('transform', `translate(189, -50) rotate(225)`);
      break;
    // adicione outros casos se quiser
  }
  pieces.push({
    elem: piece,
    original_rotation: piecesData[i].rotation,
    rotation: piecesData[i].rotation,
    tx: ((svg.clientWidth - bbox.width) / 2),
    ty: ((svg.clientHeight - bbox.height) / 2),
    cx: bbox.x + bbox.width / 2,
    cy: bbox.y + bbox.height / 2
  });
  updateTransform(pieces[i]);
});

// Cria o círculo de rotação
rotateCircle = createSVGElement('circle', {
  class: 'rotate-circle',
  r: 80,
  cx: 0,
  cy: 0,
  style: 'display:none'
});
svg.appendChild(rotateCircle);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Funções Auxiliares
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Seleciona uma peça
function selectPiece(piece) {
  selectedPiece = piece;
  updateRotateCircle();
  rotateCircle.style.display = 'block';
}

// Desseleciona a peça
function deselectPiece() {
  selectedPiece = null;
  rotateCircle.style.display = 'none';
}

// Atualiza posição e rotação de uma peça
function updateTransform(data) {
  data.elem.setAttribute('transform', `
    translate(${data.tx}, ${data.ty})
    rotate(${data.rotation}, ${data.cx}, ${data.cy})
  `);
}

// Atualiza a posição do círculo de rotação
function updateRotateCircle() {
  if (!selectedPiece) return;
  const data = pieces.find(p => p.elem === selectedPiece);
  center.x = data.tx + data.cx;
  center.y = data.ty + data.cy;
  rotateCircle.setAttribute('cx', center.x);
  rotateCircle.setAttribute('cy', center.y);
}

// Obtém posição do mouse no SVG
function getMousePos(evt) {
  const CTM = svg.getScreenCTM();
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  };
}

// Calcula o ângulo entre dois pontos
function getAngle(center, point) {
  return Math.atan2(point.y - center.y, point.x - center.x) * (180 / Math.PI);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Eventos dos Elementos SVG
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Atualiza o tamanho do SVG quando a janela é redimensionada
window.addEventListener('resize', () => {
  pieces.forEach((data) => {
    data.rotation = data.original_rotation;
    const bbox = data.elem.getBBox();
    data.tx = (svg.clientWidth - bbox.width) / 2;
    data.ty = (svg.clientHeight - bbox.height) / 2;
    data.cx = bbox.x + bbox.width / 2;
    data.cy = bbox.y + bbox.height / 2;
    updateTransform(data);
  });
  updateRotateCircle();
});

// Quando o mouse é pressionado
svg.addEventListener('mousedown', (e) => {
  const target = e.target;
  const mousePos = getMousePos(e);
  if (target.classList.contains('rotate-circle')) { // Clicou no círculo: inicia rotação
    isRotating = true;
    isDragging = false;
    startAngle = getAngle(center, mousePos);
  }
  else if (target.classList.contains('piece')) { // Clicou numa peça: inicia arrasto
    selectPiece(target);
    const data = pieces.find(p => p.elem === selectedPiece);
    dragOffset.x = mousePos.x - data.tx;
    dragOffset.y = mousePos.y - data.ty;
    isDragging = true;
    isRotating = false;
  }
  else { // Clicou fora: desseleciona
    deselectPiece();
  }
});

// Quando o mouse é movido
svg.addEventListener('mousemove', (e) => {
  if (!selectedPiece){
    return; // Se não houver peça selecionada, não faz nada
  }
  const mousePos = getMousePos(e);
  const data = pieces.find(p => p.elem === selectedPiece);
  if (isDragging) { // Arrastando a peça
    data.tx = mousePos.x - dragOffset.x;
    data.ty = mousePos.y - dragOffset.y;
    updateTransform(data);
    updateRotateCircle();
  }
  if (isRotating) { // Rotacionando a peça
    const currentAngle = getAngle(center, mousePos);
    const delta = currentAngle - startAngle;
    const stepSize = 15;
    if (Math.abs(delta) >= stepSize) {
      const step = Math.round(delta / stepSize) * stepSize;
      data.rotation += step;
      startAngle += step;
      updateTransform(data);
    }
  }
});

// Quando o mouse é solto
svg.addEventListener('mouseup', () => {
  // Finaliza ação atual
  isDragging = false;
  isRotating = false;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Comportamento dos Botões da Tela
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Evento para identificar qual modal está aberto
document.addEventListener("click", function (event) {
    const target = event.target;
    switch(target.id){
        case ('confirmNo'):{ // Detects when the user clicks on the "No" button in the restart window
            document.getElementById('restartModal').style.display = 'none';
            document.getElementById('homeModal').style.display = 'none';
            document.getElementById('backModal').style.display = 'none';
            break;
        }
        case ('confirmYes'): { // Detects when the user clicks on the "Yes" button in the restart window
            if (modal == 1){
                document.getElementById('restartModal').style.display = 'none';
                window.location.href = "tangram_jogo.html";
            }
            else if (modal == 2){
                document.getElementById('homeModal').style.display = 'none';
                window.location.href = "logicamente.html";
            }
            else if (modal == 3){
                document.getElementById('backModal').style.display = 'none';
                window.location.href = "tangram_menu.html";
            }
            break;
        }
        case ('restartButton'): { // Detects when the user clicks on the "Restart" button
            document.getElementById('restartModal').style.display = 'block';
            modal = 1;
            break;
        }
        case('homeButton'):{ // Detects when the user clicks on the home button
            document.getElementById('homeModal').style.display = 'block';
            modal = 2;
            break;
        }
        case ('backButton'): { // Detects when the user clicks on the "Home" button
          document.getElementById('backModal').style.display = 'block';
          modal = 3;
          break;
      }
        case ('rulesButton'):{ // Detects when the user clicks on the rules button
            document.getElementById('rulesModal').style.display = 'block';
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
            if (target.classList.contains('close')) { // Detects when the user clicks on a close button
                document.getElementById('rulesModal').style.display = 'none';
                document.getElementById('restartModal').style.display = 'none';
                document.getElementById('homeModal').style.display = 'none';
                document.getElementById('backModal').style.display = 'none';
            }
            else if (target == document.getElementById('restartModal') || target == document.getElementById('rulesModal') || target == document.getElementById('homeModal') || target == document.getElementById('backModal')) { // Detects when the user clicks outside the modal
                target.style.display = 'none';
            }
        }
    }
}); 
