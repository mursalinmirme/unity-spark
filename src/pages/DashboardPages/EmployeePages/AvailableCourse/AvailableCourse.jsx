import { SlLayers } from "react-icons/sl";
import TrendingCourse from "../TrendingCourse/TrendingCourse";
import { HiMiniCodeBracket, HiOutlineMegaphone } from "react-icons/hi2";
import { PiBezierCurve, PiPenNib, PiVideoLight } from "react-icons/pi";
import { VscPieChart } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";

const AvailableCourse = () => {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-7 my-10">
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <SlLayers className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">All Courses</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <HiMiniCodeBracket className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">Programming</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <PiPenNib className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">Graphics Design</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <HiOutlineMegaphone className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center cursor-pointer">Marketing</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <VscPieChart className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">SEO & SMM</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <PiVideoLight className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">Video Editing</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <PiBezierCurve className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">UI/UX Design</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="rounded-xl py-5" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                   <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
                     <div className="flex justify-center">
                        <MdContentCopy className="text-primary text-3xl" />
                     </div>
                     <h1 className="font-semibold mt-3 text-lg text-center">Content Writing</h1>
                     <h1 className="font-medium text-base text-center">15 Courses</h1>
                   </div>
                </div>
            </div>
            <TrendingCourse/>
        </div>
    );
};

export default AvailableCourse;