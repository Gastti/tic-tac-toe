import React from "react";
import "./GamemodeSelect.css";
import Container from "./Container";

interface GamemodeProps {
  setGamemode: React.Dispatch<React.SetStateAction<string>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Gamemode {
  name: string;
  key: string;
  color?: string;
}

const gamemodeList: Array<Gamemode> = [
  {
    name: "Un Jugador",
    key: "player-vs-cpu",
    color: "gradient-pink",
  },
  {
    name: "Multijugador Local",
    key: "player-vs-player",
    color: "gradient-orange",
  },
  {
    name: "Multijugador Online",
    key: "online-player-vs-player",
    color: "gradient-green",
  },
];

export default function GamemodeSelect({
  setGamemode,
  setIsStarted,
}: GamemodeProps): React.ReactElement {
  const handleClick = (value: string) => {
    setGamemode(value);
    setIsStarted(true);
  };
  return (
    <Container>
      <div>
        <div className="menu">
          {gamemodeList.map((gamemode) => (
            <button
              className={`menu-option ${gamemode.color}`}
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
