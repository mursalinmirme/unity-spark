import { Outlet } from "react-router-dom";
import Navbar from "../pages/components/navbar/Navbar";
import Footer from "../pages/components/footer/Footer";

const MainLayout = () => {
    return (
        <div className="font-poppins">
            <Navbar></Navbar>
            {/* this div is used for single time after I will remove the div */}
            <div className="min-h-[70vh] max-w-[92%] lg:max-w-[1200px] mx-auto">
               <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;