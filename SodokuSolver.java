import java.util.Arrays;
import java.util.Random;

/**
 * Sudoku Solver:
 * 
 * This Java implementation serves as the foundation for my JavaScript backend. 
 * I chose Java initially because I was more familiar with the framework. 
 * Writing the solver in Java allowed me to later apply the same logic to my server.js file.
 * 
 */

public class SodokuSolver {

    // Board and Difficulty Set Up
    private static final int GRID_SIZE = 9;
    private static final int EASYMODE = 38;
    private static final int MEDIUMMODE = 27;
    private static final int HARDMODE = 23;

    // Running a Example Case
    public static void main(String[] args) throws Exception {
        int[][] exampleSudokuBoard = createBoard(MEDIUMMODE);

        if (solveBoard(exampleSudokuBoard)) {
            System.out.println();
            System.out.println("Solved Board!");
        } else {
            System.out.println();
            System.out.println("Unsolvable Board!");
        }
        printBoard(exampleSudokuBoard);
    }

    /**
     * Creates a randomly generated board with a specified number of filled cells.
     * 
     * @param numFilledCells The number of cells to be filled initially.
     * @return The generated Sudoku board.
     */
    private static int[][] createBoard(int numFilledCells) {
        int[][] board = null;
        boolean solved = false;
        Random random = new Random();
    
        while (!solved) {
            // Initialize with a new board on each iteration
            board = new int[GRID_SIZE][GRID_SIZE]; 
    
            // Fill the board with 0 initially (empty cells)
            for (int i = 0; i < GRID_SIZE; i++) {
                Arrays.fill(board[i], 0);
            }
    
            // Fill a given number of cells with random values to create a valid Sudoku puzzle
            int count = 0;
            while (count <= numFilledCells) {
                int row = random.nextInt(GRID_SIZE);
                int col = random.nextInt(GRID_SIZE);
                int number = random.nextInt(GRID_SIZE) + 1;
    
                if (board[row][col] == 0 && validLocation(board, number, row, col)) {
                    board[row][col] = number;
                    count++;
                }
            }
    
            // Create a deep copy of the board before solving it
            int[][] copyBoard = new int[GRID_SIZE][GRID_SIZE];
            for (int i = 0; i < GRID_SIZE; i++) {
                copyBoard[i] = Arrays.copyOf(board[i], GRID_SIZE);
            }
            
            // Check if the board can be solved with the current set of filled cells
            solved = solveBoard(board);
            
            // If solved, print the partially-filled board (the copy)
            if (solved) {
                System.out.println("Partially-filled Board:");
                printBoard(copyBoard);
            }
        }
    
        return board;
    }     
    
     /**
     * Creates a randomly generated board with a specified number of filled cells.
     * 
     * @param numFilledCells The number of cells to be filled initially.
     * @return The generated Sudoku board.
     */
    private static void printBoard(int[][] board) {
        for (int row = 0; row < GRID_SIZE; row++)
        {
            if( row % 3 == 0 && row != 0)
            {
                System.out.println("-----------");
            }
            for (int column = 0; column < GRID_SIZE; column++)
            {
                if( column % 3 == 0 && column != 0)
                {
                    System.out.print("|");
                }
                System.out.print(board[row][column]);
            }
            System.out.println();
        }
    }

    /**
     * Checks whether a given number is present in the same row.
     * 
     * @param board The Sudoku board.
     * @param chosenNumber The number to be checked.
     * @param row The row to be checked.
     * @return True if the number is present in the row, false otherwise.
     */
    private static boolean numberCheckerRow(int [][] board, int choosen_number, int row)
    {
        for (int i = 0; i < GRID_SIZE; i++) {
            if (board[row][i] == choosen_number)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks whether a given number is present in the same column.
     * 
     * @param board The Sudoku board.
     * @param chosenNumber The number to be checked.
     * @param column The column to be checked.
     * @return True if the number is present in the column, false otherwise.
     */
    private static boolean numberCheckerColumn(int [][] board, int choosen_number, int column)
    {
        for (int i = 0; i < GRID_SIZE; i++) {
            if (board[i][column] == choosen_number)
            {
                return true;
            }
        }
        return false;
    }

     /**
     * Checks whether a given number is present in the same 3x3 box.
     * 
     * @param board The Sudoku board.
     * @param chosenNumber The number to be checked.
     * @param row The row of the cell.
     * @param column The column of the cell.
     * @return True if the number is present in the box, false otherwise.
     */
    private static boolean numberCheckerBox(int [][] board, int choosen_number, int row, int column)
    {
        int boxrow = row - row % 3;
        int boxcolumn = column - column % 3;

        for (int i = boxrow; i < boxrow + 3; i++)
        {
            for(int j = boxcolumn; j  < boxcolumn + 3; j++)
            {
                if (board[i][j] == choosen_number)
                {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks whether a given number can be legally placed at a specific cell.
     * Does this by checking each classes check to ensure its correct.
     * 
     * @param board The Sudoku board.
     * @param chosenNumber The number to be placed.
     * @param row The row of the cell.
     * @param column The column of the cell.
     * @return True if the number can be placed at the cell, false otherwise.
     */
    private static boolean validLocation(int [][] board, int choosen_number, int row, int column)
    {
        return !numberCheckerRow(board, choosen_number, row) 
        && !numberCheckerColumn(board, choosen_number, column) 
        && !numberCheckerBox(board, choosen_number, row, column);
    }

    /**
     * Solves the Sudoku puzzle using a backtracking algorithm.
     * 
     * @param board The Sudoku board to be solved.
     * @return True if a solution is found, false otherwise.
     */
    private static boolean solveBoard(int [][] board)
    {
        for (int row = 0; row < GRID_SIZE; row++)
        {
            for (int column = 0; column < GRID_SIZE; column++)
            {
                // Check if the cell is empty (contains 0)
                if (board[row][column] == 0) {
                    // Try placing numbers 1 to GRID_SIZE in the empty cell
                    for (int number_attempt = 1; number_attempt <= GRID_SIZE; number_attempt++)
                    {
                        // Check if the current number can be placed in the cell
                        if (validLocation(board, number_attempt, row, column))
                        {
                            // Place the number in the cell
                            board [row] [column] = number_attempt;

                             // Recursively solve the board with the new number placement
                            if (solveBoard(board))
                            {
                                return true;
                            }
                            else
                            {
                                // If the current number placement leads to a dead end, backtrack
                                board[row][column] = 0;
                            }
                        }
                    }
                    // No valid number can be placed in this cell
                    return false;
                }
            }
        }
        // All cells are filled, puzzle solved
        return true;
    }
}
