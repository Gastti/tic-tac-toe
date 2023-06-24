import React from "react";
import "./Title.css";

interface TitleProps {
  children: string;
}

export default function Title({ children }: TitleProps): React.ReactElement {
  return <h2 className="section-title">{children}</h2>;
}
