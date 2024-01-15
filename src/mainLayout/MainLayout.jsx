import { Outlet } from "react-router-dom";
import Navbar from "../pages/components/navbar/Navbar";
import Footer from "../pages/components/footer/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-screen-2xl mx-auto font-poppins">
            <Navbar></Navbar>
            {/* this div is used for single time after I will remove the div */}
            <div className="min-h-[70vh]">
               <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;