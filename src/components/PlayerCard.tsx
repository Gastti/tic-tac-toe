import React from "react";
import "./PlayerCard.css";
import { IPlayer } from "../App";
import { useGame } from "../hooks/useGame";

interface PlayerCardProps {
  player: IPlayer;
  turn: string;
}

export default function PlayerCard({
  player,
  turn
}: PlayerCardProps): React.ReactElement {
  const { user, status } = useGame();
  return (
    <div className="player-card-container">
      <div
        className={`player-card${(player.name === turn && status === "playing") ? " active" : ""}`}
      >
        <div className="player-card-avatar">
          <img src={player.avatar} />
        </div>
        <div className="player-card-info">
          <h3 className="player-card-name">{player.name}</h3>
          <span className="player-card-score">
            Ganadas: <b>{player.score}</b>
          </span>
          <span className={`player-card-marker ${player.marker}-marker`}>
            {player.marker}
          </span>
        </div>
        <span style={{ opacity: `${(player.name === turn && status === "playing") ? "1" : "0"}` }}>
          ¡{player.name === user.name ? "Tu" : "Su"} Turno!
        </span>
      </div>
    </div>
  );
}
