import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/home/Home";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import AboutUs from "../pages/aboutUs/AboutUs";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '',
                element: <Home></Home>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            },
            {
                path: 'signin',
                element: <Signin></Signin>
            },
            {
                path: 'about-us',
                element: <AboutUs></AboutUs>
            },

        ]
        
    }
])

export default router;