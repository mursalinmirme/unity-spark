import { SlLayers } from "react-icons/sl";
import TrendingCourse from "../TrendingCourse/TrendingCourse";
import { HiMiniCodeBracket, HiOutlineMegaphone } from "react-icons/hi2";
import { PiBezierCurve, PiPenNib, PiVideoLight } from "react-icons/pi";
import { VscPieChart } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";
import useCourses from "../../../../hooks/useCourses";

const AvailableCourse = () => {
  const [courses] = useCourses();

  const programmingCourses = courses.filter(
    (programming) => programming?.slag === "programming"
  );
  const GraphicsCourses = courses.filter(
    (programming) => programming?.slag === "graphics-design"
  );
  const contentCourses = courses.filter(
    (programming) => programming?.slag === "content-writing"
  );
  const marketing = courses.filter(
    (programming) => programming?.slag === "marketing"
  );
  const seoCourse = courses.filter(
    (programming) => programming?.slag === "seo-&-smm"
  );
  const videoEditCourse = courses.filter(
    (programming) => programming?.slag === "video-editing"
  );
  const uiUxCourse = courses.filter(
    (programming) => programming?.slag === "ui-ux-design"
  );

  const courseCategory = [
    {
      icon: <SlLayers className="text-primary text-3xl" />,
      title: "All Courses",
      slag: "all",
      count: courses?.length,
    },
    {
      icon: <HiMiniCodeBracket className="text-primary text-3xl" />,
      title: "Programming",
      slag: "programming",
      count: programmingCourses ? programmingCourses?.length : 0,
    },
    {
      icon: <PiPenNib className="text-primary text-3xl" />,
      title: "Graphics Design",
      slag: "graphics-design",
      count: GraphicsCourses ? GraphicsCourses?.length : 0,
    },
    {
      icon: <HiOutlineMegaphone className="text-primary text-3xl" />,
      title: "Marketing",
      slag: "marketing",
      count: marketing ? marketing?.length : 0,
    },
    {
      icon: <VscPieChart className="text-primary text-3xl" />,
      title: "SEO & SMM",
      slag: "seo-&-smm",
      count: seoCourse ? seoCourse?.length : 0,
    },
    {
      icon: <PiVideoLight className="text-primary text-3xl" />,
      title: "Video Editing",
      slag: "video-editing",
      count: videoEditCourse ? videoEditCourse?.length : 0,
    },
    {
      icon: <PiBezierCurve className="text-primary text-3xl" />,
      title: "UI/UX Design",
      slag: "ui-ux-design",
      count: uiUxCourse ? uiUxCourse?.length : 0,
    },
    {
      icon: <MdContentCopy className="text-primary text-3xl" />,
      title: "Content Writing",
      slag: "content-writing",
      count: contentCourses ? contentCourses?.length : 0,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-7 my-10">
        {courseCategory?.map((category, idx) => (
          <Link
            onLoad={() => console.log("check")}
            to={`/dashboard/courses/${category.slag}`}
            key={idx}
            className="rounded-xl py-5"
            style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="px-3 py-2 flex-row justify-center font-inter cursor-pointer">
              <div className="flex justify-center">{category.icon}</div>
              <h1 className="font-semibold mt-3 text-lg text-center">
                {category.title}
              </h1>
              <h1 className="font-medium text-base text-center">
                {category.count} Courses
              </h1>
            </div>
          </Link>
        ))}
      </div>
      <TrendingCourse />
    </div>
  );
};

export default AvailableCourse;
