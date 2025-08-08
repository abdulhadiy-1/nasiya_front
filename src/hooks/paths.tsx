import { Debtors, Home, Payments, Settings } from "../pages/dashboard";
import Calendar from "../pages/dashboard/Calendar";
import NotFoundPage from "../pages/NotFoundPage";

export const paths = {
  login: "/",
  home: "/",
  debtors: "/clients",
  pay: "/payments",
  set: "/settings",
  calendar: "/debt/date",
};

export const HomeRoutes = [
  {
    id: 1,
    path: paths.home,
    element: <Home />,
  },
  {
    id: 2,
    path: paths.debtors,
    element: <Debtors />,
  },
  {
    id: 3,
    path: paths.pay,
    element: <Payments />,
  },
  {
    id: 4,
    path: paths.set,
    element: <Settings />,
  },
  {
    id: 6,
    path: "/debt/date",
    element: <Calendar />,
  },
  {
    id: 5,
    path: "*",
    element: <NotFoundPage />,
  },
];
