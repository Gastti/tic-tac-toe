import React from "react";
import "./MarkerSelection.css";
import { Marker } from "../../App";
import MarkerSelectionUI from "./MarkerSelectionUI";
import { useGame } from "../../contexts/GameContext";
import { useNavigate } from "react-router-dom";

const markers: Array<Marker> = ["X", "O"];

export default function MarkerSelection() {
  const game = useGame();
  const navigate = useNavigate();

  if (game.gamemode === "") {
    navigate("/");
  }

  const handleMarker = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedMarker: Marker = e.currentTarget.value as Marker;
    game.setCurrentMarker(selectedMarker);
    game.setMarker(selectedMarker);

    if (game.gamemode === "online-player-vs-player") {
      navigate(`/lobby`);
    }
  };
  return <MarkerSelectionUI markers={markers} handleMarker={handleMarker} />;
}
