import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Signin from "../pages/Authentication/signin/Signin";
import Signup from "../pages/Authentication/signup/Signup";
import Blogs from "../pages/Blogs/Blogs";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddNewCourse from "../pages/DashboardPages/AdminPages/AddNewCourse/AddNewCourse";
import AllUsers from "../pages/DashboardPages/AdminPages/AllUsers/AllUsers";
import AdminBlogDetails from "../pages/DashboardPages/AdminPages/BlogRequests/AdminBlogDetails";
import BlogRequests from "../pages/DashboardPages/AdminPages/BlogRequests/BlogRequests";
import Employee from "../pages/DashboardPages/AdminPages/Employees/Employee";
import Interviews from "../pages/DashboardPages/AdminPages/Interviews/Interviews";
import JobAds from "../pages/DashboardPages/AdminPages/JobAds/JobAds";
import LeaveRequests from "../pages/DashboardPages/AdminPages/ManageLeave/LeaveRequests";
import PaymentManagement from "../pages/DashboardPages/AdminPages/PaymentManagement/PaymentManagement";
import Recruiment from "../pages/DashboardPages/AdminPages/Recruiment/Recruiment";
import AddReview from "../pages/DashboardPages/AdminPages/Reviews/AddReview";
import Reviews from "../pages/DashboardPages/AdminPages/Reviews/Reviews";
import TrainingManagement from "../pages/DashboardPages/AdminPages/TrainingManagement/TrainingManagement";
import BlogDetails from "../pages/DashboardPages/BlogDetails/BlogDetails";
import CourseDetails from "../pages/DashboardPages/CourseDetails/CourseDetails";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";
import EditBlogs from "../pages/DashboardPages/EmployeePages/EditBlogs/EditBlogs";
import AddBlogs from "../pages/DashboardPages/EmployeePages/EmployeeHome/AddBlogs/AddBlogs";
import EmployeeHome from "../pages/DashboardPages/EmployeePages/EmployeeHome/EmployeeHome";
import MyBlogs from "../pages/DashboardPages/EmployeePages/MyBlogs/MyBlogs";
import MyProfile from "../pages/DashboardPages/EmployeePages/MyProfile/MyProfile";
import MyTrainingDetails from "../pages/DashboardPages/EmployeePages/Training/MyTrainingDetails";
import Training from "../pages/DashboardPages/EmployeePages/Training/Training";
import LeaveManagement from "../pages/DashboardPages/LeaveManagement/LeaveManagement";
import LeaveRequestForm from "../pages/DashboardPages/LeaveManagement/LeaveRequestForm";
import ManageEvents from "../pages/DashboardPages/ManageEvents/ManageEvents";
import MySaveJob from "../pages/DashboardPages/MySaveJob/MySaveJob";
import AddNewTask from "../pages/DashboardPages/TaskManagement/AddNewTask";
import TaskManagement from "../pages/DashboardPages/TaskManagement/TaskManagement";
import Interview from "../pages/DashboardPages/UserPages/Interview/Interview";
import InterviewCall from "../pages/DashboardPages/UserPages/InterviewCall/InterviewCall";
import MyApplications from "../pages/DashboardPages/UserPages/Myapplications/MyApplications";
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
import JobsEdit from "../pages/components/Dashboard/JobAds/JobsEdit";
import JobDetails from "../pages/components/HomeComponents/JobPost/JobDetails/JobDetails";
import Home from "../pages/home/Home";
import IsAdmin from "../privateRouter.jsx/IsAdmin";
import IsCommonAccess from "../privateRouter.jsx/IsCommonAccess";
import IsEmployee from "../privateRouter.jsx/IsEmployee";
import PrivateRouter from "../privateRouter.jsx/PrivateRouter";
// import InterviewsDetails from "../pages/DashboardPages/AdminPages/Interviews/interviewsDetails";
import Courses from "../pages/DashboardPages/EmployeePages/Training/Courses/Courses";
import Payment from "../pages/DashboardPages/AdminPages/PaymentManagement/Payment";
import CourseUpdate from "../pages/DashboardPages/AdminPages/TrainingManagement/CourseUpdate";
import IsAdminOrEmployee from "../privateRouter.jsx/IsAdminOrEmployee";
import RecruitmentService from "../pages/AllFooterPage/RecruitmentService/RecruitmentService";
import Support from "../pages/AllFooterPage/Support/Support";
import SecurityMeasure from "../pages/AllFooterPage/SecurityMeasure/SecurityMeasure";
import CopyrightInfo from "../pages/AllFooterPage/CopyrightInfo/CopyrightInfo";
import FAQs from "../pages/AllFooterPage/FAQs/FAQs";
import TermsCondition from "../pages/AllFooterPage/TermsCondition/TermsCondition";
import Disclaimer from "../pages/AllFooterPage/Disclaimer/Disclaimer";
import Accessibility from "../pages/AllFooterPage/Accessibility/Accessibility";
import SavedBlogs from "../pages/DashboardPages/EmployeePages/SavedBlogs/SavedBlogs";
import PrivacyPolicy from "../pages/AllFooterPage/PrivacyPolicy/PrivacyPolicy";
import InterviewsDetails from "../pages/DashboardPages/AdminPages/Interviews/InterviewsDetails";
import NewsletterSubscribers from "../pages/DashboardPages/AdminPages/Subscribers/NewsletterSubscribers";
import AddAnnouncement from "../pages/DashboardPages/AdminPages/Subscribers/AddAnnouncement";
import OurVision from "../pages/components/HomeComponents/WhyDifferent/OurVision";
import AdminHome from "../pages/DashboardPages/AdminPages/AdminHome/AdminHome";

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
        path: "our-vision",
        element: <OurVision></OurVision>,
      },

      // All Footer Page Start

      {
        path: "recruitmentService",
        element: <RecruitmentService></RecruitmentService>,
      },
      {
        path: "support",
        element: <Support></Support>,
      },
      {
        path: "securityMeasure",
        element: <SecurityMeasure></SecurityMeasure>,
      },
      {
        path: "copyrightInfo",
        element: <CopyrightInfo></CopyrightInfo>,
      },

      //  company Part link Page
      {
        path: "faq",
        element: <FAQs></FAQs>,
      },

      // Legal Part link Page
      {
        path: "termsCondition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "disclaimer",
        element: <Disclaimer></Disclaimer>,
      },
      {
        path: "accessibility",
        element: <Accessibility></Accessibility>,
      },
      // All Footer Page End

      {
        path: "available-jobs",
        element: <AvailableJobs></AvailableJobs>,
      },
      {
        path: "job-details/:id",
        element: <JobDetails></JobDetails>,
      },
      {
        path: "blog-details/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "apply-job/:id",
        element: (
          <PrivateRouter>
            <ApplyJobs></ApplyJobs>
          </PrivateRouter>
        ),
      },
      {
        path: "blog",
        element: <Blogs></Blogs>,
      },
      {
        path: "mycourse/:id",
        element: (
          <PrivateRouter>
            <MyTrainingDetails></MyTrainingDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "course/:id",
        element: (
          <PrivateRouter>
            <CourseDetails></CourseDetails>
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
        path: "interview",
        element: <Interview></Interview>,
      },

      {
        path: "interview-call/:interviwId",
        element: <InterviewCall></InterviewCall>,
      },

      {
        path: "interviews",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <Interviews></Interviews>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "interview-details/:id",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <InterviewsDetails></InterviewsDetails>
            </IsAdmin>
          </PrivateRouter>
        ),
      },

      {
        path: "employeeHome",
        element: (
          <PrivateRouter>
            <IsEmployee>
              <EmployeeHome></EmployeeHome>
            </IsEmployee>
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
        path: "user-profile",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <UserProfile></UserProfile>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "user-profile-edit",
        element: (
          <PrivateRouter>
            <IsCommonAccess>
              <UserProfileEdit></UserProfileEdit>
            </IsCommonAccess>
          </PrivateRouter>
        ),
      },
      {
        path: "admin-home",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <AdminHome></AdminHome>
            </IsAdmin>
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
            <IsAdminOrEmployee>
              <AllUsers></AllUsers>
            </IsAdminOrEmployee>
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
        path: "courses/:category",
        element: (
          <PrivateRouter>
            <IsEmployee>
              <Courses></Courses>
            </IsEmployee>
          </PrivateRouter>
        ),
      },
      {
        path: "communication",
        element: (
          <PrivateRouter>
            <IsAdminOrEmployee>
              <Communication></Communication>
            </IsAdminOrEmployee>
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
            <ManageEvents />
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
      {
        path: "myBlogs",
        element: (
          <PrivateRouter>
            <MyBlogs></MyBlogs>
          </PrivateRouter>
        ),
      },
      {
        path: "savedBlogs",
        element: (
          <PrivateRouter>
            <SavedBlogs></SavedBlogs>
          </PrivateRouter>
        ),
      },
      {
        path: "training",
        element: (
          <PrivateRouter>
            <Training></Training>
          </PrivateRouter>
        ),
      },
      {
        path: "addBlogs",
        element: (
          <PrivateRouter>
            <AddBlogs></AddBlogs>
          </PrivateRouter>
        ),
      },
      {
        path: "editBlogs/blogs/:id",
        element: (
          <PrivateRouter>
            <EditBlogs></EditBlogs>
          </PrivateRouter>
        ),
      },
      {
        path: "TaskManagement",
        element: (
          <PrivateRouter>
            <TaskManagement></TaskManagement>
          </PrivateRouter>
        ),
      },
      {
        path: "addNewTask",
        element: (
          <PrivateRouter>
            <AddNewTask></AddNewTask>
          </PrivateRouter>
        ),
      },
      {
        path: "leave-requests",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <LeaveRequests></LeaveRequests>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "newLeaveRequest",
        element: (
          <PrivateRouter>
            <LeaveRequestForm></LeaveRequestForm>
          </PrivateRouter>
        ),
      },
      {
        path: "blog-requests",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <BlogRequests></BlogRequests>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "adminBlogDetails/:id",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <AdminBlogDetails></AdminBlogDetails>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "training-management",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <TrainingManagement />
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "training-management/add-new-course",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <AddNewCourse></AddNewCourse>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "update-course/:id",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <CourseUpdate></CourseUpdate>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "mySaveJob",
        element: (
          <PrivateRouter>
            <MySaveJob></MySaveJob>
          </PrivateRouter>
        ),
      },
      {
        path: "my-applications",
        element: (
          <PrivateRouter>
            <MyApplications></MyApplications>
          </PrivateRouter>
        ),
      },
      {
        path: "payment-management",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <PaymentManagement></PaymentManagement>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "payment-management/payment",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <Payment></Payment>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "newsletter-subscribers",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <NewsletterSubscribers></NewsletterSubscribers>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
      {
        path: "add-announcement",
        element: (
          <PrivateRouter>
            <IsAdmin>
              <AddAnnouncement></AddAnnouncement>
            </IsAdmin>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
