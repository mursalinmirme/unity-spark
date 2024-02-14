import TrendingCourse from "../TrendingCourse/TrendingCourse";

const AvailableCourse = () => {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center items-center gap-5 my-5">
                <div className="w-40 h-32  shadow-xl rounded-xl my-4">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/JjrnbkK/all-course.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">All Course</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36 shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/j36nmhN/bracates.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">Programming</h1>
                    <h1 className="font-semibold text-lg text-center">5 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36  shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/ys8Csn3/brash.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">Graphics Design</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36  shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/h2gS22S/mike.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">Marketing</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36  shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/d7NcVX7/globe.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">SEO & SMM</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36  shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/nbH70fG/y.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">Video Editing</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36  shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/bzrhXW7/ui.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">UI/UX Design</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
                <div className="w-44 h-36  shadow-xl rounded-xl">
                   <div className="px-3 py-2 flex-row justify-center">
                  <div className="flex justify-center">
                  <img src="https://i.ibb.co/9GCdv2X/paper.png" alt="" />
                  </div>
                    <h1 className="font-bold text-xl text-center">Content Writing</h1>
                    <h1 className="font-semibold text-lg text-center">15 Courses</h1>
                   </div>
                </div>
            </div>
            <h2 className="text-2xl font-semibold my-5">Trending Course</h2>
            <TrendingCourse/>
        </div>
    );
};

export default AvailableCourse;