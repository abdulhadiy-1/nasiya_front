import DebtorCreate from "./DebtorCreate";
import Payments from "./Payments";
import Settings from "./Settings";
import { lazy } from "react";
import Calendar from "./Calendar";
import DebtCreate from "./DebtCreate";

const Home = lazy(() => import("./Home"));
const Debtors = lazy(() => import("./Debtors"));
const SingleDebtor = lazy(() => import("./SingleDebtor"))

export { Home, Debtors, Payments, Settings, Calendar, DebtorCreate, SingleDebtor, DebtCreate };
