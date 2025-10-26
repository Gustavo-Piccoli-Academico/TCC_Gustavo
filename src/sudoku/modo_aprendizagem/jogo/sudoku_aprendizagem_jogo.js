//#region CONSTANTS
var currentBoard = null;

const styles = { // Estilos disponíveis
    "numbers": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "letters": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    "colors": ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
    "fruits": ["🍎", "🍌", "🍇", "🍓", "🍊", "🍍", "🍉", "🥝", "🍑"],
    "animals": ["🐶", "🐱", "🐭", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁"]
};
//#endregion


class CellLearn
{
    /**
     * Construtor da classe Cell
     * @param {number} row
     * @param {number} column
     * @param {number} currentValue //
     * @param {number} finalValue //
     * @param {boolean} editableStatus
     * @param {number} size
     */
    constructor(row, column, currentValue, finalValue, editableStatus, size) 
    {
        this.id = (size * row) + column; // ID único da célula
        this.cellDiv = null; // Referência ao elemento DOM da célula
        this.row = row; // Linha da célula
        this.column = column; // Coluna da célula
        this.currentValue = currentValue; // Valor atual da célula
        this.editableStatus = editableStatus; // true se a célula for editável, false caso contrário
    }
}


class MatrixLearn
{
    /** Construtor da classe Matrix
     */
    constructor() 
    {
        if(localStorage.getItem('sudoku_errors') === "true")
            this.showErrorsStatus = true;
        else
            this.showErrorsStatus = false;
        this.difficulty = Number(localStorage.getItem('difficulty_sudoku')); // Dificuldade do jogo
        this.size = Number(localStorage.getItem('size_sudoku')); // Tamanho do tabuleiro
        this.style = localStorage.getItem('style_sudoku'); // Estilo do tabuleiro
        this.container = document.getElementById("sudokucontainer"); // Container do tabuleiro
        this.selectedCell = null; // Célula selecionada
        this.initialPuzzle = []; // Quebra-cabeça inicial
        this.currentPuzzle = []; // Quebra-cabeça que vai ser atualizado durante o jogo
        this.solvedPuzzle = []; // Quebra-cabeça resolvido
        this.cellDictionary = {}; // Dicionário de células
        this.quadrantDictionary = {}; // Dicionário de quadrantes
        this.getInitialPuzzle(); // Inicializa o quebra-cabeça
        this.createSudokuBoard(); // Cria o tabuleiro
    }

    /** Seleciona um quebra-cabeça inicial com base no tamanho e dificuldade
     */
    getInitialPuzzle()
    {
        let puzzleSet = puzzles[this.size][this.difficulty.toString()];
        let selectedPuzzle = puzzleSet[Math.floor(Math.random() * puzzleSet.length)];
        // Trasnforma a string do puzzle inicial em uma matriz 2D
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(parseInt(selectedPuzzle.puzzle[i * this.size + j], 10));
            }
            this.initialPuzzle.push(row);
        }
        // Trasnforma a string do puzzle resolvido em uma matriz 2D
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(parseInt(selectedPuzzle.solution[i * this.size + j], 10));
            }
            this.solvedPuzzle.push(row);
        }
        // Copia a initial puzzle para a current puzzle
        this.currentPuzzle = JSON.parse(JSON.stringify(this.initialPuzzle));
    }

    /** Cria o tabuleiro do Sudoku
     */
    createSudokuBoard() 
    {
        let cellSize;
        if (this.size == 4) 
            cellSize = 90;
        else if (this.size == 6) 
            cellSize = 70;
        else if (this.size == 9) 
            cellSize = 50;
        
        this.container.innerHTML = "";
        // Cria as linhas do tabuleiro
        for (let i = 0; i < this.size; i++) {
            const row = document.createElement("div");
            row.classList.add(`row${this.size}`);
            // Cria uma nova célula
            for (let j = 0; j < this.size; j++) {
                let editableStatus = this.initialPuzzle[i][j] === 0 ? true : false;
                let newCell = new CellLearn(i, j, this.initialPuzzle[i][j], this.solvedPuzzle[i][j], editableStatus, this.size);
                newCell.cellDiv = document.createElement("div");
                newCell.cellDiv.classList.add(`cell${this.size}`);
                newCell.cellDiv.classList.add("backgroundColor");
                if(newCell.currentValue !== 0)
                    newCell.cellDiv.textContent = newCell.currentValue;
                else
                    newCell.cellDiv.textContent = "";
                newCell.cellDiv.style.width = `${cellSize}px`;
                newCell.cellDiv.style.height = `${cellSize}px`;
                newCell.cellDiv.style.display = "flex";
                newCell.cellDiv.style.justifyContent = "center";
                newCell.cellDiv.style.alignItems = "center";
                newCell.cellDiv.style.fontSize = `${cellSize / 2}px`;
                newCell.cellDiv.addEventListener("click", () => {
                    this.cellBehaviourHandler(newCell);
                });
                this.cellDictionary[newCell.id] = newCell;
                row.appendChild(newCell.cellDiv);
            }
            this.container.appendChild(row);
        }
    }

    /** Adiciona os event listeners às células do tabuleiro
     * @param {CellLearn} clickedCell Célula clicada
     */
    cellBehaviourHandler(clickedCell)
    {
        // Limpa as cores de todas as células
        this.clearCells();
        this.selectedCell = clickedCell;
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

    showErrors()
    {
        Object.values(this.cellDictionary).forEach(cell => 
        {
            // Destaca as células na mesma linha ou coluna ou quadrante
            if (cell.row === this.selectedCell.row || cell.column === this.selectedCell.column || cell.quadrant === this.selectedCell.quadrant) 
            {
                if (cell.currentValue == this.selectedCell.currentValue && cell.currentValue !== 0 && cell !== this.selectedCell)
                {
                    cell.cellDiv.classList.add("incorrect");
                    this.selectedCell.cellDiv.classList.remove("selected");
                    this.selectedCell.cellDiv.classList.add("incorrect");
                }
            }
        });
        this.selectedCell.cellDiv.classList.add("selected");
    }

    /** Verifica se o jogador venceu
     */
    checkWinSudoku()
    {
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                if (this.currentPuzzle[i][j] !== this.solvedPuzzle[i][j]) 
                    return false;
            }
        }
        return true;
    }

    clearCells()
    {
        Object.values(this.cellDictionary).forEach(cell => {
            cell.cellDiv.classList.remove("hintedCell");
            cell.cellDiv.classList.remove("selected");
            cell.cellDiv.classList.remove("cellsWithSameValue");
            cell.cellDiv.classList.remove("incorrect");
        });
    }
}


