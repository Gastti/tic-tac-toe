import React from "react";
import "./PlayerCard.css";
import { IPlayer, Marker } from "../App";

interface PlayerCardProps {
  player: IPlayer;
  currentMarker: Marker;
  finished: boolean;
}

export default function PlayerCard({
  player,
  currentMarker,
  finished
}: PlayerCardProps): React.ReactElement {
  return (
    <div className="player-card-container">
      <div
        className={`player-card ${
          (currentMarker === player.marker && !finished) ? "active" : ""
        }`}
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
      {currentMarker === player.marker && <span style={{opacity: `${finished ? "0" : "1"}`}}>¡Tu Turno!</span>}
    </div>
  );
}
