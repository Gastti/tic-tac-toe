import React, { useEffect } from "react";
import "./Game.css";
import { Marker } from "../../App";
import { useGame } from "../../contexts/GameContext";
import { Navigate } from "react-router-dom";
import GameUI from "./GameUI";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Game(): React.ReactElement {
  const game = useGame();

  useEffect(() => {

    if (game.gamemode === "online-player-vs-player") {
      console.log("Online Mode");
    }

    return () => {
      socket.off();
    };
  }, []);

  if (game.currentMarker === "") return <Navigate to="/markerselection" />;

  const renderCell = (cell: string, index: number) => {
    return (
      <div
        key={index}
        onClick={() => handleCellClick(index)}
        className={`cell ${cell === "" ? "empty" : cell}`}
      >
        <span>{game.gameboard[index]}</span>
      </div>
    );
  };

  const handleCellClick = (index: number) => {
    if (game.gameboard[index] === "") {
      const newGameboard: Marker[] = [...game.gameboard];
      newGameboard[index] = game.currentMarker;
      game.setGameboard(newGameboard);
      game.setCurrentMarker(game.currentMarker === "X" ? "O" : "X");
      checkWinner(newGameboard);
    }
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
        game.setIsFinished(true);
      }
    }

    return null;
  }

  return (
    // <GameUI
    //   players={game.players}
    //   gameboard={game.gameboard}
    //   currentMarker={game.currentMarker}
    //   finished={game.isFinished}
    //   renderCell={renderCell}
    // />
    <div>SALA DE PARTIDA</div>
  );
}
