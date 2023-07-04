import { Socket } from "socket.io-client";
import movementSound from "../assets/sounds/movement.wav";
import oponentMovementSound from "../assets/sounds/oponent-movement.wav";

const move = (
  socket: Socket,
  marker: string,
  index: number,
  isSFXEnabled: boolean
): void => {
  socket.emit("makeMovement", { marker, index });
  if (isSFXEnabled) {
    const audio = new Audio(movementSound);
    audio.play();
  }
};

const listen = (socket: Socket, id: string, isSFXEnabled: boolean): void => {
  if (isSFXEnabled && socket.id !== id) {
    const audio = new Audio(oponentMovementSound);
    audio.play();
  }
};

const Player = { move, listen };

export default Player;
