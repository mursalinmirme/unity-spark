import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/home/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import Error from "../pages/Error/Error";
import Dashboard from "../pages/Dashboard/Dashboard";
import Signup from "../pages/Authentication/signup/Signup";
import Signin from "../pages/Authentication/signin/Signin";
import JobDetails from "../pages/components/HomeComponents/JobPost/JobDetails/JobDetails";
import MyProfile from "../pages/DashboardPages/EmployeePages/MyProfile/MyProfile";
import AllUsers from "../pages/DashboardPages/AdminPages/AllUsers/AllUsers";
import JobAds from "../pages/DashboardPages/AdminPages/JobAds/JobAds";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "signin",
        element: <Signin></Signin>,
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "details/:id",

        element: <JobDetails></JobDetails>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "jobs",
        element: <JobAds></JobAds>,
      },
      {
        path: "tasks",
        element: <JobAds></JobAds>,
      },
      {
        path: "reviews",
        element: <JobAds></JobAds>,
      },
      {
        path: "communication",
        element: <JobAds></JobAds>,
      },
      {
        path: "employees",
        element: <JobAds></JobAds>,
      },
    ],
  },
]);

export default router;
