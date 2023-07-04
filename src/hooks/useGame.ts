import React from "react";
import { GameContext } from "../contexts/GameContext";

function useGame() {
    const game = React.useContext(GameContext);
    return game;
}

export { useGame };