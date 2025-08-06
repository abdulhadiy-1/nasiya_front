import { lazy } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Login = lazy(() => delay(1500).then(() => import("./auth/AuthRoutes")));

export { Login };
