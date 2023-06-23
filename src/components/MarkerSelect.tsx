import React from "react";
import "./MarkerSelect.css";
import Container from "./Container";
import { Marker } from "../App";

interface MarkerSelectProps {
  selectMarker: React.Dispatch<React.SetStateAction<Marker>>;
}

const markerList: Array<Marker> = ["X", "O"];

export default function MarkerSelect({ selectMarker }: MarkerSelectProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedMarker: Marker = e.currentTarget.value as Marker;
    selectMarker(selectedMarker);
  };
  return (
    <Container>
      <div className="markerselect">
        <h2 className="markerselect-title">Selecciona un Marcador</h2>
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
