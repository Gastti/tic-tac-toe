import "./Logo.css";
import logosmall from "../assets/images/logosmall.png";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }
  return (
    <div className="logosmall" onClick={handleClick}>
      <img src={logosmall} />
    </div>
  );
}
