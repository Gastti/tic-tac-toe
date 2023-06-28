import React, { useState, useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import { IPlayer } from "../App";

export default function Navbar() {
  const game = useGame();
  const [user, setUser] = useState<IPlayer>();

  return <div>Navbar</div>;
}
