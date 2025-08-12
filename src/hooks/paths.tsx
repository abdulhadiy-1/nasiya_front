import {
  Calendar,
  DebtCreate,
  DebtorCreate,
  Debtors,
  Home,
  Payments,
  Settings,
  SingleDebtor,
} from "../pages/dashboard";
import SingleDebt from "../pages/dashboard/SingleDebt";
import NotFoundPage from "../pages/NotFoundPage";

export const paths = {
  login: "/",
  home: "/",
  debtors: "/clients",
  pay: "/payments",
  set: "/settings",
  calendar: "/debt/date",
  debtor_create: "/debtor/create",
  debtor_update: "/debtor/update/:id",
  debt_create: "/debt/create/:id",
  single_debtor: "/debtor/:id",
  single_debt: "/debt/:id",
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
    id: 5,
    path: paths.calendar,
    element: <Calendar />,
  },
  {
    id: 6,
    path: paths.debtor_create,
    element: <DebtorCreate />,
  },
  {
    id: 7,
    path: paths.single_debtor,
    element: <SingleDebtor />,
  },
  {
    id: 8,
    path: paths.debt_create,
    element: <DebtCreate />,
  },
  {
    id: 9,
    path: "*",
    element: <NotFoundPage />,
  },
  {
    id: 10,
    path: paths.debtor_update,
    element: <DebtorCreate />,
  },
  {
    id: 11,
    path: paths.single_debt,
    element: <SingleDebt />,
  },
];
