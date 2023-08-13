# Sudoku Puzzle Game - Generator and Solver

Welcome to my Sudoku Puzzle Game! This recreation of the famous game offers a simple and easy-to-learn experience for players of all levels.

### IMAGE HERE

For those new to Sudoku or seeking a refresher, our comprehensive guide, [Sudoku Rules for Complete Beginners](https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/#:~:text=Sudoku%20is%20played%20on%20a%20grid,the%20row%2C%20column%20or%20square.), provides a step-by-step tutorial on the game's rules and mechanics.

## Project Highlights

This Sudoku Puzzle Game showcases the convergence of my expertise in algorithmic thinking, backend development using Express, frontend UI design employing React, and seamless component collaboration. It represents the harmonious fusion of these skills, resulting in an immersive and interactive application.

### Algorithmic Expertise

Demonstrating my proficiency in employing sophisticated algorithms to tackle intricate challenges, the backend's solveBoard function in the backend stands as a testament to my problem-solving ability. Utilizing a backtracking algorithm for puzzle generation guarantees the presence of unique solutions, underscoring my mastery of efficient algorithmic techniques.

### Seamless Frontend-Backend Integration

The integration of the Express backend with the React frontend showcases my proficiency in connecting these distinct layers of an application. The asynchronous data fetching of the API ensures smooth communication between frontend and backend. This integration exemplifies my ability to create data-driven, dynamic applications.

### React Component Modularity

The frontend's `Board` and `Menu` components exemplify my skill in breaking down complex user interfaces into manageable components. Each component serves a specific purpose, enhancing maintainability and reusability. This highlights my capacity to architect user interfaces that are both comprehensible and extensible.

### Interactive Component Design

The interactive nature of the application underscores my expertise in creating components that collaborate seamlessly. The `Board` component interacts harmoniously with the `Menu` component, providing real-time updates on the timer, pause functionality, and game-winning conditions. This collaboration showcases my proficiency in constructing interactive and dynamic user experiences.

### Functional Components within the Board and Game

The `Board` component's handling of cell selection, number input, and puzzle validation illustrates my ability to create functional and effective components within a larger system. The application's capability to recognize a solved puzzle and offer visual feedback emphasizes my attention to detail and proficiency in crafting fully operational components.

## Getting Started: How to Play

Welcome to the tutorial on how to play this game. To get started with running the game, refer to the [Running the Application: Step-by-Step Guide](#running-the-application-step-by-step-guide)  section for instructions.

Once you've launched the game, you'll be presented with a difficulty screen where you can select the mode you'd like to play. When clicked it will generate a random board based off your difficulty.

### IMAGE HERE

As you begin, you'll have several options available:

- A timer to keep track of your progress which can also be paused.
- A back button that allows you to return to the difficulty selection screen.
- A solve button, available at any point during gameplay, which not only solves the puzzle but also highlights any overlooked elements.
- The game board where the action takes place.
- A bottom bar that provides easy access to each individual digit, as well as the difficulty settings.

### IMAGE HERE

Now comes the exciting part – putting your skills to the test. Engage with the puzzle until you successfully complete the Sudoku challenge. Your reward? A resounding victory message and a detailed breakdown of your completion time.

### IMAGE HERE

## Running the Application: Step-by-Step Guide

### 1. Clone the Repository

1. **Install Node.js (If Needed)**: Before you start, make sure you have Node.js installed on your computer. If you don't, you can download and install it from [Node.js official website](https://nodejs.org/). Node.js includes `npm` (Node Package Manager), which is essential for running the application.

2. **Open Terminal**: On your computer, find the application called "Terminal" or "Command Prompt." It's a place where you can type commands.

3. **Navigate to Folder**: Type the following command to move to the folder where you want to put the application. Press Enter after typing each line.

        cd path/to/your/desired/folder

4. **Clone the Repository**: Copy and paste this command into the terminal and press Enter. This will download the application to your computer.

        git clone https://github.com/alexsg2/Sodoku.git

### 2. Set Up and Run the Application

#### Backend

1. **Open Terminal**: If you closed the terminal, open it again as you did before.

2. **Navigate to Backend Folder**: Type the following command and press Enter.

        cd path/to/repository/backend

3. **Install Dependencies**: Copy and paste this command and press Enter. It will help set up the backend part of the application.

        npm install

    (Note: The `npm install` command requires Node.js to be installed. If you haven't installed Node.js yet, please follow the instructions provided earlier to install it.)

4. **Start Backend**: Copy and paste this command and press Enter. This will make the backend part work.

        npm run dev

    Leave this terminal open; the backend will be working in the background.

#### Frontend

1. **Open New Terminal**: If you closed the terminal, open a new one.

2. **Navigate to Frontend Folder**: Type the following command and press Enter.

        cd path/to/repository/frontend

3. **Install Dependencies**: Copy and paste this command and press Enter. It will help set up the frontend part of the application.

        npm install

    (Note: The `npm install` command requires Node.js to be installed. If you haven't installed Node.js yet, please follow the instructions provided earlier to install it.)

4. **Start Frontend**: Copy and paste this command and press Enter. This will show the application in your web browser.

        npm start

    (Note: This command should begin the program. If not, continue to the next steps.)

### 3. Use the Application

1. **Open Web Browser**: Open your web browser (like Chrome or Firefox).

2. **Access Application**: In the address bar at the top, type `http://localhost:3000` and press Enter. This will show the application.

3. **Explore**: You can now use and explore the application using the buttons and links.

Remember:

- Always keep the terminal windows open where you started the backend and frontend.
- If you close these terminal windows, the application won't work until you start them again using the instructions above.

Congratulations! You've successfully set up and run the application. If you need help, don't hesitate to ask someone familiar with coding or follow these steps again.

## Features and Upcoming Additions

Explore the array of current features and exciting additions that await in this evolving application.

### Existing Features

- [x] Difficulty Modes
- [x] Functional Board and Menu
- [x] Unique Board Generation
- [x] Pause Functionality
- [x] Solve Button Functionality 
- [x] Another Game Option

### Upcoming Additions

- [ ] Pause Screen
- [ ] Refresh Board Option
