import MenuUI from "./MenuUI";
import { useGame } from "../../contexts/GameContext";
import { useNavigate } from "react-router-dom";

export interface Modes {
  name: string;
  key: string;
  color?: string;
  path: string;
}

const modes: Array<Modes> = [
  {
    name: "Un Jugador",
    key: "player-vs-cpu",
    color: "gradient-pink",
    path: "/offline"
  },
  {
    name: "Multijugador Local",
    key: "player-vs-player",
    color: "gradient-orange",
    path: "/offlineversus"
  },
  {
    name: "Multijugador Online",
    key: "online-player-vs-player",
    color: "gradient-green",
    path: "/lobby"
  },
];

export default function Menu() {
  const game = useGame();
  const navigate = useNavigate();
  const handleMode = (key: string, path: string): void => {
    game.setGamemode(key);
    navigate(path);

    if(key === "online-player-vs-player") {
      console.log('');
    }
  };
  return <MenuUI handleMode={handleMode} modes={modes} />;
}
