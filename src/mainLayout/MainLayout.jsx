import { Outlet } from "react-router-dom";
import Navbar from "../pages/components/navbar/Navbar";
import Footer from "../pages/components/footer/Footer";
import { useEffect, useState } from "react";
import Loading from "../pages/components/Loading/Loading";

const MainLayout = () => {
    const [showLoading, setShowLoading] = useState(true)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setShowLoading(false)
        }, 1500)

        return () => clearTimeout(timeOut)
    }, [])

    return (
        <div>
            <div className={`${showLoading ? 'block' : 'hidden'}`}>
                <Loading></Loading> 
            </div>
            <div className="font-poppins">
                <Navbar></Navbar>
                <div className="min-h-[70vh]">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;