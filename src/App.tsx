import React from "react";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "./components/Logo";
import avatar1 from "./assets/images/avatars/avatar-1.png";
import Menu from "./views/Menu/Menu";
import MarkerSelection from "./views/MarkerSelection/MarkerSelection";
import Game from "./views/Game/Game";
import Navbar from "./components/Navbar";
import Lobby from "./views/Lobby/Lobby";

export type Marker = "X" | "O" | "";

export interface IPlayer {
  id: string;
  name: string;
  avatar: typeof avatar1;
  marker: Marker;
  score: number;
}

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <GameProvider>
        <div className="main-container">
          <Navbar />
          <Logo />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/markerselection" element={<MarkerSelection />} />
            <Route path="/game" element={<Game />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/lobby/:slug/" element={<Lobby />} />
          </Routes>
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
