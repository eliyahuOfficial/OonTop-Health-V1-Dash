///routes.tsx
import "../index.css";
import Root from "../layouts/Root.tsx";
import { createBrowserRouter } from "react-router-dom";


import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import ProtectedRoutes from "./ProtecetdRoutes.tsx";
import About from "../pages/About.tsx";
import MonthlyDisplay from "../components/MonthlyDisplay.tsx";
import Profile from "../pages/Profile.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import CRM from "../pages/CRM.tsx";
import UserEdit from "../pages/UserEdit.tsx";
import Terms from "../pages/Terms.tsx";
import Privacy from "../pages/Privacy.tsx";
import Support from "../pages/Support.tsx";
import FAQ from "../pages/FAQ.tsx";
import Settings from "../pages/Settings.tsx";







export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: "/",
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            {
                path: "/about", element:
                    <ProtectedRoutes>
                        <About />
                    </ProtectedRoutes>
            },
            {
                path: "/dashboard", element:
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
            },
            {
                path: "/monthlydisplay", element:
                    <ProtectedRoutes>
                        <MonthlyDisplay />
                    </ProtectedRoutes>
            },
            {
                path: "/profile", element: (
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
                )
            },
            {
                path: "/crm", element: (
                    <ProtectedRoutes>
                        <CRM />
                    </ProtectedRoutes>
                )
            },
            {
                path: "/profile/:id", element:
                    <ProtectedRoutes>
                        <UserEdit />
                    </ProtectedRoutes>
            },
            {
                path: "/terms", element:
                    <ProtectedRoutes>
                        <Terms />
                    </ProtectedRoutes>
            },
            {
                path: "/privacy", element:
                    <ProtectedRoutes>
                        <Privacy />
                    </ProtectedRoutes>
            },
            {
                path: "/support", element:
                    <ProtectedRoutes>
                        <Support />
                    </ProtectedRoutes>
            },
            {
                path: "/faq", element:
                    <ProtectedRoutes>
                        <FAQ />
                    </ProtectedRoutes>
            },
            {
                path: "/settings", element:
                    <ProtectedRoutes>
                        <Settings />
                    </ProtectedRoutes>
            },











        ],
    },
]);

export default router