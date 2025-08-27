import React from "react";
import "./button.css";

export function Button({ children, variant = "default", size = "default", className = "", ...props }) {
  const classList = ["btn", variant, size, className].filter(Boolean).join(" ");
  return (
    <button className={classList} {...props}>
      {children}
    </button>
  );
}
