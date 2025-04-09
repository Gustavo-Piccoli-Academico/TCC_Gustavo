
class ResolveEClassifica:
    
    def CandidatoSimples(self, grid):
        return grid

    def PosiçãoSimples(self, grid):
        return grid

    def LinhasCandidatas(self, grid):
        return grid

    def SubconjuntosDisjuntos(self, grid):
        return grid

    def PropagacaoRestricoes(self, grid):
        return grid

    def solved(self, grid):
        if (grid):
            return True
        else:
            return False

    def SolveAndRate(self, grid):
        advanced = False
        grid0 = grid
        while advanced == True:
            self.CandidatoSimples(grid)
            self.PosiçãoSimples(grid)
            if grid == grid0:
                usedDedutiveTechs = True
                self.CandidatoSimples(grid).LinhasCandidatas(grid)
                self.CandidatoSimples(grid).SubconjuntosDisjuntos(grid)
            if grid == grid0:
                advanced = True
        if not(self.solved(grid)):
            self.CandidatoSimples(grid).PropagacaoRestricoes(grid)
            return grid, "HARD"
        elif self.solved(grid):
            if usedDedutiveTechs:
                return grid, "MEDIUM"
            else:
                return grid, "EASY"

class NovoSudoku:
    
    def getRandomFilledNotVisitedSquare(self):
        return 0

    def removeElement(self, grid, randomSquare):
        return grid

    def isUniqueSolution(self, grid):
        if (grid):
            return True
        else:
            return False

    def assignElement(self, grid, randomSquare):
        return grid

    def notVisitedSquaresSize(self, grid):
        return 0

    def GENERATE(self, grid, cluesRemoved):
        advanced = True
        while cluesRemoved > 0:
            randomSquare = self.getRandomFilledNotVisitedSquare()
            self.removeElement(grid, randomSquare)
            if self.isUniqueSolution(grid):
                cluesRemoved = cluesRemoved - 1
            else:
                self.assignElement(grid, randomSquare) 
            if self.notVisitedSquaresSize(grid) == 0: 
                break
