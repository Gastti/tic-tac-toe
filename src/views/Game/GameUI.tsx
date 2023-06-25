import React from "react";
import { IPlayer, Marker } from "../../App";
import PlayerCard from "../../components/PlayerCard";

interface GameUIProps {
  players: Array<IPlayer>;
  gameboard: Array<string>;
  currentMarker: Marker;
  finished: boolean;
  winner: IPlayer;
  renderCell: (cell: string, index: number) => React.ReactElement;
  restartGame: () => void;
}

export default function GameUI({
  players,
  gameboard,
  currentMarker,
  finished,
  winner,
  renderCell,
  restartGame,
}: GameUIProps) {
  return (
    <>
      <div className="players-box">
        {players.map((player) => (
          <PlayerCard
            key={player.name}
            player={player}
            currentMarker={currentMarker}
            finished={finished}
          />
        ))}
      </div>
      <div className="gameboard">
        {gameboard.map((cell, index) => renderCell(cell, index))}
        {finished && (
          <div className="finished">
            {winner && (
              <div>
                <div className="winner-image">
                  <img src={winner.avatar} />
                </div>
                <h2>
                  ¡<span className="winner-name">{winner.name}</span> ha ganado!
                </h2>
                <button
                  onClick={restartGame}
                  className="botondenaza gradient-green"
                >
                  Jugar otra vez
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
