import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { IPlayer, Marker } from "../../App";
import { useGame } from "../../hooks/useGame";
import { useNavigate, useParams } from "react-router-dom";
import PlayersListUI from "./PlayersListUI";
import Gameboard from "./Gameboard";
import Container from "../../components/Container";
import CopyButton from "../../components/CopyButton";
import Box from "../../components/Box";
import Title from "../../components/Title";
import Lobby from "../../utils/lobbyUtils";
import Player from "../../utils/playerUtils";
import StartButton from "../../components/StartButton";

const CLIENT_URL = `${window.location.protocol}//${window.location.host}`;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const socket: Socket = io(SERVER_URL, {
  withCredentials: true,
});

export default function LobbyView() {
  const navigate = useNavigate();
  const { players, setPlayers, gameboard, setGameboard, isStarted, setIsStarted, setStatus, isSFXEnabled } = useGame();
  const { slug } = useParams();
  const [lobbyId, setLobbyId] = useState<string>("");
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [myMarker, setMyMarker] = useState<Marker>("");
  const [winner, setWinner] = useState<IPlayer | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [turn, setTurn] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!slug) {
      Lobby.create(socket, parsedUser);
    } else {
      Lobby.join(socket, slug, parsedUser);
    }

    socket.on("lobbyCreated", (lobby: string | object) => {
      const data = Lobby.parse(lobby);
      const { players, id } = data;
      setPlayers(players);
      setLobbyId(id);
    });

    socket.on("lobbyJoined", (lobby: string | object) => {
      const data = Lobby.parse(lobby);
      const { players, id } = data;
      setPlayers(players);
      setLobbyId(id);
    });

    socket.on("matchStarted", (lobby: string | object) => {
      const data = Lobby.parse(lobby)
      const { gameboard, turn, players, status } = data;
      setGameboard(gameboard);
      setIsStarted(true);
      const me = players.find((player: IPlayer) => player.name === parsedUser.name);
      const indexMe = me ? players.indexOf(me) : null;
      setIsMyTurn(indexMe === turn);
      setMyMarker(me.marker);
      setTurn(players[turn]?.name || "");
      setStatus(status);
    })

    socket.on("matchRestarted", (lobby: string | object) => {
      const data = Lobby.parse(lobby)
      const { gameboard, draw, status } = data;
      setGameboard(gameboard);
      setWinner(null);
      setDraw(draw);
      setStatus(status);
    })

    socket.on("movement", (lobby: string | object) => {
      const data = Lobby.parse(lobby);
      const { gameboard, turn, players, status, winner, draw } = data;
      setGameboard(gameboard);
      const me = players.find((player: IPlayer) => player.name === parsedUser.name);
      const indexMe = me ? players.indexOf(me) : null;
      setIsMyTurn(indexMe === turn);

      setDraw(draw);

      if (status === 'finished') {
        setWinner(winner);
        setPlayers(players);
        setStatus(status);
      }

      const currentPlayer = players[turn]?.name || "";
      setTurn(currentPlayer);
    });

    socket.on("oponentMovement", (id) => {
      Player.listen(socket, id, isSFXEnabled);
    })

    socket.on("lobbyNotFound", () => {
      navigate('/lobbynotfound')
    });

    socket.on("playerList", (players) => {
      setPlayers(players);
    })

    socket.on("playerLeave", (lobby) => {
      const data = Lobby.parse(lobby);
      const { players, gameboard, draw, status } = data;
      setPlayers(players);
      setGameboard(gameboard);
      setWinner(null);
      setDraw(draw);
      setStatus(status);
      setIsStarted(false);
    })

    return () => {
      socket.off("lobbyCreated");
      socket.off("lobbyJoined");
      socket.off("opponentMove");
      socket.off("lobbyNotFound");
      socket.off("playerList");
    };
  }, []);

  return (
    <Container>
      <Title>{!isStarted ? "Sala de Espera" : "Jugando"}</Title>
      {(lobbyId && !isStarted && players.length < 2) && (
        <Box className="row j-between a-center margin-bottom">
          <span>¡Lobby creado! <b>#{lobbyId}</b></span>
          <CopyButton link={`${CLIENT_URL}/invite/${lobbyId}`}>Copiar Invitacion</CopyButton>
        </Box>
      )}
      {(players.length > 0) && <PlayersListUI players={players} turn={turn} />}
      {(!isStarted) && <StartButton socket={socket}>Iniciar Partida</StartButton>}
      {isStarted && (
        <Gameboard
          socket={socket}
          gameboard={gameboard}
          isMyTurn={isMyTurn}
          myMarker={myMarker}
          winner={winner}
          draw={draw}
          players={players}
        />
      )}
    </Container>
  );
}
