import React from "react";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";
import { HashRouter, Routes, Route } from "react-router-dom";
import avatar1 from "./assets/images/avatars/avatar-1.png";
import Lobby from "./views/Lobby/Lobby";
import LobbyNotFound from "./views/Lobby/LobbyNotFound";
import Soundtrack from "./components/Soundtrack";
import Home from "./views/Home/Home";

export type Marker = "X" | "O" | "";
export type Status = "waiting" | "playing" | "finished";

export interface IPlayer {
  id: string;
  name: string;
  avatar: typeof avatar1;
  marker: Marker;
  score: number;
}

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <GameProvider>
        <div className="main-container">
          <Soundtrack />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<Home />} />
            <Route path="/invite/:slug" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/lobby/:slug/" element={<Lobby />} />
            <Route path="/lobbynotfound" element={<LobbyNotFound />} />
          </Routes>
        </div>
      </GameProvider>
    </HashRouter>
  );
}

export default App;
