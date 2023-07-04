import React from "react";
import "./Container.css";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className
}: ContainerProps): React.ReactElement {
  return <div className={`container${className ? " " + className : ""}`}>{children}</div>;
}
