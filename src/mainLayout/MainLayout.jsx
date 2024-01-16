import { Outlet } from "react-router-dom";
import Navbar from "../pages/components/navbar/Navbar";
import Footer from "../pages/components/footer/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-screen-2xl mx-auto font-poppins">
            <Navbar></Navbar>
               <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;