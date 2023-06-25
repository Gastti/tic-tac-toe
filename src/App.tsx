import React, { Fragment, useState } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import Container from "./components/Container";
import GamemodeSelect from "./components/GamemodeSelect";
import MarkerSelect from "./components/MarkerSelect";
import logo from "./assets/images/logo.png";
import logosmall from "./assets/images/logosmall.png";
import avatar1 from "./assets/images/avatars/avatar-1.png";
import avatar2 from "./assets/images/avatars/avatar-2.png";

export type Marker = "X" | "O" | "";

export interface IPlayer {
  id: number;
  marker: Marker;
  name: string;
  avatar: typeof avatar1;
  score: number;
}

const initialGameboard = Array(9).fill("");

function App(): React.JSX.Element {
  const [gameboard, setGameboard] = useState<Marker[]>(initialGameboard);
  const [currentMarker, setCurrentMarker] = useState<Marker>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [gamemode, setGamemode] = useState<string>("");
  const [players, setPlayers] = useState<Array<IPlayer>>([
    { id: 1, marker: "", name: "Jugador 1", avatar: avatar1, score: 0 },
    { id: 2, marker: "", name: "Jugador 2", avatar: avatar2, score: 0 },
  ]);

  return (
    <div className="main-container">
      {!isStarted ? (
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="logosmall">
          <img src={logosmall} />
        </div>
      )}
      {gamemode === "" && (
        <GamemodeSelect setIsStarted={setIsStarted} setGamemode={setGamemode} />
      )}
      {gamemode !== "" && currentMarker === "" && (
        <MarkerSelect
          selectMarker={setCurrentMarker}
          setPlayers={setPlayers}
          players={players}
        />
      )}
      {gamemode === "player-vs-player" && currentMarker !== "" && (
        <Container>
          <Gameboard
            gameboard={gameboard}
            setGameboard={setGameboard}
            players={players}
            setPlayers={setPlayers}
            currentMarker={currentMarker}
            setCurrentMarker={setCurrentMarker}
            setFinished={setFinished}
            finished={finished}
          />
        </Container>
      )}
    </div>
  );
}

export default App;
