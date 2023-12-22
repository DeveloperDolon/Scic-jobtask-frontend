import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import SignPage from "../pages/SignPage";
import SignUp from "../pages/SignUp";

const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            }
        ]
    },
    {
        path: "/login",
        element: <SignPage></SignPage>
    },
    {
        path: "/signup",
        element: <SignUp></SignUp>
    }
])

export default MainRouter;