import {
  Calendar,
  DebtCreate,
  DebtorCreate,
  Debtors,
  DebtPayment,
  Home,
  Message,
  NotFoundPage,
  Payments,
  Personal,
  Sample,
  SampleCreate,
  Settings,
  SingleDebt,
  SingleDebtor,
} from "../pages/dashboard";

export const paths = {
  login: "/",
  home: "/",
  debtors: "/clients",
  pay: "/payments",
  message: "/payments/:id",
  set: "/settings",
  calendar: "/debt/date",
  payment: "/debt-payment/:id",
  personal: "/personal",

  debtor_create: "/debtor/create",
  debt_create: "/debt/create/:id",

  debtor_update: "/debtor/update/:id",
  debt_update: "/debt/update/:id/:debtId",

  single_debtor: "/debtor/:id",
  single_debt: "/debt/:id",

  sample: "/sample",
  sample_create: "/sample/create",
  sample_update: "/sample/create/:id",
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
  {
    id: 12,
    path: paths.debt_update,
    element: <DebtCreate />,
  },
  {
    id: 13,
    path: paths.payment,
    element: <DebtPayment />,
  },
  {
    id: 14,
    path: paths.message,
    element: <Message />,
  },
  {
    id: 15,
    path: paths.sample,
    element: <Sample />,
  },
  {
    id: 16,
    path: paths.sample_create,
    element: <SampleCreate />,
  },
  {
    id: 17,
    path: paths.sample_update,
    element: <SampleCreate />,
  },
  {
    id: 18,
    path: paths.personal,
    element: <Personal />,
  },
];
