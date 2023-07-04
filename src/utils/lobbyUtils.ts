import { Socket } from "socket.io-client";
import { IPlayer } from "../App";

const create = (socket: Socket, player: IPlayer): void => {
  socket.emit("createLobby", player);
};

const join = (socket: Socket, lobbyId: string, player: IPlayer): void => {
  socket.emit("joinLobby", { lobbyId, player });
};

const parse = (lobby: string | object) => {
  const parsedLobby = lobby && typeof lobby !== "object" ? JSON.parse(lobby) : null;
  return parsedLobby ? parsedLobby : lobby;
};

const Lobby = {
  create,
  join,
  parse
};

export default Lobby;
