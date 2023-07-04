import { Socket } from "socket.io-client";
import startSound from "../assets/sounds/start.wav";

const start = (socket: Socket, isSFXEnabled: boolean): void => {
  socket.emit("startMatch");
  if (isSFXEnabled) {
    const audio = new Audio(startSound);
    audio.play();
  }
};

const restart = (socket: Socket): void => {
  socket.emit("restartMatch");
};

const Match = { start, restart };

export default Match;
