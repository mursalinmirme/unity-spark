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
import UserProfile from "../pages/DashboardPages/UserProfile/UserProfile";
import UserProfileEdit from "../pages/DashboardPages/UserProfile/UserProfileEdit";
import AvailableJobs from "../pages/availableJobs/AvailableJobs";
import Recruiment from "../pages/DashboardPages/AdminPages/Recruiment/Recruiment";
import Reviews from "../pages/DashboardPages/AdminPages/Reviews/Reviews";
import AddReview from "../pages/DashboardPages/AdminPages/Reviews/AddReview";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";

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
      {
        path: "available-jobs",
        element: <AvailableJobs></AvailableJobs>,
      },
      {
        path: "job-details/:id",
        element: <JobDetails></JobDetails>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "",
        element: <DashboardHome> </DashboardHome>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "userProfileEdit",
        element: <UserProfileEdit></UserProfileEdit>,
      },
      {
        path: "recruiment",
        element: <Recruiment></Recruiment>,
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
        element: <Reviews></Reviews>,
      },
      {
        path: 'reviews/add-review',
        element: <AddReview></AddReview>
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
