//#region CONSTANTS
var currentBoard = null;

const learnStyles = { // Estilos disponíveis
    "numbers": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "letters": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    "colors": ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
    "fruits": ["🍎", "🍌", "🍇", "🍓", "🍊", "🍍", "🍉", "🥝", "🍑"],
    "animals": ["🐶", "🐱", "🐭", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁"]
};
//#endregion


class CellLearn
{
    constructor(row, col, quadrant, currentValue, editableStatus, size)
    {
        this.id = (size * row) + col; // ID da célula
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
    removedCellsNumber = parseInt(localStorage.getItem('removed_cells')); // Número de células a serem removidas
    boardType = localStorage.getItem('board_type'); // Tipo de tabuleiro escolhido
    sudokuStyle = localStorage.getItem('style_sudoku'); // Estilo do Sudoku
    sudokuErrors; // Status de mostrar erros
    container = document.getElementById("sudokucontainer"); // Container do tabuleiro+
    errorButton = document.getElementById('errorButton');
    cellDictionary = {}; // Dicionário de células
    cellList = []; // Lista de células
    sudokuSize; // Tamanho do tabuleiro
    cellSize; // Tamanho da célula
    rowCoordinate; // Linha escolhida
    colCoordinate; // Coluna escolhida
    quadrantCoordinate; // Quadrante escolhido
    boardMatrix = [];
    selectedCell = null; // Célula selecionada
    removedIndexes = [];
    //#endregion

    constructor() 
    {
        if(localStorage.getItem('sudoku_errors') == "true")
            this.sudokuErrors = true;
        else
            this.sudokuErrors = false;

        // Define o tamanho do tabuleiro e das células
        [this.sudokuSize, this.cellSize] = this.getSizes();
        // Define a linha, coluna e quadrante escolhidos
        [this.rowCoordinate, this.colCoordinate, this.quadrantCoordinate] = this.getRowColQuadPositions();
        // Define a matrix inicial baseada na linha, coluna e quadrante escolhidos
        this.boardMatrix = this.getInitialMatrix();
        this.initialMatrix = structuredClone(this.boardMatrix);
        // Preenche a linha e ou coluna e ou quadrante baseado na escolha do usuário
        this.cellDictionary = this.getCellDictionary();

        // Aplica o estilo ao tabuleiro
        this.updateStyle(this.sudokuStyle); 
        // Desabilita os botões de números desnecessários
        this.numberedButtonsVisibility(false); 
        this.removeCells();
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
                linha.push([this.getQuadrant(i,j), -1]);
            matrix.push(linha);
        }
        let rowValues;
        let rowComplete = [];
        let colValues;
        let quad;
        let quadCellsCoordinates = [];

        // Todos sem quadrante, mas com linha
        if(this.boardType =="1" || this.boardType =="4") 
        {
            rowValues = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Substituo a linha na matrix
            for (let i = 0; i < this.sudokuSize; i++)
            {
                rowComplete.push([this.rowCoordinate, i, matrix[this.rowCoordinate][i][0], rowValues[i]]);
                matrix[this.rowCoordinate][i][1] = rowValues[i];
            }

            // Linha com Coluna
            if(this.boardType =="4") 
            {
                colValues = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));           

                // Faz os dois vetores se cruzarem de maneira correta;
                let fixedValue = rowValues[this.colCoordinate];
                colValues[this.rowCoordinate] = fixedValue;
                colValues[colValues.indexOf(fixedValue)] = colValues[this.rowCoordinate];
                // Substituo a coluna na matrix
                for (let i = 0; i < this.sudokuSize; i++)
                {
                    if(i == this.colCoordinate)
                    {
                        for (let j = 0; j < this.sudokuSize; j++) 
                            matrix[j][i][1] = colValues[j];
                        break;
                    }
                }
            }
        }
        // Coluna
        else if(this.boardType =="2") 
        {
            colValues = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Substituo a coluna na matrix
            for (let i = 0; i < this.sudokuSize; i++)
            {
                if(i == this.colCoordinate)
                {
                    for (let j = 0; j < this.sudokuSize; j++) 
                        matrix[j][i][1] = colValues[j];
                    break;
                }
            }
        }
        // Todos com quadrante
        else if(this.boardType =="3" || this.boardType =="5" || this.boardType =="6" || this.boardType =="7") 
        {
            quad = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            for (let i = 0; i < this.sudokuSize; i++)
            {
                for (let j = 0; j < this.sudokuSize; j++) 
                {
                    if(matrix[i][j][0] == this.quadrantCoordinate)
                        quadCellsCoordinates.push([i,j]);
                }
            }
            for (let i = 0; i < this.sudokuSize; i++)
                matrix[quadCellsCoordinates[i][0]][quadCellsCoordinates[i][1]][1] = quad[i];
        }
        // Todos com quadrante e linha
        if(this.boardType =="5" || this.boardType =="7") 
        {
            // Gera um vetor com os número de 1 até n (tamanho sudoku)
            rowValues = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Remove os números desse vetor que já estejam no quadrante
            for(let i=0; i<this.sudokuSize; i++)
            {
                if(matrix[this.rowCoordinate][i][0] == this.quadrantCoordinate && matrix[this.rowCoordinate][i][1] != -1)            
                    rowValues.splice(rowValues.indexOf(matrix[this.rowCoordinate][i][1]), 1);
            }
            // Preenche a matriz com os valores restantes no vetor
            for(let i=0; i<this.sudokuSize; i++)
            {
                if(matrix[this.rowCoordinate][i][1] == -1)
                    matrix[this.rowCoordinate][i][1] = rowValues.pop();
            }
        }
        // Todos com quadrante e coluna
        if(this.boardType =="6" || this.boardType =="7") 
        {
            // Gera um vetor com os número de 1 até n (tamanho sudoku)
            colValues = this.shuffleArray(Array.from({ length: this.sudokuSize }, (_, i) => i + 1));
            // Remove os números desse vetor que já estejam no quadrante
            for(let i=0; i<this.sudokuSize; i++)
            {
                if(matrix[i][this.colCoordinate][0] == this.quadrantCoordinate && matrix[i][this.colCoordinate][1] != -1)            
                    colValues.splice(colValues.indexOf(matrix[i][this.colCoordinate][1]), 1);
            }
            // Preenche a matriz com os valores restantes no vetor
            for(let i=0; i<this.sudokuSize; i++)
            {
                if(matrix[i][this.colCoordinate][1] == -1)
                    matrix[i][this.colCoordinate][1] = colValues.pop();
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
            row.classList.add(`row`);
            // Cria uma nova célula
            for (let j = 0; j < this.sudokuSize; j++) {
                let editableStatus = false;
                let quadrant = this.getQuadrant(i, j);
                let cellValue = this.boardMatrix[i][j][1];
                let newCell = new CellLearn(i, j, quadrant, cellValue, editableStatus, this.sudokuSize);
                newCell.cellDiv = document.createElement("div");
                newCell.cellDiv.classList.add(`cell`);
                newCell.cellDiv.style.display = "flex";
                newCell.cellDiv.style.width = `${this.cellSize}px`;
                newCell.cellDiv.style.height = `${this.cellSize}px`;
                if(newCell.currentValue != -1) // Célula Visível
                {
                    newCell.cellDiv.classList.add("backgroundColor");
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
                    // Adiciona as bordas
                    let borders = this.getBorders(i, j);
                    borders.forEach(border => {
                        newCell.cellDiv.classList.add(border);
                    });
                    cellDictionary[newCell.id] = newCell;
                    this.cellList.push(newCell);
                }
                row.appendChild(newCell.cellDiv);
            }
            this.container.appendChild(row);
        }
        return cellDictionary;
    }

    getBorders(i, j)
    {
        let borders = [];
        if(i == (this.sudokuSize - 1) || (this.boardMatrix[i+1][j][1] != undefined && this.boardMatrix[i+1][j][1] == -1) || (this.boardMatrix[i+1][j][0] != undefined && this.boardMatrix[i+1][j][0] != this.boardMatrix[i][j][0]))
            borders.push('thickBottom');
        else if(this.boardMatrix[i+1][j][1] != undefined && this.boardMatrix[i+1][j][1] != -1)
            borders.push('visibleBottom')

        if(i == 0 || (this.boardMatrix[i-1][j][1] != undefined && this.boardMatrix[i-1][j][1] == -1))
            borders.push('thickTop');
        else if(this.boardMatrix[i-1][j][1] != undefined && this.boardMatrix[i-1][j][1] != -1)
            borders.push('visibleTop')

        if(j == (this.sudokuSize - 1) || (this.boardMatrix[i][j+1][1] != undefined && this.boardMatrix[i][j+1][1] == -1))
            borders.push('thickRight');
        else if(this.boardMatrix[i][j+1][1] != undefined && this.boardMatrix[i][j+1][1] != -1)
            borders.push('visibleRight')

        if(j == 0 || (this.boardMatrix[i][j-1][1] != undefined && this.boardMatrix[i][j-1][1] == -1) || (this.boardMatrix[i][j-1][0] != undefined && this.boardMatrix[i][j-1][0] != this.boardMatrix[i][j][0]))
            borders.push('thickLeft');
        else if(this.boardMatrix[i][j-1][1] != undefined && this.boardMatrix[i][j-1][1] != -1)
            borders.push('visibleLeft')

        return borders;
    }

    removeCells()
    {
        if(this.removedIndexes.length == 0)
        {
            let size = this.cellList.length - 1;
            for (let i = 0 ; i < this.removedCellsNumber; i++) 
            {
                let removedIndex = Math.floor(Math.random() * size);
                while(this.cellList[removedIndex].cellDiv.textContent == "")
                {
                    removedIndex = Math.floor(Math.random() * size);
                }
                this.cellList[removedIndex].cellDiv.textContent = "";
                this.cellList[removedIndex].editableStatus = true;
                this.cellList[removedIndex].currentValue = 0;
                this.removedIndexes.push(removedIndex);
            } 
        }
        else
        {
            let size = this.removedIndexes.length;
            for (let i = 0 ; i < size; i++)
            {
                const currentIndex = this.removedIndexes[i];
                this.cellList[currentIndex].cellDiv.textContent = "";
                this.cellList[currentIndex].editableStatus = true;
                this.cellList[currentIndex].currentValue = 0;
            }
        }
    }
    
    //#region OUTROS
    /** Adiciona os event listeners às células do tabuleiro
     * @param {CellLearn} clickedCell Célula clicada
     */
    cellBehaviourHandler(clickedCell)
    {
        // Limpa as cores de todas as células
        this.clearCells();
        this.selectedCell = clickedCell;
        if(this.sudokuErrors)
            this.showErrors();
        this.selectedCell.cellDiv.classList.add("selected");
        // Habilita ou desabilita os botões de números com base se a célula selecionada é editável
        const numberButtons = document.querySelectorAll(".numberButton");
        numberButtons.forEach((button) => { 
        if (button instanceof HTMLButtonElement && !this.selectedCell.editableStatus) 
            button.disabled = true;
        else if(button instanceof HTMLButtonElement)  
            button.disabled = false;
        });
        // Habilita ou desabilita o botão de apagar com base se a célula selecionada é editável
        const eraseButton = document.getElementById("eraseButton");
        if (eraseButton instanceof HTMLButtonElement)
            eraseButton.disabled = !this.selectedCell.editableStatus;
        else if(eraseButton instanceof HTMLButtonElement)
            eraseButton.disabled = false;
    }

    /** Gerencia os eventos dos botões de números
     * @param {number} clickedNumber
     */
    numberButtonManager(clickedNumber)
    {
         this.clearCells();
         this.selectedCell.cellDiv.classList.add("selected");
        if (this.selectedCell && this.selectedCell.editableStatus)
        {
            this.selectedCell.currentValue = clickedNumber;
            this.selectedCell.cellDiv.textContent = clickedNumber.toString();
            this.updateStyle(this.sudokuStyle);
            if(this.sudokuErrors)
                this.showErrors();
            if(this.checkWinSudoku())
            {
                this.numberedButtonsVisibility(true);
                document.getElementById('winModal').style.display = 'block';
            }
        }
    }

    /** Apaga o conteúdo da célula selecionada
     */
    eraseCell()
    {
        if (this.selectedCell && this.selectedCell.editableStatus) 
        {
            this.selectedCell.currentValue = 0;
            this.selectedCell.cellDiv.textContent = "";
            this.cellBehaviourHandler(this.selectedCell);
        }
    }

    clearCells()
    {
        Object.values(this.cellDictionary).forEach(cell => {
            cell.cellDiv.classList.remove("selected");
            cell.cellDiv.classList.remove("cellsWithSameValue");
            cell.cellDiv.classList.remove("incorrect");
        });
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
            else
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
    }

    showErrors()
    {
        Object.values(this.cellDictionary).forEach(cell => 
        {
            // Destaca as células na mesma linha ou coluna ou quadrante
            if ((cell.row == this.selectedCell.row ) && (this.selectedCell.row == this.rowCoordinate))
            {
                if ((cell.currentValue == this.selectedCell.currentValue) && (cell.currentValue != 0) && (cell.currentValue != -1) && (cell != this.selectedCell))
                {
                    cell.cellDiv.classList.add("incorrect");
                    this.selectedCell.cellDiv.classList.remove("selected");
                    this.selectedCell.cellDiv.classList.add("incorrect");
                }
            }

            // Destaca as células na mesma linha ou coluna ou quadrante
            if ((cell.col == this.selectedCell.col) && (this.selectedCell.col == this.colCoordinate))
            {
                if ((cell.currentValue == this.selectedCell.currentValue) && (cell.currentValue != 0) && (cell.currentValue != -1) && (cell !== this.selectedCell))
                {
                    cell.cellDiv.classList.add("incorrect");
                    this.selectedCell.cellDiv.classList.remove("selected");
                    this.selectedCell.cellDiv.classList.add("incorrect");
                }
            }
            // Destaca as células na mesma linha ou coluna ou quadrante
            if ((cell.quadrant == this.selectedCell.quadrant ) && (this.selectedCell.quadrant == this.quadrantCoordinate))
            {
                if ((cell.currentValue == this.selectedCell.currentValue) && (cell.currentValue != 0) && (cell.currentValue != -1) && (cell != this.selectedCell))
                {
                    cell.cellDiv.classList.add("incorrect");
                    this.selectedCell.cellDiv.classList.remove("selected");
                    this.selectedCell.cellDiv.classList.add("incorrect");
                }
            }

        });
        this.selectedCell.cellDiv.classList.add("selected");
    }

    /** Alterna a exibição dos erros
     */
    errorsManager()
    {
        this.sudokuErrors = !this.sudokuErrors;
        localStorage.setItem('sudoku_errors', this.sudokuErrors.toString());
        
        if(this.selectedCell !== null )
        {
            this.cellBehaviourHandler(this.selectedCell);
            this.selectedCell.cellDiv.classList.add("selected");
        }
        
        this.errorButton.classList.toggle("active", this.sudokuErrors);
    }

    checkWinSudoku()
    {
        
        let cellListSize = this.cellList.length;
        for(let i = 0; i < cellListSize; i++)
        {
            let currentCell = this.cellList[i];
            if(currentCell.currentValue == 0)
                return false;
            for(let j = 0; j < cellListSize; j++)
            {
                let nextCell = this.cellList[j];
                if(currentCell.id != nextCell.id && currentCell.currentValue == nextCell.currentValue && (currentCell.row == nextCell.row || currentCell.col == nextCell.col || currentCell.quadrant == nextCell.quadrant))
                    return false;
            }
        }       
        return true;
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

    /** Reinicia o jogo atual
     */
    restartGame()
    {
        this.clearCells();
        this.numberedButtonsVisibility(false); 
        document.getElementById('restartModal').style.display = 'none';
        this.selectedCell = null; // Célula selecionada
        let cellListSize = this.cellList.length;
        for(let i = 0; i < cellListSize; i++)
        {
            if(this.cellList[i].editableStatus == true)
            {
                this.cellList[i].currentValue = 0;
                this.cellList[i].cellDiv.textContent = "";
            }
        }
        this.removeCells();
        this.updateStyle(this.sudokuStyle);
        this.clearCells();
    }

    startNextGame()
    {
        document.getElementById('winModal').style.display = 'none';
        let removedClass = document.getElementsByClassName("cell");
        for (let i = removedClass.length - 1; i >= 0; i--) 
        {
            removedClass[i].remove();
        }
        removedClass = document.getElementsByClassName("row");
        for (let i = removedClass.length - 1; i >= 0; i--) 
        {
            removedClass[i].remove();
        }
        main();
    }
    //#endregion
}


//#region MAIN
/** Função principal para iniciar o jogo
 */
function main(){
    try
    {
        localStorage.setItem('sudoku_errors', "false");
        currentBoard = new BoardLearn();
    }
    catch
    {
        console.log("ERRO");
    }
}

main();
//#endregion