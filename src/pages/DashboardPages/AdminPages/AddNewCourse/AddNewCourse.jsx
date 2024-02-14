import axios from "axios";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Select from "react-select";

const AddNewCourse = () => {  
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit , formState: { errors }, reset} = useForm()
  const [value, setValue] = useState('')
  const [features, setFeatures] = useState([])
  const [benefits, setBenefits] = useState([])
  const [courseCategory, setCourseCategory] = useState('')
  const [modules, setModules] = useState([
    {name: '', video: ''}
  ])

  const categoryArray = [
    { value: "Programming", label: "Programming" },
    { value: "Graphics Design", label: "Graphics Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "SEO & SMM", label: "SEO & SMM" },
    { value: "Video Editing", label: "Video Editing" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Content Writing", label: "Content Writing" },
  ];

  const handleFeatures = e => {
    if(e.key === 'Enter'){
        e.preventDefault()
        const newVal = {name: value}
        setValue('')
        features.push(newVal);
        reset()
    }
  }

  const handleBenefits = e => {
    if(e.key === 'Enter'){
        e.preventDefault()
        const newVal = {name: value}
        setValue('')
        benefits.push(newVal);
        reset()
    }
  }

  const handleFeaturesRemove = (idx) => {
      const updateArray = features?.filter((arr, index) => idx !== index)
      setFeatures(updateArray)
  }

  const handleBenefitsRemove = (idx) => {
      const updateArray = benefits?.filter((arr, index) => idx !== index)
      setBenefits(updateArray)
  }

  const handleNewModule = () => {
    setModules([...modules, {name: '', video: ''}])
  }

  const handleModuleName = (e, idx) => {
    const updatedModules = [...modules];
    updatedModules[idx] = { ...updatedModules[idx], name: e.target.value };
    setModules(updatedModules);
  };

  const handleModuleVideo = (e, idx) => {
    const updatedModules = [...modules];
    updatedModules[idx] = { ...updatedModules[idx], video: e.target.value }; 
    setModules(updatedModules); 
  };

  const onSubmit = async (data) => {
    console.log('form submitted', data);
    // let skillsArray = [];
    // data?.skills?.map((skill) => {
    //   skillsArray.push(skill.label);
    // });
    // const bannerImage = { image: data.banner_photo[0] };
    // const instructorImage = { image: data.instructor_photo[0] };
    // const certificateImage = { image: data.certificate_photo[0] };
    // const res = await axios.post(image_Hosting_Api, bannerImage, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // if(res.data.success){
    //     const courseInfo = {
    //         title: data?.title,
    //         tags: data?.tags,
    //         image: res?.data?.data?.display_url,
    //         description: data?.description,
    //         category: skillsArray,
    //         instructor_name: data?.instructor_name,
    //         intro: data?.intro,
    //         instructor_bio: data?.instructor_bio
            
    //       };
    //       console.log(courseInfo);

    //       axiosPublic.post("/courses", courseInfo)
    //       .then(res =>{
    //       if(res?.data){
    //         toast.success("Course Added")
    //         reset()
    //       }

    //       })
    //       .catch(error => {
    //         console.log(error.message);
    //         toast.error(error.message)
    //       })
    // }
    
  }

    return (
      <div className="p-3 new_course">
        <h1 className="text-2xl font-bold my-3">Add a New Course</h1>

        {/* form  */}
        
        <div className="border-2 border-[#D9D9D9] p-5 rounded-lg">
          <div>
            <div>
              <h4 className="mt-4 font-inter font-semibold text-lg">Basic Info</h4>
              <div className="border-2 rounded-lg p-4 mt-2">
                <input type="text" className="border !mt-0 py-2" placeholder="Course name" {...register("course_name", { required: true })} />
                {errors.course_name && <p className="text-red-500">name is required.</p>}
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <label className="w-full !mb-0" htmlFor="user_photo">
                    <div className="bg-primary rounded-md py-3 text-white font-inter text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                      <BsUpload />
                      <span> Banner Photo</span>{" "}
                    </div>
                  </label>
                  <input
                    {...register("banner_photo", {required: true})}
                    className="hidden"
                    type="file"
                    id="user_photo"
                  />
                  <Select
                      options={categoryArray}
                      placeholder="Course category"
                      value={courseCategory}
                      onChange={setCourseCategory}
                  />
                </div>                  
                {errors.banner_photo && <p className="text-red-500">photo is required.</p>}
                <textarea
                  {...register("description", {required: true})}
                  rows={3}
                  placeholder="Write About Your Course"
                  className="w-full border mt-5 p-3 rounded-lg outline-none"
                ></textarea>
                {errors.description && <p className="text-red-500">please add a short desctiption.</p>}
              </div>
            </div>
        
            <div>
              <h4 className="mt-4 font-inter font-semibold text-lg">Instructor Info</h4>
              <div className="border-2 rounded-lg p-4 mt-2">
                <div className="grid grid-cols-2 gap-5">
                  <input {...register("instructor_name", {required: true})} type="text" className="border !mt-0" placeholder="Instructor name" />
                  <label className="w-full !mb-0" htmlFor="_photo">
                    <div className="bg-primary rounded-md py-3 text-white font-inter text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                      <BsUpload />
                      <span> Instructor Photo</span>{" "}
                    </div>
                  </label>
                  <input
                    {...register("instructor_photo", {required: true})}
                    className="hidden"
                    type="file"
                    id="_photo"
                  />
                </div>
                {errors.instructor_name && <p className="text-red-500">name is required.</p>}
                {errors.instructor_photo && <p className="text-red-500">photo is required.</p>}
                <input {...register("instructor_bio", {required: true})} type="text" className="border py-2 mt-5" placeholder="Instructor bio" />
                {errors.instructor_bio && <p className="text-red-500">bio is required.</p>}
              </div>
            </div>

            <div>
              <h4 className="mt-4 font-inter font-semibold text-lg">Course Detail Info</h4>
              <div className="border-2 rounded-lg p-4 mt-2 space-y-4">
                <div className="grid grid-cols-2 gap-5">
                  <input {...register("intro_video", {required: true})} type="text" className="border py-2 !mt-0" placeholder="Intro video link" />
                  <label className="w-full !mb-0" htmlFor="certificate_photo">
                      <div className="bg-primary rounded-md py-3 text-white font-inter text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                        <BsUpload />
                        <span> Certificate Photo</span>
                      </div>
                    </label>
                    <input
                      {...register("photo")}
                      className="hidden"
                      type="file"
                      id="certificate_photo"
                    />
                </div>
                {errors.intro_video && <p className="text-red-500">intro video is required.</p>}

                {/* Features input */}
                <div className="border w-full rounded-lg flex flex-wrap py-1 items-center gap-2">
                    {
                        features && features?.map((arr, idx) => (
                            <div key={idx} className="bg-slate-200 p-1 border border-slate-500 rounded inline-flex gap-1 items-center">
                                <span className="text-sm">{arr.name}</span>
                                <RxCross2 className="text-sm cursor-pointer" onClick={() => handleFeaturesRemove(idx)} />
                            </div>
                        ))
                    }
                    <div className={`${features?.length > 0 ? 'w-auto' : 'w-full'}`}>
                        <input type="text" className="w-full rounded-lg outline-none border-0 !mt-0" placeholder="Course features" onChange={e => setValue(e.target.value)} onKeyPress={handleFeatures}/>
                    </div>
                </div>

                {/* Benefits input */}
                <div className="border w-full rounded-lg flex flex-wrap py-1 items-center gap-2">
                    {
                        benefits && benefits?.map((arr, idx) => (
                            <div key={idx} className="bg-slate-200 p-1 border border-slate-500 rounded inline-flex gap-1 items-center">
                                <span className="text-sm">{arr.name}</span>
                                <RxCross2 className="text-sm cursor-pointer" onClick={() => handleBenefitsRemove(idx)} />
                            </div>
                        ))
                    }
                    <div className={`${benefits?.length > 0 ? 'w-auto' : 'w-full'}`}>
                        <input type="text" className="w-full rounded-md outline-none border-0 !mt-0" placeholder="Course benefits" onChange={e => setValue(e.target.value)} onKeyPress={handleBenefits}/>
                    </div>
                </div>
              </div>
            </div>

            {/* <div>
              <div className="mt-4 flex items-center justify-between">
                <h4 className="font-inter font-semibold text-lg">Course Content</h4>
                <AiOutlinePlusCircle className="text-2xl text-primary cursor-pointer hover:scale-105" onClick={handleNewModule} />
              </div>
              <div className="border-2 rounded-lg p-3 mt-2 space-y-3">
                {
                  modules && modules?.map((module, idx) => (
                    <div key={idx}>
                      <h5 className="font-inter font-medium">Module {idx + 1}</h5>
                      <div className="grid grid-cols-2 gap-5">
                        <input type="text" className="border" placeholder="Module name" onChange={e => handleModuleName(e, idx)} />
                        <input type="text" className="border py-2" placeholder="Module video link" onChange={e => handleModuleVideo(e, idx)} />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div> */}

            
          </div>
          <button onClick={handleSubmit(onSubmit)} type="submit" className="px-3.5 md:px-5 py-2 bg-[#433EBE] text-white text-base font-semibold mt-4 rounded-lg">Publish</button>
        </div>
      </div>
    );
};

export default AddNewCourse;