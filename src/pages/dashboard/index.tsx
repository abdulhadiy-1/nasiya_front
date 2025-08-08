import Payments from "./Payments";
import Settings from "./Settings";
import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Debtors = lazy(() => import("./Debtors"));

export { Home, Debtors, Payments, Settings };
