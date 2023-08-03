import java.util.Arrays;
import java.util.Random;

public class SodokuSolver {

    private static final int GRID_SIZE = 9;
    private static final int EASYMODE = 38;
    private static final int MEDIUMMODE = 27;
    private static final int HARDMODE = 23;



    public static void main(String[] args) throws Exception {
        int[][] exampleSudokuBoard = createBoard(HARDMODE);

        if (solveBoard(exampleSudokuBoard)) {
            System.out.println();
            System.out.println("Solved Board!");
        } else {
            System.out.println();
            System.out.println("Unsolvable Board!");
        }
        printBoard(exampleSudokuBoard);
    }

    private static int[][] createBoard(int numFilledCells) {
        int[][] board = null; // Initialize with null outside the loop
        boolean solved = false;
        Random random = new Random();
    
        while (!solved) {
            board = new int[GRID_SIZE][GRID_SIZE]; // Initialize with a new board on each iteration
    
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

    private static boolean validLocation(int [][] board, int choosen_number, int row, int column)
    {
        return !numberCheckerRow(board, choosen_number, row) 
        && !numberCheckerColumn(board, choosen_number, column) 
        && !numberCheckerBox(board, choosen_number, row, column);
    }

    private static boolean solveBoard(int [][] board)
    {
        for (int row = 0; row < GRID_SIZE; row++)
        {
            for (int column = 0; column < GRID_SIZE; column++)
            {
                /* If the space is blank (0) */
                if (board[row][column] == 0) {
                    for (int number_attempt = 1; number_attempt <= GRID_SIZE; number_attempt++)
                    {
                        if (validLocation(board, number_attempt, row, column))
                        {
                            board [row] [column] = number_attempt;

                            if (solveBoard(board))
                            {
                                return true;
                            }
                            else
                            {
                                board[row][column] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}
