import React, { useState } from "react";
import { Marker, IPlayer } from "../App";
import avatar1 from "../assets/images/avatars/avatar-1.png";
import avatar2 from "../assets/images/avatars/avatar-2.png";
import { useNavigate } from "react-router-dom";

interface GameProviderProps {
  children: React.ReactNode;
}

interface GameState {
  gameboard: Marker[];
  currentMarker: Marker;
  isStarted: boolean;
  isFinished: boolean;
  gamemode: string;
  players: IPlayer[];
  setGameboard: React.Dispatch<React.SetStateAction<Marker[]>>;
  setCurrentMarker: React.Dispatch<React.SetStateAction<Marker>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setGamemode: React.Dispatch<React.SetStateAction<string>>;
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  restart: () => void;
}

const initialGameboard = Array(9).fill("");

const GameContext = React.createContext<GameState>({} as GameState);

function GameProvider({ children }: GameProviderProps) {
  const navigate = useNavigate();
  const [gameboard, setGameboard] = useState<Marker[]>(initialGameboard);
  const [currentMarker, setCurrentMarker] = useState<Marker>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [gamemode, setGamemode] = useState<string>("");
  const [players, setPlayers] = useState<Array<IPlayer>>([
    { id: 1, marker: "", name: "Jugador 1", avatar: avatar1, score: 0 },
    { id: 2, marker: "", name: "Jugador 2", avatar: avatar2, score: 0 },
  ]);

  const value = React.useMemo(
    () => ({
      gameboard,
      setGameboard,
      currentMarker,
      setCurrentMarker,
      isStarted,
      setIsStarted,
      isFinished,
      setIsFinished,
      gamemode,
      setGamemode,
      players,
      setPlayers,
      navigate,
      restart: () => {
        setGamemode("");
        setCurrentMarker("");
        setGameboard(initialGameboard);
        setIsStarted(false);
        setIsFinished(false);
        const updatedPlayers = [...players];
        updatedPlayers[0].marker = "";
        updatedPlayers[1].marker = "";
        updatedPlayers[0].score = 0;
        updatedPlayers[1].score = 0;
        setPlayers(updatedPlayers);
        navigate("/");
      },
    }),
    [
      gameboard,
      setGameboard,
      currentMarker,
      setCurrentMarker,
      isStarted,
      setIsStarted,
      isFinished,
      setIsFinished,
      gamemode,
      setGamemode,
      players,
      setPlayers,
      navigate,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const game = React.useContext(GameContext);
  return game;
}

export { GameProvider, useGame };
