// Criar a matriz 9x9 preenchida com 0s
let matriz9x9 = Array.from({ length: 9 }, () => Array(9).fill(0));
        
// Achar o elemento na página onde o conteúdo será exibido
let matrizDiv = document.getElementById('matriz');

// Criar a tabela para exibir a matriz
let tabela = '<table border="1" cellpadding="5" cellspacing="0">';


// Criar cada linha da tabela
matriz9x9.forEach(linha => {
    tabela += '<tr>';
    linha.forEach(celula => {
        tabela += `<td>${celula}</td>`;
    });
    tabela += '</tr>';
});

tabela += '</table>';

// Colocar a tabela dentro da div
matrizDiv.innerHTML = tabela;