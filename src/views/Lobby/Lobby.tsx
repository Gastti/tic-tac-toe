import { useState, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { IPlayer, Marker } from "../../App";
import PlayersListUI from "./PlayersListUI";
import Gameboard from "./Gameboard";

const socket = io("http://localhost:4000");

export default function Lobby() {
  const { players, setPlayers, gameboard, setGameboard, isStarted, setIsStarted } = useGame();
  const { slug } = useParams();
  const [lobbyId, setLobbyId] = useState<string>("");
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [myMarker, setMyMarker] = useState<Marker>("");
  const [winner, setWinner] = useState<IPlayer | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

  const createLobby = (player: IPlayer): void => {
    socket.emit("createLobby", player);
  };

  const joinLobby = (lobbyId: string, player: IPlayer): void => {
    socket.emit("joinLobby", { lobbyId, player });
  };

  const parseLobby = (lobby: string | object) => {
    const parsedLobby = lobby && typeof lobby !== "object" ? JSON.parse(lobby) : null;
    return parsedLobby ? parsedLobby : lobby
  }

  const handleMovement = (marker: string, index: number): void => {
    socket.emit("makeMovement", { marker, index });
  };

  const startMatch = () => {
    socket.emit("startMatch");
  }

  const restartMatch = () => {
    socket.emit("restartMatch");
    console.log("clicked");
  }

  useEffect(() => {
    const newUser = localStorage.getItem("user");
    const parsedUser = newUser ? JSON.parse(newUser) : null;
    if (!slug) {
      createLobby(parsedUser);
    } else {
      joinLobby(slug, parsedUser);
    }

    socket.on("lobbyCreated", (lobby: string | object) => {
      const data = parseLobby(lobby);
      const { players, id } = data;
      setPlayers(players);
      setLobbyId(id);
    });

    socket.on("lobbyJoined", (lobby: string | object) => {
      const data = parseLobby(lobby);
      const { players, id } = data;
      setPlayers(players);
      setLobbyId(id);
    });

    socket.on("matchStarted", (lobby: string | object) => {
      const data = parseLobby(lobby)
      const { gameboard, turn, players } = data;
      setGameboard(gameboard);
      setIsStarted(true);
      const me = players.find((player: IPlayer) => player.name === parsedUser.name);
      const indexMe = me ? players.indexOf(me) : null;
      setIsMyTurn(indexMe === turn);
      setMyMarker(me.marker);
    })

    socket.on("matchRestarted", (lobby: string | object) => {
      const data = parseLobby(lobby)
      const { gameboard } = data;
      setGameboard(gameboard);
      setWinner(null);
    })

    socket.on("opponentMove", (lobby: string | object) => {
      const data = parseLobby(lobby);
      const { gameboard, turn, players, status, winner, draw } = data;
      setGameboard(gameboard);
      const me = players.find((player: IPlayer) => player.name === parsedUser.name);
      const indexMe = me ? players.indexOf(me) : null;
      setIsMyTurn(indexMe === turn);
      setDraw(draw);

      if (status === 'finished') {
        setWinner(winner);
        setPlayers(players);
      }
    });

    socket.on("lobbyNotFound", () => {
      setLobbyId("");
      console.log("El lobby no existe");
    });

    return () => {
      socket.off("lobbyCreated");
      socket.off("lobbyJoined");
      socket.off("opponentMove");
      socket.off("lobbyNotFound");
    };
  }, []);

  return (
    <div>
      {(lobbyId && !isStarted) && <p>¡Lobby creado/unido! Identificador del lobby: {lobbyId}</p>}
      {(players.length > 0) && <PlayersListUI players={players} />}
      {(!slug && !isStarted) && (
        <button
          className={`button gradient-pink ${players.length < 2 ? "disabled" : ""}`}
          onClick={startMatch}
        >
          Iniciar Partida
        </button>
      )}
      {isStarted && (
        <Gameboard
          gameboard={gameboard}
          handleMovement={handleMovement}
          isMyTurn={isMyTurn}
          myMarker={myMarker}
          winner={winner}
          restartMatch={restartMatch}
          draw={draw}
          players={players}
        />
      )}
    </div>
  );
}
