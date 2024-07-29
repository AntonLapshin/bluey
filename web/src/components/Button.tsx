import { styled } from "../stitches.config";

export const Button = styled("button", {
  width: "100%",
  borderRadius: 32,
  boxShadow: "rgb(120 120 120 / 31%) 4px 4px 4px",
  color: "black",
  padding: "0.5rem 1rem 0.45rem 1rem",
  border: "none",
  fontWeight: 600,
  transition: "background 200ms ease",
  fontSize: 14,
  lineHeight: 1,
  "&:hover": {
    backgroundColor: "#b2ecff",
  },
  variants: {
    color: {
      default: {
        backgroundColor: "white",
      },
      success: {
        backgroundColor: "#a8ffac !important",
      },
      error: {
        backgroundColor: "#ffb641d4 !important",
      },
    },
  },
});
