import "./Gameboard.css";
import { IPlayer, Marker } from "../../App";

interface IGameboard {
    gameboard: Array<Marker>
    handleMovement: (cell: string, index: number) => void;
    isMyTurn: boolean;
    myMarker: Marker;
    winner: IPlayer | null;
    restartMatch: () => void;
    draw: boolean;
    players: Array<IPlayer>;
}

export default function Gameboard({
    gameboard,
    handleMovement,
    isMyTurn, myMarker,
    winner,
    restartMatch,
    draw,
    players
}: IGameboard) {
    const renderCell = (cell: string, index: number) => {
        return (
            <div
                key={index}
                className={`cell ${cell === "" ? "empty" : cell} ${!isMyTurn ? "disabled" : ""}`}
                onClick={isMyTurn ? () => handleMovement(myMarker, index) : () => console.log('No es tu turno.')}
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
                        onClick={restartMatch}
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
                        onClick={restartMatch}
                    >
                        Volver a jugar
                    </button>
                </div>
            )}
        </div>
    )
}
