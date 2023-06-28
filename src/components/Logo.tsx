import "./Logo.css";
import logo from "../assets/images/logo.png";
import logosmall from "../assets/images/logosmall.png";

export default function Logo() {
  const path = window.location.pathname;
  return (
    <div>
      {path === "/" ? (
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
