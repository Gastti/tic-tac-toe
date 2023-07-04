import "./Gameboard.css";
import { IPlayer, Marker } from "../../App";
import { useGame } from "../../hooks/useGame";
import { Socket } from "socket.io-client";
import Match from "../../utils/matchUtils";
import Player from "../../utils/playerUtils";

interface IGameboard {
    socket: Socket;
    gameboard: Array<Marker>
    isMyTurn: boolean;
    myMarker: Marker;
    winner: IPlayer | null;
    draw: boolean;
    players: Array<IPlayer>;
}

export default function Gameboard({
    socket,
    gameboard,
    isMyTurn,
    myMarker,
    winner,
    draw,
    players,
}: IGameboard) {
    const { isSFXEnabled } = useGame();

    const renderCell = (cell: string, index: number) => {
        return (
            <div
                key={index}
                className={`cell ${cell === "" ? "empty" : cell} ${!isMyTurn ? "disabled" : ""}`}
                onClick={
                    (isMyTurn && cell.length === 0)
                        ? () => Player.move(socket, myMarker, index, isSFXEnabled)
                        : undefined
                }
            >
                <span>{gameboard[index]}</span>
            </div>
        );
    };

    return (
        <div className="gameboard">
            {gameboard.map((cell, index) => renderCell(cell, index))}
            {winner && (
                <div className="finished">
                    <h2>¡<span className="winner-name">{winner.name}</span> ha ganado!</h2>
                    <div className="winner-image"><img src={winner.avatar} /></div>
                    <button
                        className="button gradient-pink"
                        onClick={() => Match.restart(socket)}
                    >
                        Volver a jugar
                    </button>
                </div>
            )}
            {draw && (
                <div className="finished">
                    <h2>¡Ha ocurrido un <span className="winner-name">empate</span>!</h2>
                    <div className="draw-players-list">
                        {players.map((player) => (
                            <div className="winner-image" key={player.avatar}><img src={player.avatar} /></div>
                        ))}
                    </div>
                    <button
                        className="button gradient-pink"
                        onClick={() => Match.restart(socket)}
                    >
                        Volver a jugar
                    </button>
                </div>
            )}
        </div>
    )
}
