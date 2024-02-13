/* eslint-disable no-constant-condition */
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdTime } from "react-icons/io";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ApplicationsCard from "./ApplicationsCard";
import Loading from "../../Loading/Loading";
import DatePicker from "react-datepicker";
import useTimePicker from "../../../../hooks/useTimePicker";
import { useForm } from "react-hook-form";
import { CiCalendar } from "react-icons/ci";

const ManageApplications = () => {
  const axiosPublic = useAxiosPublic();
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationId, setApplicationId] = useState(" ");
  const [storeInfo, setStoreInfo] = useState({});
  const [adminInfo, setAdminInfo] = useState({});
  const [show, setShow] = useState(true);
  const [storeLength, setStoreLength] = useState(4);
  const [selectDate, setSelectDate] = useState(new Date());
  const date = new Date(selectDate);
  const [design, setDesign] = useState(false);
  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "long" });
  const year = date.getFullYear();
  let deted = `${day},${month}, ${year}`;
  // All Admin Get
  const { data: allAdmins } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-admins");
      return res?.data;
    },
  });

  // My Working Modal
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const timeStart = useTimePicker(selectedStartTime || null);
  const timeEnd = useTimePicker(selectedEndTime || null);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const shortLists = {
      candidateName: storeInfo?.name,
      candidateEmail: storeInfo?.email,
      candidateImage: storeInfo?.image,
      date: deted,
      description: data?.description,
      startTime: timeStart,
      endTime: timeEnd,
      interViewerName: adminInfo?.name,
      interViewerEmail: adminInfo?.email,
      interViewerImage: adminInfo?.image,
    };

    console.log("check The Data", shortLists);
  };

  console.log("checked222", adminInfo);

  // fetch the applications number under the pagination
  const { data: jobapplicationsNum = [], refetch: refetchTotalApplyNumbs } =
    useQuery({
      queryKey: ["jobapplicationsNums", totalPages, currentPage],
      queryFn: async () => {
        const res = await axiosPublic.get("/job_applications_nums");
        setToalPages(Math.ceil(res?.data?.total / 6));
        return res?.data;
      },
    });
  console.log("total page num is", totalPages);
  // fetch the applications by pagination
  const {
    data: jobapplications = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["jobapplications", totalPages, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/job_applications?skip=${currentPage * 6}`
      );
      return res?.data;
    },
  });
  // console.log("ayay ayay population", jobapplications);

  // handle next btn pagination
  const handleRightPagi = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // handle previous btn pagination
  const handlePagiBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

  // delete operation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/job_applications/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Application Deleted successfully",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleSelectApplication = (id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You want to shortlist this application",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/application-status/${id}`, { status: "Confirmed" })
          .then((res) => {
            Swal.fire({
              title: "Successfully!",
              text: "Application shortlisted successfully.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // if(isFetching){
  //   return <Loading></Loading>
  // }

  const { data: applicationPreview } = useQuery({
    queryKey: ["getIndivisulItems", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/job_applications/${applicationId}`);
      return res?.data;
    },
  });

  // console.log("Indivisual37", applicationPreview);

  //handler Show more button
  const handlerShowMore = () => {
    setStoreLength(allAdmins?.length);
    setShow(true);
  };

  //
  const handlerShowLess = () => {
    setStoreLength(4);
    setShow(false);
  };

  return (
    <div className="py-10" id="manage_applications">
      {jobapplications.length > 0 ? (
        <div className="min-h-[460px] space-y-3">
          {jobapplications?.map((value) => (
            <ApplicationsCard
              key={value?._id}
              value={value}
              setStoreInfo={setStoreInfo}
              handleSelectApplication={handleSelectApplication}
              handleDelete={handleDelete}
              jobapplications={jobapplications}
              setApplicationId={setApplicationId}
              applicationPreview={applicationPreview}
            ></ApplicationsCard>
          ))}
        </div>
      ) : (
        <div className="min-h-[460px] space-y-3 flex justify-center items-center">
          <h4 className="text-xl font-semibold">
            There has not job applications
          </h4>
        </div>
      )}
      {/* pagination */}
      <div
        className={`mt-5 ${jobapplicationsNum?.total > 6 ? "block" : "hidden"}`}
      >
        <div className={`flex justify-center`}>
          <div className={`join flex space-x-2`}>
            <button
              onClick={handlePagiBack}
              style={{
                background: `${"#d0ceee"}`,
                color: "#433EBE",
                fontSize: "18px",
              }}
              className="join-item btn"
            >
              <IoIosArrowBack></IoIosArrowBack>
            </button>
            {pagesArray?.map((page, index) => {
              return (
                <button
                  onClick={() => setCurrentPage(page)}
                  key={index}
                  style={{
                    background: `${
                      currentPage == page ? "#433EBE" : "#d0ceee"
                    }`,
                    color: `${currentPage == page ? "#FFFFFF" : "#433EBE"}`,
                    borderRadius: "5px",
                    fontSize: "18px",
                  }}
                  className="join-item btn"
                >
                  {page + 1}
                </button>
              );
            })}
            <button
              onClick={handleRightPagi}
              style={{
                background: `${"#d0ceee"}`,
                color: "#433EBE",
                fontSize: "18px",
              }}
              className="join-item btn"
            >
              <IoIosArrowForward></IoIosArrowForward>
            </button>
          </div>
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_99" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/**Form Submit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <label className="font-bold font-inter"> Email Name</label>
              <input
                type="email"
                value={storeInfo?.email}
                {...register("email")}
                readOnly
                placeholder="Enter Email Name"
              />

              {/**Second Two Part */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Current Address field */}
                <label>
                  <div className="py-1">
                    <span className="font-bold font-inter">
                      {" "}
                      Your Start Time:
                    </span>
                  </div>
                  <div className="relative">
                    <DatePicker
                      value={selectedStartTime || "Select Start Time"}
                      selected={selectedStartTime}
                      onChange={(time) => setSelectedStartTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      required
                      dateFormat="h:mm aa"
                    />
                    <IoMdTime className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
                  </div>
                </label>
                {/* Current Address field End */}

                {/* Permanent Address */}
                <label>
                  <div className="py-1">
                    <span className="font-bold font-inter">Your End Time</span>
                  </div>
                  <div className="relative">
                    <DatePicker
                      value={selectedEndTime || "End Time Select"}
                      selected={selectedEndTime}
                      onChange={(time) => setSelectedEndTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      required
                      dateFormat="h:mm aa"
                    />
                    <IoMdTime className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
                  </div>
                </label>
              </div>

              {/*Event Date */}
              <label>
                <div className="py-1">
                  <span className="font-bold font-inter">Date Select</span>
                </div>

                <div className="relative">
                  <DatePicker
                    selected={selectDate}
                    onChange={(date) => setSelectDate(date)}
                    icon="fa fa-calendar"
                  />
                  <CiCalendar className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
                </div>
              </label>
              {/* Please Interviewer Select */}
              <label>
                <div className="py-1">
                  <span className="font-bold font-inter"> InterViewer:</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {allAdmins?.slice(0, storeLength)?.map((admin) => (
                    <div
                      key={admin._id}
                      className={` flex items-center border p-2 gap-3 cursor-pointer rounded-full hover:border-blue-600 ${
                        admin === adminInfo ? "border-blue-600" : ""
                      }`}
                      onClick={() => {
                        setAdminInfo({});
                        setAdminInfo(admin);
                        setDesign(true);
                      }}
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={admin?.image}
                        alt="dd"
                      />
                      <p>
                        {admin?.name.length > 12
                          ? admin?.name.slice(0, 12) + "..."
                          : admin?.name}{" "}
                      </p>
                    </div>
                  ))}
                </div>
                {/** condition Used Show less and show more */}
                <div className="mt-3">
                  {show ? (
                    <button
                      className="btn-sm bg-accent text-white rounded-md "
                      onClick={handlerShowLess}
                    >
                      Show Less
                    </button>
                  ) : (
                    <button
                      className="btn-sm bg-accent text-white rounded-md  "
                      onClick={handlerShowMore}
                    >
                      Show more
                    </button>
                  )}
                </div>
              </label>
              <p className="font-bold font-inter">Other info</p>
              <textarea
                className="w-full border pl-2 pt-2"
                name="info"
                id=""
                cols="10"
                rows="5"
                {...register("description")}
                placeholder="Please Share Another Information Optional"
              ></textarea>

              <button className="nbtn w-full"> Send Email</button>
            </div>
          </form>
        </div>
      </dialog>{" "}
    </div>
  );
};

export default ManageApplications;
