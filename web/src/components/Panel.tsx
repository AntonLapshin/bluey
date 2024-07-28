import { PropsWithChildren } from "react";

export const Panel = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#5379a791",
        borderRadius: 55,
        boxShadow: "rgb(25 10 63 / 55%) 45px 45px 150px 0px",
        padding: "2rem",
      }}
    >
      {children}
    </div>
  );
};
