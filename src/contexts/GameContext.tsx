import React, { useState } from "react";
import { Marker, IPlayer } from "../App";
import avatar1 from "../assets/images/avatars/avatar-1.png";
import avatar2 from "../assets/images/avatars/avatar-2.png";
import { Navigate } from "react-router-dom";

interface GameProviderProps {
  children: React.ReactNode;
}

interface GameState {
  gameboard: Marker[];
  currentMarker: Marker;
  isStarted: boolean;
  finished: boolean;
  gamemode: string;
  players: IPlayer[];
  setGameboard: React.Dispatch<React.SetStateAction<Marker[]>>;
  setCurrentMarker: React.Dispatch<React.SetStateAction<Marker>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setGamemode: React.Dispatch<React.SetStateAction<string>>;
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}

const initialGameboard = Array(9).fill("");

const GameContext = React.createContext<GameState>({} as GameState);

function GameProvider({ children }: GameProviderProps) {
  const [gameboard, setGameboard] = useState<Marker[]>(initialGameboard);
  const [currentMarker, setCurrentMarker] = useState<Marker>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
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
      finished,
      setFinished,
      gamemode,
      setGamemode,
      players,
      setPlayers,
    }),
    [
      gameboard,
      setGameboard,
      currentMarker,
      setCurrentMarker,
      isStarted,
      setIsStarted,
      finished,
      setFinished,
      gamemode,
      setGamemode,
      players,
      setPlayers,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const game = React.useContext(GameContext);
  return game;
}

export { GameProvider, useGame };
