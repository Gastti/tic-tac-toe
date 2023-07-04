import React, { useEffect, useState, useCallback } from "react";
import { Marker, IPlayer, Status } from "../App";
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
  status: Status;
  isSFXEnabled: boolean;
  setMarker: React.Dispatch<React.SetStateAction<Marker>>;
  setGameboard: React.Dispatch<React.SetStateAction<Marker[]>>;
  setCurrentMarker: React.Dispatch<React.SetStateAction<Marker>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setGamemode: React.Dispatch<React.SetStateAction<string>>;
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setIsSFXEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  userManagement: (name: string, avatar: string) => void;
  getUserFromLocalStorage: () => IPlayer | null;
}

const GameContext = React.createContext<GameState>({} as GameState);

function GameProvider({ children }: GameProviderProps) {
  const navigate = useNavigate();

  // Data
  const [user, setUser] = useState<IPlayer>({} as IPlayer);
  const [marker, setMarker] = useState<Marker>("" as Marker);
  const [gameboard, setGameboard] = useState<Marker[]>([]);
  const [currentMarker, setCurrentMarker] = useState<Marker>("");
  const [gamemode, setGamemode] = useState<string>("");
  const [players, setPlayers] = useState<Array<IPlayer>>([]);

  // Config
  const [isSFXEnabled, setIsSFXEnabled] = useState<boolean>(true);

  // Status
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("waiting");

  const getUserFromLocalStorage = useCallback((): IPlayer | null => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }, []);

  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (!user) {
      navigate("/")
    }

    if (user) {
      setUser(user);
    }
  }, [getUserFromLocalStorage, navigate]);

  const userManagement = useCallback(
    (name: string, avatar: string) => {
      const user = getUserFromLocalStorage();
      if (user) {
        user.name = name;
        user.avatar = avatar;
        const stringifiedUser = JSON.stringify(user);
        localStorage.setItem("user", stringifiedUser);
      } else {
        const id = crypto.randomUUID();
        const newUser = { id, name, avatar };
        const stringifiedUser = JSON.stringify(newUser);
        localStorage.setItem("user", stringifiedUser);
      }
    },
    [getUserFromLocalStorage],
  )


  const value = React.useMemo(
    () => ({
      user,
      marker,
      gameboard,
      currentMarker,
      isStarted,
      isFinished,
      gamemode,
      players,
      status,
      isSFXEnabled,
      setMarker,
      setGameboard,
      setCurrentMarker,
      setIsStarted,
      setIsFinished,
      setGamemode,
      setPlayers,
      setStatus,
      setIsSFXEnabled,
      getUserFromLocalStorage,
      userManagement,
      navigate,
    }),
    [
      user,
      marker,
      gameboard,
      currentMarker,
      isStarted,
      isFinished,
      gamemode,
      players,
      status,
      isSFXEnabled,
      setMarker,
      setGameboard,
      setCurrentMarker,
      setIsStarted,
      setIsFinished,
      setGamemode,
      setPlayers,
      setStatus,
      setIsSFXEnabled,
      getUserFromLocalStorage,
      userManagement,
      navigate,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export { GameProvider, GameContext };
