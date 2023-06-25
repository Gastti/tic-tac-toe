import React from "react";
import "./MarkerSelection.css";
import { Marker, IPlayer } from "../../App";
import MarkerSelectionUI from "./MarkerSelectionUI";
import { useGame } from "../../contexts/GameContext";
import { useNavigate } from "react-router-dom";

const markers: Array<Marker> = ["X", "O"];

export default function MarkerSelection() {
  const game = useGame();
  const navigate = useNavigate();
  const handleMarker = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x: Marker = "X";
    const o: Marker = "O";

    const selectedMarker: Marker = e.currentTarget.value as Marker;
    game.setCurrentMarker(selectedMarker);

    const updatedPlayers: Array<IPlayer> = [...game.players];
    updatedPlayers[0] = {
      ...updatedPlayers[0],
      marker: selectedMarker,
    };
    updatedPlayers[1] = {
      ...updatedPlayers[1],
      marker: selectedMarker === x ? o : x,
    };
    game.setPlayers(updatedPlayers);
    navigate("/game");
  };
  return <MarkerSelectionUI markers={markers} handleMarker={handleMarker} />;
}
