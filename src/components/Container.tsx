import React from "react";
import "./Container.css";

interface ContainerProps {
  children: React.ReactElement;
}

export default function Container({
  children,
}: ContainerProps): React.ReactElement {
  return <div className="container">{children}</div>;
}
