import { useEffect, useState } from "react";
import DashboardRoutes from "./routes/dashboard/DashboardRoutes";
import instance from "./hooks/instance";
import LoadingPage from "./pages/LoadingPage";
import { useCookies } from "react-cookie";
import AuthRoutes from "./routes/auth/AuthRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookie] = useCookies(["accessToken"])

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = cookie.accessToken
      if (!accessToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        await instance.get("/seller/me");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [cookie.accessToken]);

  if (isLoading) return <LoadingPage />;

  return isAuthenticated ? <DashboardRoutes /> : <AuthRoutes />;
}

export default App;
