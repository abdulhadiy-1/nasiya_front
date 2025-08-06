import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "../../hooks/paths";
import DashboardLayout from "../../provider/DashboardLayout";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {HomeRoutes.map((item) => (
          <Route key={item.id} path={item.path} element={item.element} />
        ))}
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
