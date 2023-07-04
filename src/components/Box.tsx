import React from "react";
import "./Box.css";

interface IBoxProps {
    children: React.ReactNode;
    className?: string;
}

export default function Box({ children, className }: IBoxProps) {
    return (
        <div className={`box-container${className ? " " + className : ""}`}>
            {children}
        </div>
    )
}
