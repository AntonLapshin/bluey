import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./Button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "success" | "error" | "";
}

export const Button = ({
  children,
  variant = "",
  onClick,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      style={{
        width: "100%",
        borderRadius: 32,
        boxShadow: "rgb(120 120 120 / 31%) 4px 4px 4px",
        color: "black",
        padding: "0.75rem 1rem",
        border: "none",
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
};
