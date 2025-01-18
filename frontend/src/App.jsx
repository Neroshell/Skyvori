import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import SlotMachine from "./components/SlotMachine";
import GameList from "./components/GameList";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/games" element={<GameList />} />
        <Route path="/slot-machine" element={<SlotMachine />} />
        
      </Routes>
    </Router>
  );
}

export default App;
