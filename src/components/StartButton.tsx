import { Socket } from "socket.io-client";
import { useGame } from "../hooks/useGame";
import Match from "../utils/matchUtils";

interface IStartButton {
    children: string;
    socket: Socket;
}

export default function StartButton({ socket, children }: IStartButton) {
    const { players, isSFXEnabled } = useGame();
    const handleOnClick = () => {
        console.log(players.length);
        if (players.length >= 2) Match.start(socket, isSFXEnabled);
    }

    return (
        <button
            className={`button gradient-pink ${players.length < 2 ? "disabled" : ""}`}
            onClick={handleOnClick}
        >
            {children}
        </button>
    )
}
