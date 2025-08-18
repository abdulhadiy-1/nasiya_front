import DebtorCreate from "./DebtorCreate";
import Payments from "./Payments";
import Settings from "./Settings";
import { lazy } from "react";
import Calendar from "./Calendar";
import DebtCreate from "./DebtCreate";
import Payment from "./DebtPayment";
import SampleCreate from "./SampleCreate";
import DebtPayment from "./DebtPayment";
import NotFoundPage from "../NotFoundPage";

const Home = lazy(() => import("./Home"));
const Debtors = lazy(() => import("./Debtors"));
const SingleDebtor = lazy(() => import("./SingleDebtor"));
const Message = lazy(() => import("./Message"));
const Sample = lazy(() => import("./Sample"));
const SingleDebt = lazy(() => import("./SingleDebt"));
const Personal = lazy(() => import("./Personal"));

export {
  Home,
  Payment,
  Debtors,
  Payments,
  Settings,
  Calendar,
  DebtorCreate,
  SingleDebtor,
  DebtCreate,
  Message,
  Sample,
  SampleCreate,
  DebtPayment,
  SingleDebt,
  NotFoundPage,
  Personal
};
