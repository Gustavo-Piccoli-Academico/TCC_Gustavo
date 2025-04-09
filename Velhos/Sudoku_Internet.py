# Cross product of elements in A and elements in B
def cross(A, B):  
    return [a+b for a in A for b in B]

# Convert grid to a dict of possible values, {square: digits}, or return False if a contradiction is detected
def parse_grid(grid): # To start, every square can be any digit; then assign values from the grid
    values = dict((s, digits) for s in squares)
    for s,d in grid_values(grid).items():
        if d in digits and not assign(values, s, d):
            return False # Fail if we can't assign d to square s
    return values

# Convert grid into a dict of {square: char} with '0' or '.' for empties
def grid_values(grid):
    chars = [c for c in grid if c in digits or c in '0.']
    assert len(chars) == 81
    return dict(zip(squares, chars))

# Eliminate all the other values (except d) from values[s] and propagate. Return values, except return False if a contradiction is detected
def assign(values, s, d):
    other_values = values[s].replace(d, '')
    if all(eliminate(values, s, d2) for d2 in other_values):
        return values
    else:
        return False

# Eliminate d from values[s]; propagate when values or places <= 2. Return values, except return False if a contradiction is detected
def eliminate(values, s, d):  
    if d not in values[s]: # Already eliminated
        return values
    values[s] = values[s].replace(d,'')
    ## (1) If a square s is reduced to one value d2, then eliminate d2 from the peers.
    if len(values[s]) == 0: # Contradiction: removed last value
        return False
    elif len(values[s]) == 1:
        d2 = values[s]
        if not all(eliminate(values, s2, d2) for s2 in peers[s]):
            return False
    ## (2) If a unit u is reduced to only one place for a value d, then put it there.
    for u in units[s]:
        dplaces = [s for s in u if d in values[s]]
        if len(dplaces) == 0: # Contradiction: no place for this value
            return False
        elif len(dplaces) == 1: # d can only be in one place in unit; assign it there
            if not assign(values, dplaces[0], d):
                return False
    return values

# Using depth-first search and propagation, try all possible values
def search(values):
    if values is False: # Failed earlier
        return False
    elif all(len(values[s]) == 1 for s in squares): # Solved
        return values
    else: # Chose the unfilled square s with the fewest possibilities
        n,s = min((len(values[s]), s) for s in squares if len(values[s]) > 1)
        return some(search(assign(values.copy(), s, d)) for d in values[s])

# Return some element of seq that is true
def some(seq):
    for e in seq:
        if e: return e
    return False

# Solves the puzzle
def solve(grid): 
    return search(parse_grid(grid))

 # Display these values as a 2-D grid
def display(values):
    width = 1+max(len(values[s]) for s in squares)
    line = '+'.join(['-'*(width*3)]*3)
    for r in rows:
        print (''.join(values[r+c].center(width)+('|' if c in '36' else '') for c in cols))
        if r in 'CF':
             print (line)


digits   = '123456789'
rows     = 'ABCDEFGHI'
cols     = digits
squares  = cross(rows, cols)
unitlist = ([cross(rows, c) for c in cols] + [cross(r, cols) for r in rows] + [cross(rs, cs) for rs in ('ABC','DEF','GHI') for cs in ('123','456','789')])
units = dict((s, [u for u in unitlist if s in u]) for s in squares)
peers = dict((s, set(sum(units[s],[]))-set([s])) for s in squares)

grid1  = '..3.2.6..9..3.5..1..18.64....81.29..7.......8..67.82....26.95..8..2.3..9..5.1.3..'
display(grid_values(grid1))
print("\n")
display(solve(grid1))