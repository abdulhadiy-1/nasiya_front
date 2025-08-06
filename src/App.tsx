import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DashboardRoutes from "./routes/dashboard/DashboardRoutes";
import { Login } from "./routes";
import LoadingPage from "./pages/LoadingPage";
import axios from "axios";
import { API } from "./hooks/getEnv";

function App() {
  const [cookie] = useCookies(["accessToken"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!cookie.accessToken) {
        setIsAuthenticated(false);
        return;
      }
      axios
        .get(`${API}/seller/me`, {
          headers: { Authorization: `Bearer ${cookie.accessToken}` },
        })
        .then(() => setIsAuthenticated(true))
        .catch((error) => {
          console.error(error);
          setIsAuthenticated(false);
        });
    };

    checkAuth();
  }, [cookie.accessToken]);

  if (isAuthenticated === null) {
    return <LoadingPage />;
  }

  return isAuthenticated ? <DashboardRoutes /> : <Login />;
}

export default App;
