//#region CONSTANTS
var currentBoard = null;

const learnStyles = { // Estilos disponíveis
    "numbers": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "letters": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    "colors": ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
    "fruits": ["🍎", "🍌", "🍇", "🍓", "🍊", "🍍", "🍉", "🥝", "🍑"],
    "animals": ["🐶", "🐱", "🐭", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁"]
};

const ALL_BORDER_CLASSES = [
    'visibleLeft', 'visibleRight', 'visibleTop', 'visibleBottom',
    'thickLeft', 'thickRight', 'thickTop', 'thickBottom'
];
//#endregion


class CellLearn
{
    constructor(row, col, quadrant, currentValue, editableStatus)
    {
        this.id = `cell-${row}-${col}`; // ID da célula
        this.row = row; // Linha da célula
        this.col = col; // Coluna da célula
        this.quadrant = quadrant; // Quadrante da célula
        this.initialValue = currentValue; // Valor inicial da célula
        this.currentValue = currentValue; // Valor atual da célula
        this.editableStatus = editableStatus; // Se a célula é editável
        this.cellDiv = null; // Div da célula no DOM
    }
}


class BoardLearn
{
    //#region ATTRIBUTES
    availableHints = parseInt(localStorage.getItem('available_hints')); // Número de dicas disponíveis
    boardType = localStorage.getItem('board_type'); // Tipo de tabuleiro escolhido
    sudokuStyle = localStorage.getItem('style_sudoku'); // Estilo do Sudoku
    sudokuErrors = localStorage.getItem('sudoku_errors'); // Status de mostrar erros
    container = document.getElementById("sudokucontainer"); // Container do tabuleiro
    cellDictionary = {}; // Dicionário de células
    sudokuSize; // Tamanho do tabuleiro
    cellSize; // Tamanho da célula
    rowCoordinate; // Linha escolhida
    colCoordinate; // Coluna escolhida
    quadrantCoordinate; // Quadrante escolhido
    initialBoardMatrix = [];
    selectedCell = null; // Célula selecionada
    //#endregion

    constructor() 
    {
        // Define o tamanho do tabuleiro e das células
        [this.sudokuSize, this.cellSize] = this.getSizes();
        // Define a linha, coluna e quadrante escolhidos
        [this.rowCoordinate, this.colCoordinate, this.quadrantCoordinate] = this.getRowColQuadPositions();
        // Define a matrix inicial baseada na linha, coluna e quadrante escolhidos
        this.initialBoardMatrix = this.getInitialMatrix();
        // Preenche a linha e ou coluna e ou quadrante baseado na escolha do usuário
        this.cellDictionary = this.getCellDictionary();

        // Aplica o estilo ao tabuleiro
        this.updateStyle(this.sudokuStyle); 
        // Desabilita os botões de números desnecessários
        this.numberedButtonsVisibility(false); 
        // Atualiza o contador de dicas
        const hintCountElement = document.getElementById('hintCount');
        hintCountElement.textContent = String(this.availableHints);
    }
    
    /** Retorna o tamanho do tabuleiro baseado na escolha do usuário
     * @returns {Array} Array com o tamanho do tabuleiro e o tamanho da célula
     */
    getSizes()
    {
        let alphabetSize = localStorage.getItem('size_sudoku');
        let numberSize;
        if(alphabetSize === "a")
            numberSize = 4;
        else if(alphabetSize === "b")
            numberSize = 6;
        else
            numberSize = 9;
        
        let cellSize;
        if (numberSize == 4) 
            cellSize = 90;
        else if (numberSize == 6) 
            cellSize = 70;
        else
            cellSize = 50;

        return [numberSize, cellSize];
    }

    //#region Sorteia Linha, Coluna, Quadrante
    /** Escolhe aleatoriamente a linha, coluna e quadrante baseado no tipo de tabuleiro
     * @returns {Array} Array com a linha, coluna e quadrante escolhidos
     */
    getRowColQuadPositions()
    {
        let firstValue = Math.floor(Math.random() * (this.sudokuSize)); // Valor aleatório entre 0 e tamanho-1
        switch(this.boardType)
        {
        case "1": // Linha
            return[firstValue, 0, 0];
        case "2": // Coluna
            return[0, firstValue, 0];
        case "3": // Quadrante
            return[0, 0, firstValue];
        case "4": // Linha e coluna
            return[firstValue, Math.floor(Math.random() * (this.sudokuSize)), 0];
        case "5": // Linha e quadrante
            return[this.chooseRow(firstValue), 0, firstValue];
        case "6": // Coluna e quadrante
            return[0, this.chooseColumn(firstValue), firstValue];
        case "7": // Linha, coluna e quadrante
            return[this.chooseRow(firstValue), this.chooseColumn(firstValue), firstValue];
        }
    }

    /** Escolhe aleatoriamente a linha baseada no quadrante
     * @param {number} quadrant
     */
    chooseRow(quadrant)
    {
        switch(this.sudokuSize)
        {
            case 4:
                if(quadrant <= 1)
                    return Math.floor(Math.random() * 2);
                else
                    return Math.floor(Math.random() * 2) + 2;
            case 6:
                if(quadrant <= 1)
                    return Math.floor(Math.random() * 2);
                else if(quadrant <= 3)
                    return Math.floor(Math.random() * 2) + 2;
                else
                    return Math.floor(Math.random() * 2) + 4;
            case 9:
                if(quadrant <= 2)
                    return Math.floor(Math.random() * 3);
                else if(quadrant <= 5)
                    return Math.floor(Math.random() * 3) + 3;
                else
                    return Math.floor(Math.random() * 3) + 6;
        }
    }
    
    /** Escolhe aleatoriamente a coluna baseada no quadrante
     * @param {number} quadrant
     */
    chooseColumn(quadrant)
    {
        switch(this.sudokuSize)
        {
            case 4:
                const rest4 = quadrant % 2;
                if(rest4 === 0)
                    return Math.floor(Math.random() * 2);
                else
                    return Math.floor(Math.random() * 2) + 2;
            case 6:
                const rest6 = quadrant % 2;
                if(rest6 === 0)
                    return Math.floor(Math.random() * 3);
                else if(rest6 === 1)
                    return Math.floor(Math.random() * 3) + 3;
            case 9:
                const rest9 = quadrant % 3;
                if(rest9 === 0)
                    return Math.floor(Math.random() * 3);
                else if(rest9 === 1)
                    return Math.floor(Math.random() * 3) + 3;
                else
                    return Math.floor(Math.random() * 3) + 6;
        }
    }
    //#endregion

    getInitialMatrix()
    {
        let matrix = [];
        // Gera uma matriz do tamanho do sudoku, preenchida com -1 em todas as casas
        for (let i = 0; i < this.sudokuSize; i++)
        {
            const linha = [];
            for (let j = 0; j < this.sudokuSize; j++) 
                linha.push(-1);
            matrix.push(linha);
        }
        let row;
        let col;
        let quad;
        let coordenates = [];

        if(this.boardType =="1" || this.boardType =="4") // Linha ou linha com coluna
        {
            row = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Substituo a linha na matrix
            for (let i = 0; i < this.sudokuSize; i++)
            {
                if(i == this.rowCoordinate)
                {
                    for (let j = 0; j < this.sudokuSize; j++) 
                        matrix[i][j] = row[j];
                    break;
                }
            }

            if(this.boardType =="4") // Coluna com linha
            {
                col = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
                // Faz os dois vetores se cruzarem de maneira correta;
                let fixedValue = row[this.colCoordinate];
                let fixedIndex = this.rowCoordinate;
                const currentValueIndex = col.indexOf(fixedValue);
                const currentIndexValue = col[fixedIndex];
                col[fixedIndex] = fixedValue;
                col[currentValueIndex] = currentIndexValue;
                // Substituo a coluna na matrix
                for (let i = 0; i < this.sudokuSize; i++)
                {
                    if(i == this.colCoordinate)
                    {
                        for (let j = 0; j < this.sudokuSize; j++) 
                            matrix[j][i] = col[j];
                        break;
                    }
                }
            }
        }
        else if(this.boardType =="2") // Coluna
        {
            col = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Substituo a coluna na matrix
            for (let i = 0; i < this.sudokuSize; i++)
            {
                if(i == this.colCoordinate)
                {
                    for (let j = 0; j < this.sudokuSize; j++) 
                        matrix[j][i] = col[j];
                    break;
                }
            }
        }
        
        else if(this.boardType =="3" || this.boardType =="5" || this.boardType =="6" || this.boardType =="7") // Todos com quadrante
        {
            quad = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            for (let i = 0; i < this.sudokuSize; i++)
            {
                for (let j = 0; j < this.sudokuSize; j++) 
                {
                    if(this.getQuadrant(i, j) == this.quadrantCoordinate)
                        coordenates.push([i,j]);
                }
            }
            for (let i = 0; i < this.sudokuSize; i++)
                matrix[coordenates[i][0]][coordenates[i][1]] = quad[i];
        } 
        if(this.boardType =="5" || this.boardType =="7") // Quadrante e Linha
        {
            row = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Faz os dois vetores se cruzarem de maneira correta;
            let fixedValue = quad[this.rowCoordinate];
            let fixedIndex = this.quadrantCoordinate;
            let currentValueIndex = row.indexOf(fixedValue);
            let currentIndexValue = row[fixedIndex];
            row[fixedIndex] = fixedValue;
            row[currentValueIndex] = currentIndexValue;
            // Substituo a coluna na matrix
            for (let i = 0; i < this.sudokuSize; i++)
            {
                if(i == this.colCoordinate)
                {
                    for (let j = 0; j < this.sudokuSize; j++) 
                        matrix[j][i] = row[j];
                    break;
                }
            }
        } 
        else if(this.boardType =="6") // Quadrante e coluna
        {
         
        } 
        if(this.boardType =="7")// Quadrante, Linha e coluna
        {
          col = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Faz os dois vetores se cruzarem de maneira correta;
            let fixedValue = quad[this.colCoordinate];
            let fixedIndex = this.quadrantCoordinate;
            let currentValueIndex = col.indexOf(fixedValue);
            let currentIndexValue = col[fixedIndex];
            col[fixedIndex] = fixedValue;
            col[currentValueIndex] = currentIndexValue;
            // Substituo a coluna na matrix
            for (let i = 0; i < this.sudokuSize; i++)
            {
                for (let j = 0; j < this.sudokuSize; j++)
                {       
                    if(i == this.colCoordinate)
                        matrix[i][j] = col[i];
                }
            }
        }
        return matrix;
    }

    shuffleArray(array) 
    {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getQuadrant(row, col)
    {
        // Definimos as dimensões dos sub-blocos (quadrantes) com base no tamanho da grade
        let subGridHeight = 3;
        let subGridWidth = 3;
        if(this.sudokuSize != 9)
            subGridHeight = 2
        if(this.sudokuSize == 4)
            subGridWidth = 2;
        const quadrantRow = Math.floor(row / subGridHeight);
        const quadrantCol = Math.floor(col / subGridWidth);
        const numQuadrantCols = this.sudokuSize / subGridWidth;
        return quadrantRow * numQuadrantCols + quadrantCol;
    }

    getCellDictionary()
    {
        let cellDictionary = {};
        for (let i = 0; i < this.sudokuSize; i++) {
            const row = document.createElement("div");
            row.classList.add(`row${this.sudokuSize}`);
            // Cria uma nova célula
            for (let j = 0; j < this.sudokuSize; j++) {
                let editableStatus = false;
                let quadrant = this.getQuadrant(i, j);
                let cellValue = this.initialBoardMatrix[i][j];
                let newCell = new CellLearn(i, j, quadrant, cellValue, editableStatus);
                
                newCell.cellDiv = document.createElement("div");
                newCell.cellDiv.classList.add(`cell${this.sudokuSize}`);
                newCell.cellDiv.style.display = "flex";
                if(newCell.currentValue != -1) // Célula Visível
                {
                    newCell.cellDiv.classList.add("backgroundColor");
                    newCell.cellDiv.style.width = `${this.cellSize}px`;
                    newCell.cellDiv.style.height = `${this.cellSize}px`;
                    newCell.cellDiv.style.justifyContent = "center";
                    newCell.cellDiv.style.alignItems = "center";
                    newCell.cellDiv.style.fontSize = `${this.cellSize / 2}px`;
                    newCell.cellDiv.addEventListener("click", () => {
                        this.cellBehaviourHandler(newCell);
                    });
                    if(newCell.currentValue == 0)
                        newCell.cellDiv.textContent = "";
                    else 
                        newCell.cellDiv.textContent = newCell.currentValue;
                }
                else // Célula Invisível
                {
                    newCell.cellDiv.classList.add("#EBF3E8");
                }

                cellDictionary[newCell.id] = newCell;
                row.appendChild(newCell.cellDiv);
            }
            this.container.appendChild(row);
        }
        return cellDictionary;
    }

    

    //#region OUTROS
    /** Adiciona os event listeners às células do tabuleiro
     * @param {CellLearn} clickedCell Célula clicada
     */
    cellBehaviourHandler(clickedCell)
    {
        // // Limpa as cores de todas as células
        // this.clearCells();
        // this.selectedCell = clickedCell;
        // // Se a exibição das células relacionadas estiver ativada, mostra as células relacionadas
        // if(this.showPeersAndRelatedCellsStatus && !this.showErrorsStatus)
        //     this.showPeersAndRelatedCells();
        // // Se a exibição de erros estiver ativada, mostra os erros
        // else if(this.showErrorsStatus && !this.showPeersAndRelatedCellsStatus)
        //     this.showErrors();
        // this.selectedCell.cellDiv.classList.add("selected");
        // // Habilita ou desabilita os botões de números com base se a célula selecionada é editável
        // const numberButtons = document.querySelectorAll(".numberButton");
        // numberButtons.forEach((button) => { 
        // if (button instanceof HTMLButtonElement && !this.selectedCell.editableStatus) 
        //     button.disabled = true;
        // else if(button instanceof HTMLButtonElement)  
        //     button.disabled = false;
        // });
        // // Habilita ou desabilita o botão de apagar com base se a célula selecionada é editável
        // const eraseButton = document.getElementById("eraseButton");
        // if (eraseButton instanceof HTMLButtonElement)
        //     eraseButton.disabled = !this.selectedCell.editableStatus;
        // else if(eraseButton instanceof HTMLButtonElement)
        //     eraseButton.disabled = false;
    }

    /** Atualiza o estilo dos símbolos no tabuleiro e nos botões
     * @param {string} newStyle
     */
    updateStyle(newStyle) 
    {
        localStorage.setItem('style_sudoku', newStyle);
        this.sudokuStyle = newStyle;
        const mapping = learnStyles[this.sudokuStyle];

        // Atualiza as células do tabuleiro
        Object.values(this.cellDictionary).forEach(cell => 
        {
            if (cell.currentValue !== 0 && cell.currentValue !== -1) 
                cell.cellDiv.textContent = mapping[cell.currentValue - 1];
            else if (cell.currentValue !== -1)
                cell.cellDiv.textContent = "";
        });        
        
        // Atualiza os botões numéricos
        document.querySelectorAll(".numberButton").forEach((button, index) => 
        {
            if (index < this.sudokuSize) 
                button.textContent = mapping[index];
        });

        // Destaca o botão de estilo ativo
        document.querySelectorAll(".styleButton").forEach(button => 
        {
            button.classList.remove("activeStyle");
        });
        document.getElementById(newStyle).classList.add("activeStyle");

        // Atualiza a célula selecionada, se houver
        if(this.selectedCell !== null)
        {
            const mapping = learnStyles[this.sudokuStyle];
            this.selectedCell.cellDiv.textContent = mapping[this.selectedCell.currentValue - 1];
        }
    }

    /** Habilita ou desabilita os botões de números e apagar
     * @param {boolean} eraseAll - Se true, esconde todos os botões de números
     */
    numberedButtonsVisibility(eraseAll) 
    {
        if (eraseAll)
        {
            document.getElementById("eraseButton").style.display = "none";
            document.querySelectorAll(".numberButton").forEach((button) => 
            {
                if(button instanceof HTMLButtonElement)
                    button.style.display = "none";
            });
            return;
        }
        else
        {
            document.getElementById("eraseButton").style.display = "inline-block";
            document.querySelectorAll(".numberButton").forEach((button) => {
            if(button instanceof HTMLButtonElement)
                button.style.display = "inline-block";
            });
            if (this.sudokuSize != 9)
            {
                document.getElementById("numberButton9").style.display = "none";
                document.getElementById("numberButton8").style.display = "none";
                document.getElementById("numberButton7").style.display = "none";
                if (this.sudokuSize != 6)
                {
                    document.getElementById("numberButton6").style.display = "none";
                    document.getElementById("numberButton5").style.display = "none";
                }
            }
        }
    }
    //#endregion
}


//#region MAIN
/** Função principal para iniciar o jogo
 */
function main(){
    currentBoard = new BoardLearn();
}

main();
//#endregion