import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { Marker } from "../../App";

interface MarkerSelectionProps {
  markers: Array<Marker>;
  handleMarker: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MarkerSelectionUI({
  markers,
  handleMarker,
}: MarkerSelectionProps) {
  return (
    <Container>
      <div className="markerselect">
        <Title>Selecciona un Marcador</Title>
        <div className="markerselect-options">
          {markers.map((marker) => (
            <button
              className={`markerselect-option ${marker}`}
              value={marker}
              key={marker}
              onClick={handleMarker}
            >
              {marker}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
