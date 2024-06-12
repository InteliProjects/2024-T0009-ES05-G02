import { createBrowserRouter } from "react-router-dom";

import Menu from "./pages/menu";
import Members from "./pages/members";
import NewClass from "./pages/newClass";
import Class from "./pages/class";
import Course from "./pages/course";
import DashGF from "./pages/dashGF"
import NewClassSchedule from "./pages/newClassSchedule"
import DashONG from "./pages/dashONG";
import NewStudent from "./pages/newStudent";
import NewResponsable from "./pages/newResponsable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/members",
    element: <Members />,
  },
  {
    path: "new/class",
    element: <NewClass />,
  },
  {
    path: "/new/schedule",
    element: <NewClassSchedule />,
  },
  {
    path: "/new/student",
    element: <NewStudent />,
  },
  {
    path: "/new/responsable",
    element: <NewResponsable />,
  },
  {
    path: "/class/:id",
    element: <Class />,
  },
  {
    path: "/course/:id",
    element: <Course />,
  },
  {
    path: "/dash/gf",
    element: <DashGF />,
  },
  {
    path: "/dash/ong",
    element: <DashONG />,
  },
]);
