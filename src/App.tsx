import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import Container from "./components/Container";
import GamemodeSelect from "./components/GamemodeSelect";
import MarkerSelect from "./components/MarkerSelect";

export type Marker = "X" | "O" | "";

// interface IPlayer {
//   id: number;
//   marker: Marker;
//   name: string;
//   color: string;
//   score: number;
// }

const initialGameboard = Array(9).fill("");

function App(): React.JSX.Element {
  const [gameboard, setGameboard] = useState<Marker[]>(initialGameboard);
  const [currentMarker, setCurrentMarker] = useState<Marker>("");
  const [finished, setFinished] = useState<boolean>(false);
  const [gamemode, setGamemode] = useState<string>("");

  // const players: Array<IPlayer> = [
  //   { id: 1, marker: "X", name: "Jugador 1", color: "#ff5111", score: 0 },
  //   { id: 2, marker: "O", name: "Jugador 2", color: "#0969e7", score: 0 },
  // ];

  return (
    <Fragment>
      <h1 className="title">Tic Tac Toe</h1>
      {gamemode === "" && <GamemodeSelect setGamemode={setGamemode} />}
      {gamemode !== "" && currentMarker === "" && (
        <MarkerSelect selectMarker={setCurrentMarker} />
      )}
      {gamemode === "player-vs-player" && currentMarker !== "" && (
        <Container>
          <Gameboard
            gameboard={gameboard}
            setGameboard={setGameboard}
            currentMarker={currentMarker}
            setCurrentMarker={setCurrentMarker}
            setFinished={setFinished}
          />
        </Container>
      )}
      {finished && (
        <div className="finished">
          <h1>Juego Terminado</h1>
        </div>
      )}
    </Fragment>
  );
}

export default App;
