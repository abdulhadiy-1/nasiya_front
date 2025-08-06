import type { ReactNode } from "react";
import { Menu } from "../modules";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[100vh] relative flex flex-col min-h-[100vh]">
      <main className="site-main">{children}</main>
      <Menu />
    </div>
  );
};

export default DashboardLayout;
