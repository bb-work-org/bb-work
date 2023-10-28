import { FC, PropsWithChildren } from "react";

export const SelectionArea: FC<PropsWithChildren> = ({ children }) => {
  return <div className="selection-area">{children}</div>;
};
