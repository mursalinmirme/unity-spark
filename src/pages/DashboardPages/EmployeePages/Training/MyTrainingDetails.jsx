import ProgressBar from "@ramonak/react-progress-bar";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const MyTrainingDetails = () => {
    return (
        <div className="py-10">
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3">
                    <iframe width="100%" height="420" className="rounded-xl" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <h2 className="mt-5 font-semibold text-2xl">
                        Click to open this one and close others
                    </h2>
                    <div className="flex gap-5 items-center mt-3">
                        <button className="bg-primary text-white font-inter font-semibold rounded-lg px-8 py-2 transition-all hover:scale-105 border-2 border-primary">Previous</button>
                        <button className="text-primary border-2 border-primary font-inter font-semibold rounded-lg px-8 py-2 transition-all hover:scale-105">Next</button>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="border-2 rounded-xl space-y-5 p-3 bg-[#ececf8]">
                        <div className="bg-white p-4 rounded-lg">
                            <h2 className="font-semibold text-base mb-2">Your Progress</h2>
                            <ProgressBar
                                completed={90}
                                bgColor="#433ebe"
                                height="13px"
                                baseBgColor="#e3e2f5"
                                labelColor="#ffffff"
                                labelSize="12px"
                                maxCompleted={100}
                                animateOnRender
                            />
                        </div>
                        <div className="collapse collapse-arrow bg-white">
                            <input type="radio" name="my-accordion-2" /> 
                            <div className="collapse-title border-b text-xl font-medium">
                                Click to open this one and close others
                            </div>
                            <div className="collapse-content space-y-2 pt-3"> 
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                                <div className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center">
                                    < MdOutlinePlayCircleFilled className="text-primary" />
                                    <span>hello</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-primary text-white font-inter font-semibold rounded-lg w-full py-3 transition-all hover:scale-105">Complete Course</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyTrainingDetails;