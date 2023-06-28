import React from "react";
import { IPlayer, Marker } from "../../App";
import PlayerCard from "../../components/PlayerCard";

interface GameUIProps {
  players: Array<IPlayer>;
  gameboard: Array<string>;
  currentMarker: Marker;
  finished: boolean;
  renderCell: (cell: string, index: number) => React.ReactElement;
}

export default function GameUI({
  players,
  gameboard,
  currentMarker,
  finished,
  renderCell,
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
      </div>
    </>
  );
}
