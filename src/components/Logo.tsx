import "./Logo.css";
import { useGame } from "../contexts/GameContext";
import logo from "../assets/images/logo.png";
import logosmall from "../assets/images/logosmall.png";

export default function Logo() {
  const game = useGame();
  return (
    <div>
      {!game.isStarted ? (
        <div className="logo" onClick={game.restart}>
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="logosmall" onClick={game.restart}>
          <img src={logosmall} />
        </div>
      )}
    </div>
  );
}
