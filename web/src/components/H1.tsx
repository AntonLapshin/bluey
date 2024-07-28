import { PropsWithChildren } from "react";

export const H1 = ({ children }: PropsWithChildren) => {
  return (
    <h1
      style={{
        color: "white",
        lineHeight: 1,
        textShadow: "5px 5px 9px #6a6a6a",
      }}
    >
      {children}
    </h1>
  );
};
