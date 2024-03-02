import { BsUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from 'sonner';
import axios from "axios";
import { useParams } from "react-router-dom";
import useCourses from "../../../../hooks/useCourses";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
const image_Hosting_Api =
  "https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411";

const CourseUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseSlag, setCourseSlag] = useState("");
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const [modules, setModules] = useState([{ title: "", link: "" }]);
  const { id } = useParams();
  const [courses] = useCourses();
  const currentCourse = courses?.find((course) => course._id === id);
  const {
    _id,
    title,
    category,
    slag,
    description,
    instructor_name,
    instructor_bio,
    intro,
    image,
    instructor_img,
    certificate,
    benefits: course_benefits,
    course_feature,
    course_content,
  } = currentCourse || {};

  console.log(modules);
  useEffect(() => {
    setFeatures(course_feature);
    setBenefits(course_benefits);
    setModules(course_content);
  }, [course_benefits, course_feature, course_content]);

  const categoryArray = [
    { value: "Programming", label: "Programming" },
    { value: "Graphics Design", label: "Graphics Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "SEO & SMM", label: "SEO & SMM" },
    { value: "Video Editing", label: "Video Editing" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Content Writing", label: "Content Writing" },
  ];

  const categorySlags = [
    { value: "programming", label: "programming" },
    { value: "graphics-design", label: "graphics-design" },
    { value: "marketing", label: "marketing" },
    { value: "seo-&-smm", label: "seo-&-smm" },
    { value: "video-editing", label: "video-editing" },
    { value: "ui-ux-design", label: "ui-ux-design" },
    { value: "content-writing", label: "content-writing" },
  ];

  const handleFeatures = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newVal = { name: value };
      setValue("");
      features.push(newVal);
      featuresRef.current.value = "";
    }
  };

  const handleBenefits = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newVal = { name: value };
      setValue("");
      benefits.push(newVal);
      benefitsRef.current.value = "";
    }
  };

  const handleFeaturesRemove = (idx) => {
    const updateArray = features?.filter((arr, index) => idx !== index);
    setFeatures(updateArray);
  };

  const handleBenefitsRemove = (idx) => {
    const updateArray = benefits?.filter((arr, index) => idx !== index);
    setBenefits(updateArray);
  };

  const handleModuleName = (e, idx) => {
    const updatedModules = [...modules];
    updatedModules[idx] = { ...updatedModules[idx], title: e.target.value };
    setModules(updatedModules);
  };

  const handleModuleVideo = (e, idx) => {
    const updatedModules = [...modules];
    updatedModules[idx] = { ...updatedModules[idx], link: e.target.value };
    setModules(updatedModules);
  };

  const onSubmit = async (data) => {
    var newBannerImage;
    var newInstructorImage;
    var newCertificateImage;
    const bannerImage = { image: data.banner_photo[0] };
    const instructorImage = { image: data.instructor_photo[0] };
    const certificateImage = { image: data.certificate_photo[0] };

    if (
      bannerImage.image !== undefined ||
      instructorImage.image !== undefined ||
      certificateImage.image !== undefined
    ) {
      if (bannerImage.image !== undefined) {
        const res1 = await axios.post(image_Hosting_Api, bannerImage, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res1.data.success) {
          newBannerImage = res1?.data?.data?.display_url;
        }
      }
      if (instructorImage.image !== undefined) {
        const res2 = await axios.post(image_Hosting_Api, instructorImage, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res2.data.success) {
          newInstructorImage = res2?.data?.data?.display_url;
        }
      }
      if (certificateImage.image !== undefined) {
        const res3 = await axios.post(image_Hosting_Api, certificateImage, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        if (res3.data.success) {
          newCertificateImage = res3?.data?.data?.display_url;
        }
      }
    }

    const courseInfo = {
      title: data?.course_name ? data?.course_name : title,
      image: bannerImage.image !== undefined ? newBannerImage : image,
      category: courseCategory?.value ? courseCategory?.value : category,
      slag: courseSlag?.value ? courseSlag?.value : slag,
      description: data?.description ? data?.description : description,
      instructor_name: data?.instructor_name
        ? data?.instructor_name
        : instructor_name,
      instructor_img:
        instructorImage.image !== undefined
          ? newInstructorImage
          : instructor_img,
      instructor_bio: data?.instructor_name
        ? data?.instructor_name
        : instructor_bio,
      intro: data?.intro_video ? data?.intro_video : intro,
      certificate:
        certificateImage.image !== undefined
          ? newCertificateImage
          : certificate,
      course_feature: features,
      benefits: benefits,
      course_content: modules,
    };

    axiosSecure
      .put(`/courses/${_id}`, courseInfo)
      .then((res) => {
        if (res?.data.modifiedCount > 0) {
          console.log(res.data);
          toast.success("Course Updated");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="update_course">
      <div className="border-2 border-[#D9D9D9] p-5 rounded-lg">
        <div>
          <div>
            <h4 className="text-2xl font-semibold">Basic Info</h4>
            <div className="border-2 rounded-lg p-4 mt-2">
              <div className="grid grid-cols-2 gap-5 mt-5">
                <input
                  type="text"
                  defaultValue={title}
                  placeholder="Course name"
                  {...register("course_name")}
                />
                <label className="w-full !mb-0" htmlFor="user_photo">
                  <div className="bg-primary rounded-md py-3 text-white font-inter text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                    <BsUpload />
                    <span> Banner Photo</span>{" "}
                  </div>
                </label>
                <input
                  {...register("banner_photo")}
                  className="hidden"
                  type="file"
                  id="user_photo"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <Select
                  options={categoryArray}
                  placeholder={category ? category : "Course category"}
                  value={courseCategory}
                  onChange={setCourseCategory}
                />
                <Select
                  options={categorySlags}
                  placeholder={slag ? slag : "Course slag"}
                  value={courseSlag}
                  onChange={setCourseSlag}
                />
              </div>
              <textarea
                {...register("description")}
                defaultValue={description}
                rows={3}
                placeholder="Write About Your Course"
                className="w-full border mt-5 p-3 rounded-lg outline-none"
              ></textarea>
            </div>
          </div>

          <div>
            <h4 className="mt-4 font-inter font-semibold text-lg">
              Instructor Info
            </h4>
            <div className="border-2 rounded-lg p-4 mt-2">
              <div className="grid grid-cols-2 gap-5">
                <input
                  defaultValue={instructor_name}
                  {...register("instructor_name")}
                  type="text"
                  placeholder="Instructor name"
                />
                <label className="w-full !mb-0" htmlFor="instructor_photo">
                  <div className="bg-primary rounded-md py-3 text-white font-inter text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                    <BsUpload />
                    <span> Instructor Photo</span>{" "}
                  </div>
                </label>
                <input
                  {...register("instructor_photo")}
                  className="hidden"
                  type="file"
                  id="instructor_photo"
                />
              </div>
              <div className="mt-4">
                <input
                  defaultValue={instructor_bio}
                  {...register("instructor_bio")}
                  type="text"
                  placeholder="Instructor bio"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mt-4 font-inter font-semibold text-lg">
              Course Detail Info
            </h4>
            <div className="border-2 rounded-lg p-4 mt-2 space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <input
                  defaultValue={intro}
                  {...register("intro_video")}
                  type="text"
                  placeholder="Intro video link"
                />
                <label className="w-full !mb-0" htmlFor="certificate_photo">
                  <div className="bg-primary rounded-md py-3 text-white font-inter text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                    <BsUpload />
                    <span> Certificate Photo</span>
                  </div>
                </label>
                <input
                  {...register("certificate_photo")}
                  className="hidden"
                  type="file"
                  id="certificate_photo"
                />
              </div>

              {/* Features input */}
              <div className="border w-full rounded-lg flex flex-wrap p-1 items-center gap-2">
                {features &&
                  features?.map((arr, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-200 p-1 border border-slate-500 rounded inline-flex gap-1 items-center"
                    >
                      <span className="text-sm">{arr.name}</span>
                      <RxCross2
                        className="text-sm cursor-pointer"
                        onClick={() => handleFeaturesRemove(idx)}
                      />
                    </div>
                  ))}
                <div
                  className={`${features?.length > 0 ? "w-auto" : "w-full"}`}
                >
                  <input
                    type="text"
                    className="!border-0"
                    placeholder="Course features"
                    ref={featuresRef}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={handleFeatures}
                  />
                </div>
              </div>

              {/* Benefits input */}
              <div className="border w-full rounded-lg flex flex-wrap p-1 items-center gap-2">
                {benefits &&
                  benefits?.map((arr, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-200 p-1 border border-slate-500 rounded inline-flex gap-1 items-center"
                    >
                      <span className="text-sm">{arr.name}</span>
                      <RxCross2
                        className="text-sm cursor-pointer"
                        onClick={() => handleBenefitsRemove(idx)}
                      />
                    </div>
                  ))}
                <div
                  className={`${benefits?.length > 0 ? "w-auto" : "w-full"}`}
                >
                  <input
                    type="text"
                    className="!border-0"
                    placeholder="Course benefits"
                    ref={benefitsRef}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={handleBenefits}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-4 flex items-center justify-between">
              <h4 className="font-inter font-semibold text-lg">
                Course Content
              </h4>
              <AiOutlinePlusCircle
                className="text-2xl text-primary cursor-pointer hover:scale-105"
                onClick={() =>
                  setModules([...modules, { title: "", link: "" }])
                }
              />
            </div>
            <div className="border-2 rounded-lg p-3 mt-2 space-y-3">
              {modules &&
                modules?.map((module, idx) => (
                  <div key={idx}>
                    <h5 className="font-inter font-medium mb-1.5">
                      Module {idx + 1}
                    </h5>
                    <div className="grid grid-cols-2 gap-5">
                      <input
                        type="text"
                        defaultValue={module.title}
                        className="border"
                        placeholder="Module Title"
                        onChange={(e) => handleModuleName(e, idx)}
                      />
                      <input
                        type="text"
                        defaultValue={module.link}
                        className="border py-2"
                        placeholder="Module video link"
                        onChange={(e) => handleModuleVideo(e, idx)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="px-3.5 md:px-5 py-2 bg-[#433EBE] text-white text-base font-semibold mt-4 rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CourseUpdate;
