import MenuUI from "./MenuUI";
import { useGame } from "../../contexts/GameContext";
import { useNavigate } from "react-router-dom";

export interface Modes {
  name: string;
  key: string;
  color?: string;
}

const modes: Array<Modes> = [
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

export default function Menu() {
  const game = useGame();
  const navigate = useNavigate();
  const handleMode = (value: string) => {
    game.setGamemode(value);
    game.setIsStarted(true);
    navigate("/markerselection");
  };
  return <MenuUI handleMode={handleMode} modes={modes} />;
}
