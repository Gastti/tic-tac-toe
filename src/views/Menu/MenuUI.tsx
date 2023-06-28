import React from "react";
import "./Menu.css";
import Container from "../../components/Container";
import { Modes } from "./Menu";

interface MenuUIProps {
  modes: Array<Modes>;
  handleMode: (key: string, path: string) => void;
}

export default function MenuUI({
  modes,
  handleMode,
}: MenuUIProps): React.ReactElement {
  return (
    <Container>
      <div>
        <div className="menu">
          {modes.map((mode) => (
            <button
              className={`menu-option ${mode.color}`}
              key={mode.key}
              onClick={() => handleMode(mode.key, mode.path)}
            >
              {mode.name}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
