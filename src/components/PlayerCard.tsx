import React from "react";
import "./PlayerCard.css";
import { IPlayer } from "../App";

interface PlayerCardProps {
  player: IPlayer;
}

export default function PlayerCard({
  player
}: PlayerCardProps): React.ReactElement {
  return (
    <div className="player-card-container">
      <div
        className={`player-card`}
      >
        <div className="player-card-avatar">
          <img src={player.avatar} />
        </div>
        <h3 className="player-card-name">{player.name}</h3>
        <span className="player-card-score">
          Ganadas: <b>{player.score}</b>
        </span>
        <span className={`player-card-marker ${player.marker}`}>
          {player.marker}
        </span>
      </div>
    </div>
  );
}
