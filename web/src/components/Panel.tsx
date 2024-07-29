import { styled } from "../stitches.config";

export const Panel = styled("div", {
  width: "100%",
  height: "100%",

  "@bp1": {
    padding: "2rem",
    borderRadius: 55,
    backgroundColor: "#5379a791",
    boxShadow: "rgb(25 10 63 / 55%) 45px 45px 150px 0px",
  },
});