class BoardLearn
{
    /** Construtor da classe Board
     */
    constructor() 
    {
        // Instância da matriz do Sudoku
        this.matrix = new MatrixLearn(); 
        // Aplica o estilo ao tabuleiro
        this.updateStyle(this.matrix.style); 
        // Desabilita os botões de números desnecessários
        this.numberedButtonsVisibility(); 
        // Inicializa o número de dicas disponíveis
        this.availableHints = parseInt(localStorage.getItem('hints_sudoku'));
        const hintCountElement = document.getElementById('hintCount');
        hintCountElement.textContent = String(this.availableHints);
        // Define a cor inicial do botão de peers
        this.errorButton = document.getElementById('errorButton');
       if(this.matrix.showErrorsStatus)
            this.errorButton.classList.add("active");    
        else
            this.errorButton.classList.remove("active");
    }
    
    /** Habilita ou desabilita os botões de números e apagar
     */
    numberedButtonsVisibility() 
    {
        if (this.matrix.size != 9)
        {
            document.getElementById("numberButton9").style.display = "none";
            document.getElementById("numberButton8").style.display = "none";
            document.getElementById("numberButton7").style.display = "none";
            if (this.matrix.size != 6)
            {
                document.getElementById("numberButton6").style.display = "none";
                document.getElementById("numberButton5").style.display = "none";
            }
        }
    }

    errorsManager()
    {
        this.matrix.showErrorsStatus = !this.matrix.showErrorsStatus;
        localStorage.setItem('sudoku_errors', this.matrix.showErrorsStatus.toString());        
        if(this.matrix.selectedCell !== null )
            this.matrix.cellBehaviourHandler(this.matrix.selectedCell);
        
        if(this.matrix.selectedCell !== null)
            this.matrix.selectedCell.cellDiv.classList.add("selected");
        
        this.errorButton.classList.toggle("active", this.matrix.showErrorsStatus);
    }

    /**
     * Gerencia os eventos dos botões de números
     * @param {number} clickedNumber
     */
    numberButtonManager(clickedNumber)
    {
         this.matrix.clearCells();
         this.matrix.selectedCell.cellDiv.classList.add("selected");
        if (this.matrix.selectedCell && this.matrix.selectedCell.editableStatus)
        {
            this.matrix.selectedCell.currentValue = clickedNumber;
            this.matrix.currentPuzzle[this.matrix.selectedCell.row][this.matrix.selectedCell.column] = clickedNumber;
            this.updateStyle(this.matrix.style);
            if(this.matrix.checkWinSudoku())
                document.getElementById('winModal').style.display = 'block';
        }
    }

