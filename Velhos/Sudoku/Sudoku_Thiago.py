from collections import Counter
#####################################################################################################################################################################
def string_para_matriz(grid): return [[int(grid[i * 9 + j]) for j in range(9)] for i in range(9)]


#####################################################################################################################################################################








# Check if the matrix is solved
def Basic_Resolution(initial_matrix, solved_matrix):
    def Basic(initial_matrix):
        # Generate possible values for each empty cell in the matrix.
        def Possibilities(matrix):
            # parameter matrix - Current state of the Sudoku grid
            # return - List of possible values for each cell
            possible_values = []
            for i in range(9):
                for j in range(9):
                    if matrix[i][j] != 0:  # If the cell is already filled, return an empty set
                        possible_values.append([])
                    else:
                        possible = list(range(1, 10))  # Set of all possible numbers (1 to 9)
                        for num in matrix[i]:  # Remove numbers already present in the same row
                            if num in possible:
                                possible.remove(num)
                        for r in range(9):  # Remove numbers already present in the same column
                            if matrix[r][j] in possible:
                                possible.remove(matrix[r][j])
                        start_row, start_col = 3 * (i // 3), 3 * (j // 3)  # Determine the 3x3 region of the cell
                        for r in range(start_row, start_row + 3):  # Remove numbers already present in the same 3x3 region
                            for c in range(start_col, start_col + 3):
                                if matrix[r][c] in possible:
                                    possible.remove(matrix[r][c])
                        possible_values.append(possible)
            return possible_values

        #Apply the unique position rule to a group of possible values.
        def Apply_Unique_Position_Rule(group_values, assign_fn):
            # parameter group_values - List of possible values grouped by rows, columns, or quadrants
            # parameter assign_fn - Function to assign a value to the matrix based on index
            for index, group in enumerate(group_values):
                flat_values = [value for sublist in group for value in sublist]
                value_count = {v: flat_values.count(v) for v in set(flat_values)}
                for sub_idx, sublist in enumerate(group):
                    unique_values = [v for v in sublist if value_count[v] == 1]
                    if len(unique_values) == 1:
                        assign_fn(index, sub_idx, unique_values[0])
                        nonlocal possible_values
                        possible_values = Possibilities(matrix)

        matrix = [row[:] for row in initial_matrix]
        possible_values = Possibilities(matrix)

        # Apply simple candidate rule
        for i in range(81):
            if len(possible_values[i]) == 1:
                matrix[i // 9][i % 9] = possible_values[i][0]
                possible_values = Possibilities(matrix)

        # Apply rule for rows
        row_groups = [possible_values[i:i + 9] for i in range(0, 81, 9)]
        Apply_Unique_Position_Rule(row_groups, lambda x, y, v: matrix[x].__setitem__(y, v))

        # Apply rule for columns
        col_groups = [[possible_values[x * 9 + y] for x in range(9)] for y in range(9)]
        Apply_Unique_Position_Rule(col_groups, lambda x, y, v: matrix[y].__setitem__(x, v))

        # Apply rule for 3x3 regions
        quadrant_groups = [[] for _ in range(9)]
        for i in range(9):
            for j in range(9):
                quadrant_index = (i // 3) * 3 + (j // 3)
                quadrant_groups[quadrant_index].append(possible_values[i * 9 + j])
        Apply_Unique_Position_Rule(quadrant_groups, lambda x, y, v: matrix[3 * (x // 3) + (y // 3)].__setitem__(3 * (x % 3) + (y % 3), v))
        print(matrix)
        return matrix

    matrix = [linha[:] for linha in initial_matrix]
    while True:
        transformed_matrix = Basic(matrix)
        if transformed_matrix == matrix:  # Exit if no further changes
            break
        matrix = transformed_matrix  # Update only if changes occurred
    return matrix == solved_matrix

#####################################################################################################################################################################


#Aplica tecnicas intermediarias
def Intermediate_Solution(initial_matrix, solved_matrix):
    def Candidate_Lines(matrix):
        return False

    def Disjoint_Subsets(matrix):
        return False

    matrix = [linha[:] for linha in initial_matrix]
    matrix = Candidate_Lines(matrix)
    matrix = Disjoint_Subsets(matrix)
    while (matrix != initial_matrix):
        matrix = Candidate_Lines(matrix)
        matrix = Disjoint_Subsets(matrix)
    if matrix == solved_matrix:
        return True
    else:
        return False


#####################################################################################################################################################################
def Restrain_Propagation(matrix):
    return False

#Aplica tecnicas avançadas
def Advanced_Resolution(initial_matrix, solved_matrix):
    matrix = [linha[:] for linha in initial_matrix]
    matrix = Restrain_Propagation(matrix) 
    while (matrix != initial_matrix):
        matrix = Restrain_Propagation(matrix)
    if matrix == solved_matrix:
        return True
    else:
        return False


#####################################################################################################################################################################
medium = False
initial_grid= '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
initial_matrix = string_para_matriz(initial_grid)
solved_grid = '483921657967345821251876493548132976729564138136798245372689514814253769695417382'
solved_matrix = string_para_matriz(solved_grid)



# if (Basic_Resolution(initial_matrix, solved_matrix)):
#    print("EASY")
# elif (Intermediate_Solution(initial_matrix, solved_matrix)):
#     print("MEDIUM")
# elif (Advanced_Resolution(initial_matrix, solved_matrix)):
#     print("HARD")

print(initial_matrix)
#print(Basic_Resolution(initial_matrix, solved_matrix))
#print(Intermediate_Solution(initial_matrix, solved_matrix))
print(Advanced_Resolution(initial_matrix, solved_matrix))
