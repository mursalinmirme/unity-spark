import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Signin from "../pages/Authentication/signin/Signin";
import Signup from "../pages/Authentication/signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllUsers from "../pages/DashboardPages/AdminPages/AllUsers/AllUsers";
import Employee from "../pages/DashboardPages/AdminPages/Employees/Employee";
import JobAds from "../pages/DashboardPages/AdminPages/JobAds/JobAds";
import Recruiment from "../pages/DashboardPages/AdminPages/Recruiment/Recruiment";
import AddReview from "../pages/DashboardPages/AdminPages/Reviews/AddReview";
import Reviews from "../pages/DashboardPages/AdminPages/Reviews/Reviews";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";
import MyProfile from "../pages/DashboardPages/EmployeePages/MyProfile/MyProfile";
import UserProfile from "../pages/DashboardPages/UserProfile/UserProfile";
import UserProfileEdit from "../pages/DashboardPages/UserProfile/UserProfileEdit";
import Communication from "../pages/DashboardPages/communication/Communication";
import Error from "../pages/Error/Error";
import Events from "../pages/Events";
import AboutUs from "../pages/aboutUs/AboutUs";
import ApplyJobs from "../pages/availableJobs/ApplyJobs";
import AvailableJobs from "../pages/availableJobs/AvailableJobs";
import Attendance from "../pages/components/Attendance/Attendance";
import AddJobs from "../pages/components/Dashboard/JobAds/AddJobs";
import JobDetails from "../pages/components/HomeComponents/JobPost/JobDetails/JobDetails";
import Home from "../pages/home/Home";
import IsAdmin from "../privateRouter.jsx/IsAdmin";
import IsCommonAccess from "../privateRouter.jsx/IsCommonAccess";
import IsEmployee from "../privateRouter.jsx/IsEmployee";
import PrivateRouter from "../privateRouter.jsx/PrivateRouter";
import ManageEvents from "../pages/DashboardPages/ManageEvents/ManageEvents";
import JobsEdit from "../pages/components/Dashboard/JobAds/JobsEdit";
import LeaveManagement from "../pages/DashboardPages/LeaveManagement/LeaveManagement";

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
        element: (
          <PrivateRouter>
            <ApplyJobs></ApplyJobs>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <IsCommonAccess>
          <Dashboard></Dashboard>
        </IsCommonAccess>
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <DashboardHome></DashboardHome>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "employee-profile",
        element: (
          <PrivateRouter>
            <IsEmployee>
              <MyProfile></MyProfile>
            </IsEmployee>
          </PrivateRouter>
        ),
      },
      {
        path: "userProfile",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <UserProfile></UserProfile>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "userProfileEdit",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <UserProfileEdit></UserProfileEdit>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "recruitment",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <Recruiment></Recruiment>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <AllUsers></AllUsers>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "jobs",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <JobAds></JobAds>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "jobs/jobs-edit/:id",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <JobsEdit></JobsEdit>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "tasks",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <JobAds></JobAds>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <Reviews></Reviews>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "reviews/add-review",
        element: (
          <PrivateRouter>
            <IsEmployee>
              <AddReview></AddReview>
            </IsEmployee>
          </PrivateRouter>
        ),
      },
      {
        path: "communication",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <Communication></Communication>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "employees",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <Employee></Employee>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "addJobs",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <AddJobs></AddJobs>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "attendance",
        element: (
          <PrivateRouter>
            <IsEmployee>
              <Attendance></Attendance>
            </IsEmployee>
          </PrivateRouter>
        ),
      },
      {
        path: "addEvent",
        element: (
          <PrivateRouter>
            <ManageEvents/>
          </PrivateRouter>
        ),
      },
      {
        path: "leaveManagement",
        element: (
          <PrivateRouter>
            <LeaveManagement></LeaveManagement>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
