import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Easy, Medium, Hard, Home } from './components';
import './App.css';


/*
  Setting Up Routing Between Each Difficulty Modes:

  Home - This is our home page where we will pick out the difficulty. (Will Start Here)
  Easy - Easy Mode for Sudoku. (/easy)
  Medium -  Medium Mode for Sudoku. (/medium)
  Hard - Hard Mode for Sudoku. (/hard)
*/

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/easy" element={<Easy />} />
          <Route path="/medium" element={<Medium />} />
          <Route path="/hard" element={<Hard />} />
        </Routes>
    </Router>
  );
}

export default App;
