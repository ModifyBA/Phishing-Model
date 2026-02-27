import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { SecurityInsights } from "./pages/SecurityInsights";
import { HowItWorks } from "./pages/HowItWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/insights/:domain",
    Component: SecurityInsights,
  },
  {
    path: "/how-it-works",
    Component: HowItWorks,
  },
]);