    /** Atualiza o estilo dos símbolos no tabuleiro e nos botões
     * @param {string} newStyle
     */
    updateStyle(newStyle) 
    {
        localStorage.setItem('style_sudoku', newStyle);
        this.matrix.style = newStyle;
        const mapping = styles[this.matrix.style];

        Object.values(this.matrix.cellDictionary).forEach(cell => 
        {
            if (cell.currentValue !== 0) 
                cell.cellDiv.textContent = mapping[cell.currentValue - 1];
            else 
                cell.cellDiv.textContent = "";
        });        
        
        // Atualiza os botões numéricos
        document.querySelectorAll(".numberButton").forEach((button, index) => 
        {
            if (index < this.matrix.size) 
                button.textContent = mapping[index];
        });

        // Destaca o botão de estilo ativo
        document.querySelectorAll(".styleButton").forEach(button => 
        {
            button.classList.remove("activeStyle");
        });

        document.getElementById(newStyle).classList.add("activeStyle");
        
        if(this.matrix.selectedCell !== null)
        {
            const mapping = styles[this.matrix.style];
            this.matrix.selectedCell.cellDiv.textContent = mapping[this.matrix.selectedCell.currentValue - 1];
        }
    }

    /** Reinicia o jogo atual
     */
    restartGame()
    {
        document.getElementById('restartModal').style.display = 'none';
        this.availableHints = parseInt(localStorage.getItem('available_hints')); // Número de dicas disponíveis
        document.getElementById("hintCount").textContent = String(this.availableHints);
        this.matrix.clearCells();
        this.matrix.selectedCell = null; // Célula selecionada
        this.matrix.cellDictionary = {}; // Dicionário de células
        this.matrix.quadrantDictionary = {}; // Dicionário de quadrantes
        this.matrix.currentPuzzle = JSON.parse(JSON.stringify(this.matrix.initialPuzzle));
        this.matrix.createSudokuBoard();
        this.updateStyle(this.matrix.style);
    }

    /** Inicia um novo jogo
     */
    startNextGame()
    {
        document.getElementById('winModal').style.display = 'none';
        main();
    }

    /** Apaga o conteúdo da célula selecionada
     */
    eraseCell()
    {
        if (this.matrix.selectedCell && this.matrix.selectedCell.editableStatus) 
        {
            this.matrix.selectedCell.currentValue = 0;
            this.matrix.selectedCell.cellDiv.textContent = "";
            this.matrix.currentPuzzle[this.matrix.selectedCell.row][this.matrix.selectedCell.column] = 0;
            this.matrix.cellBehaviourHandler(this.matrix.selectedCell);
        }
    }

    showHintModal()
    {
        if(this.availableHints <= 0) 
            document.getElementById('NoMoreHintsModal').style.display = 'block';
        else
            document.getElementById('hintsModal').style.display = 'block';
    }

    /** Fornece uma dica ao jogador
     */
    useHint() 
    {
        if(this.availableHints <= 0) return;
        if(Object.values(this.matrix.cellDictionary).every(cell => cell.currentValue !== 0)) 
            return;
        this.availableHints -= 1;
        document.getElementById("hintCount").textContent = this.availableHints.toString();
        this.matrix.clearCells();
        this.matrix.selectedCell = null;
        let randomID = Math.floor(Math.random() * (this.matrix.size ** 2));
        while(this.matrix.cellDictionary[randomID].currentValue !== 0) {
            randomID = Math.floor(Math.random() * (this.matrix.size ** 2));
            if(Object.values(this.matrix.cellDictionary).every(cell => cell.currentValue !== 0)) 
                break;
        }

        this.matrix.cellDictionary[randomID].currentValue = this.matrix.cellDictionary[randomID].finalValue;
        this.matrix.currentPuzzle[this.matrix.cellDictionary[randomID].row][this.matrix.cellDictionary[randomID].column] = this.matrix.cellDictionary[randomID].finalValue;
        const mapping = styles[this.matrix.style];
        this.matrix.cellDictionary[randomID].cellDiv.textContent = mapping[this.matrix.cellDictionary[randomID].finalValue - 1];
        this.matrix.cellDictionary[randomID].cellDiv.classList.add("hintedCell");
        document.getElementById('hintsModal').style.display = 'none';
    }

}


//#region MAIN
/** Função principal para iniciar o jogo
 */
function main(){
    currentBoard = new BoardLearn();
}

main();
//#endregion