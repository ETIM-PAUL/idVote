import dynamic from "next/dynamic";
import { ReactNode } from "react";

const AppNoSSR = dynamic(() => import("@/components/AppNav"), { ssr: false });

export interface IChildren {
  children: ReactNode;
}

const DashBoardLayout = ({ children }: IChildren) => (
  <div className="bgCol min-h-screen">
    <AppNoSSR />
    <div>{children}</div>
  </div>
);

export default DashBoardLayout;
