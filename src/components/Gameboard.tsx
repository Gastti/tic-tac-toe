import React from "react";
import "./Gameboard.css";
import { Marker } from "../App";

interface GameboardProps {
  gameboard: Marker[];
  setGameboard: React.Dispatch<React.SetStateAction<Marker[]>>;
  currentMarker: Marker;
  setCurrentMarker: React.Dispatch<React.SetStateAction<Marker>>;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Gameboard({
  gameboard,
  setGameboard,
  currentMarker,
  setCurrentMarker,
  setFinished,
}: GameboardProps): React.ReactElement {
  const renderCell = (cell: string, index: number) => {
    return (
      <div
        key={index}
        onClick={() => handleCellClick(index)}
        className={cell === "" ? "empty" : cell}
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
        setFinished(true);
      }
    }

    return null;
  }

  return (
    <div className="gameboard">
      {gameboard.map((cell, index) => renderCell(cell, index))}
    </div>
  );
}
