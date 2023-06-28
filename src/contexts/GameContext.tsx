import React, { useEffect, useState } from "react";
import { Marker, IPlayer } from "../App";
import { useNavigate } from "react-router-dom";

interface GameProviderProps {
  children: React.ReactNode;
}

interface GameState {
  user: IPlayer;
  marker: Marker;
  gameboard: Marker[];
  currentMarker: Marker;
  isStarted: boolean;
  isFinished: boolean;
  gamemode: string;
  players: IPlayer[];
  setMarker: React.Dispatch<React.SetStateAction<Marker>>;
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
  const [user, setUser] = useState<IPlayer>({} as IPlayer);
  const [marker, setMarker] = useState<Marker>("" as Marker);
  const [gameboard, setGameboard] = useState<Marker[]>([]);
  const [currentMarker, setCurrentMarker] = useState<Marker>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [gamemode, setGamemode] = useState<string>("");
  const [players, setPlayers] = useState<Array<IPlayer>>([]);

  useEffect(() => {
    const findUser = localStorage.getItem("user");

    if (!findUser) {
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      const id = crypto.randomUUID();
      const newUser = {
        id: id,
        name: "Invitado",
        avatar: `/src/assets/images/avatars/avatar-${randomNumber}.png`,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }

    const parsedUser = findUser ? JSON.parse(findUser) : null;
    if (parsedUser) {
      setUser(parsedUser);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      marker,
      setMarker,
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
        navigate("/");
      },
    }),
    [
      user,
      marker,
      setMarker,
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
