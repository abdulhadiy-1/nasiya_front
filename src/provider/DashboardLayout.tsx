import type { ReactNode } from "react";
import { Menu } from "../modules";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Toaster position="top-right"/>
      <div className="pb-[80px]">{children}</div>
      <Menu />
    </div>
  );
};

export default DashboardLayout;
