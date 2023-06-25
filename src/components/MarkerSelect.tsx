import React from "react";
import "./MarkerSelect.css";
import Container from "./Container";
import { Marker, IPlayer } from "../App";
import Title from "./Title";

interface MarkerSelectProps {
  selectMarker: React.Dispatch<React.SetStateAction<Marker>>;
  players: Array<IPlayer>;
  setPlayers: React.Dispatch<React.SetStateAction<Array<IPlayer>>>;
}

const markerList: Array<Marker> = ["X", "O"];

export default function MarkerSelect({
  selectMarker,
  players,
  setPlayers,
}: MarkerSelectProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x: Marker = "X";
    const o: Marker = "O";

    const selectedMarker: Marker = e.currentTarget.value as Marker;
    selectMarker(selectedMarker);

    const updatedPlayers: Array<IPlayer> = [...players];
    updatedPlayers[0] = {
      ...updatedPlayers[0],
      marker: selectedMarker,
    };
    updatedPlayers[1] = {
      ...updatedPlayers[1],
      marker: selectedMarker === x ? o : x,
    };
    setPlayers(updatedPlayers);
    console.log(players);
  };
  return (
    <Container>
      <div className="markerselect">
        <Title>Selecciona un Marcador</Title>
        <div className="markerselect-options">
          {markerList.map((marker) => (
            <button
              className={`markerselect-option ${marker}`}
              value={marker}
              key={marker}
              onClick={handleClick}
            >
              {marker}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
