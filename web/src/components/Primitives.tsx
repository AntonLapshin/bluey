import { styled } from "../stitches.config";

export const Flex = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const Row = styled(Flex, {
  flexDirection: "row",
});

export const Col = styled(Flex, {
  flexDirection: "column",
});

export const H1 = styled("h1", {
  color: "white",
  lineHeight: 1,
  textShadow: "5px 5px 9px #6a6a6a",
  fontSize: "1.5rem",
});

export const Text = styled("span", {
  color: "$subtle",
  lineHeight: 1,
  variants: {
    small: {
      true: {
        fontSize: 12,
      },
    },
  },
});
