import React, { useState } from "react";
import "./Gameboard.css";
import { Marker, IPlayer } from "../App";
import PlayerCard from "./PlayerCard";

interface GameboardProps {
  gameboard: Marker[];
  setGameboard: React.Dispatch<React.SetStateAction<Marker[]>>;
  players: Array<IPlayer>;
  setPlayers: React.Dispatch<React.SetStateAction<Array<IPlayer>>>;
  currentMarker: Marker;
  setCurrentMarker: React.Dispatch<React.SetStateAction<Marker>>;
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Gameboard({
  gameboard,
  setGameboard,
  players,
  setPlayers,
  currentMarker,
  setCurrentMarker,
  finished,
  setFinished,
}: GameboardProps): React.ReactElement {
  const [winner, setWinner] = useState<IPlayer>();
  const renderCell = (cell: string, index: number) => {
    return (
      <div
        key={index}
        onClick={() => handleCellClick(index)}
        className={`cell ${cell === "" ? "empty" : cell}`}
      >
        <span>{gameboard[index]}</span>
      </div>
    );
  };

  const handleCellClick = (index: number) => {
    if (gameboard[index] === "") {
      const newGameboard: Marker[] = [...gameboard];
      newGameboard[index] = currentMarker;
      setGameboard(newGameboard);
      setCurrentMarker(currentMarker === "X" ? "O" : "X");
      checkWinner(newGameboard);
    }
  };

  const updateScores = (winner: string) => {
    const newPlayers: Array<IPlayer> = [...players];
    const findWinner = newPlayers.find((x) => x.marker === winner);

    if (findWinner) {
      findWinner.score++;
      const updatedPlayers: Array<IPlayer> = newPlayers.map((player) =>
        player.marker === winner ? findWinner : player
      );
      setWinner(findWinner);
      setPlayers(updatedPlayers);
    }

    console.log(findWinner);
  };

  function checkWinner(gameboard: Marker[]): Marker | null {
    const winningCombinations: number[][] = [
      [0, 1, 2], // Fila superior
      [3, 4, 5], // Fila del medio
      [6, 7, 8], // Fila inferior
      [0, 3, 6], // Columna izquierda
      [1, 4, 7], // Columna del medio
      [2, 5, 8], // Columna derecha
      [0, 4, 8], // Diagonal principal
      [2, 4, 6], // Diagonal secundaria
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c]
      ) {
        console.log(typeof gameboard[a]);
        updateScores(gameboard[a]);
        setFinished(true);
      }
    }

    return null;
  }

  const restartGame = () => {
    setFinished(false);
    const newGameboard = Array(9).fill("");
    setGameboard(newGameboard);
  };

  return (
    <>
    <button onClick={() => {
      setCurrentMarker("");
    }}>Volver</button>
      <div className="players-box">
        {players.map((player) => (
          <PlayerCard
            key={player.name}
            player={player}
            currentMarker={currentMarker}
            finished={finished}
          />
        ))}
      </div>
      <div className="gameboard">
        {gameboard.map((cell, index) => renderCell(cell, index))}
        {finished && (
          <div className="finished">
            {winner && (
              <div>
                <div className="winner-image">
                  <img src={winner.avatar} />
                </div>
                <h2>
                  ¡<span className="winner-name">{winner.name}</span> ha ganado!
                </h2>
                <button onClick={restartGame} className="botondenaza gradient-green">Jugar otra vez</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
