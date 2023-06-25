import React from "react";
import { useGame } from "../contexts/GameContext";
import logo from "../assets/images/logo.png";
import logosmall from "../assets/images/logosmall.png";

export default function Logo() {
  const game = useGame();
  return (
    <div>
      {!game.isStarted ? (
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="logosmall">
          <img src={logosmall} />
        </div>
      )}
    </div>
  );
}
