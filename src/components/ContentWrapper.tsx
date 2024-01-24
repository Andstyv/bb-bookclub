import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ContentWrapper = ({ children }: Props) => {
  return <div className="m-auto flex min-h-[100vh] flex-col max-w-2xl items-center px-4">{children}</div>;
};
