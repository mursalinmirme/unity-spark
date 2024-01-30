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
import PrivateRouter from "../privateRouter.jsx/PrivateRouter";
import Events from "../pages/Events";
import AddJobs from "../pages/components/Dashboard/JobAds/AddJobs";
import Communication from "../pages/DashboardPages/communication/Communication";
import Employee from "../pages/DashboardPages/AdminPages/Employees/Employee";
import Attendance from "../pages/components/Attendance/Attendance";
import ApplyJobs from "../pages/availableJobs/ApplyJobs";

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
        path: "events",
        element: <Events></Events>,
      },
      {
        path: "available-jobs",
        element: <AvailableJobs></AvailableJobs>,
      },
      {
        path: "job-details/:id",
        element: <JobDetails></JobDetails>,
      },
      {
        path: "apply-job/:id",
        element: <ApplyJobs></ApplyJobs>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <DashboardHome></DashboardHome>
          </PrivateRouter>
        ),
      },
      {
        path: "employee-profile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "userProfile",
        element: (
          <PrivateRouter>
            <UserProfile></UserProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "userProfileEdit",
        element: (
          <PrivateRouter>
            <UserProfileEdit></UserProfileEdit>
          </PrivateRouter>
        ),
      },
      {
        path: "recruitment",
        element: (
          <PrivateRouter>
            <Recruiment></Recruiment>
          </PrivateRouter>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRouter>
            <AllUsers></AllUsers>
          </PrivateRouter>
        ),
      },
      {
        path: "jobs",
        element: (
          <PrivateRouter>
            <JobAds></JobAds>
          </PrivateRouter>
        ),
      },
      {
        path: "tasks",
        element: (
          <PrivateRouter>
            <JobAds></JobAds>
          </PrivateRouter>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRouter>
            <Reviews></Reviews>
          </PrivateRouter>
        ),
      },
      {
        path: "reviews/add-review",
        element: (
          <PrivateRouter>
            <AddReview></AddReview>
          </PrivateRouter>
        ),
      },
      {
        path: "communication",
        element: (
          <PrivateRouter>
            <Communication></Communication>
          </PrivateRouter>
        ),
      },
      {
        path: "employees",
        element: (
          <PrivateRouter>
            <Employee></Employee>
          </PrivateRouter>
        ),
      },
      {
        path: "addJobs",
        element: (
          <PrivateRouter>
            <AddJobs></AddJobs>
          </PrivateRouter>
        ),
      },
      {
        path: "attendance",
        element: <Attendance></Attendance>,
      },
    ],
  },
]);

export default router;
