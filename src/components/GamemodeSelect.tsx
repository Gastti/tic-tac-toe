import React from "react";
import "./GamemodeSelect.css";
import Container from "./Container";

interface GamemodeProps {
  setGamemode: React.Dispatch<React.SetStateAction<string>>;
}

interface Gamemode {
  name: string;
  key: string;
}

const gamemodeList: Array<Gamemode> = [
  { name: "Jugador vs Jugador", key: "player-vs-player" },
  { name: "Jugador vs CPU", key: "player-vs-cpu" },
];

export default function GamemodeSelect({
  setGamemode,
}: GamemodeProps): React.ReactElement {
  const handleClick = (value: string) => {
    setGamemode(value);
  };
  return (
    <Container>
      <div>
        <h2 className="menu-title">Menu Principal</h2>
        <div className="menu">
          {gamemodeList.map((gamemode) => (
            <button
              className="menu-option"
              key={gamemode.key}
              onClick={() => handleClick(gamemode.key)}
            >
              {gamemode.name}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
