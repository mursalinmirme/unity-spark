/* eslint-disable no-constant-condition */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { CiCalendar } from "react-icons/ci";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoMdTime } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useTimePicker from "../../../../hooks/useTimePicker";
import ApplicationsCard from "./ApplicationsCard";
import ManageApplicationsSkeleton from "./ManageApplicationsSkeleton";
import { toast } from "sonner";
import "../../../DashboardPages/EmployeePages/MyProfile/profile.css";
const ManageApplications = () => {
  const axiosPublic = useAxiosPublic();
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationId, setApplicationId] = useState(" ");
  const [storeInfo, setStoreInfo] = useState({});
  const [adminInfo, setAdminInfo] = useState({});
  const [show, setShow] = useState(false);
  const [storeLength, setStoreLength] = useState(4);
  const [selectDate, setSelectDate] = useState(new Date());
  const [isPosting, setIsPosting] = useState(false);
  const date = new Date(selectDate);
  const [design, setDesign] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "long" });
  const year = date.getFullYear();
  let deted = `${day},${month}, ${year}`;
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const timeStart = useTimePicker(selectedStartTime || null);
  const timeEnd = useTimePicker(selectedEndTime || null);

  const { register, handleSubmit } = useForm();
  // All Admin Get
  const { data: allAdmins } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-admins");
      return res?.data;
    },
  });
  // fetch the applications number under the pagination
  const { data: jobapplicationsNum = [] } = useQuery({
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

  // My Working Modal
  const onSubmit = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsPosting(true);
    if (!adminInfo?.name) {
      setErrorMsg("Please select the interviewer");
      setIsPosting(false);
      return;
    }
    if (selectedStartTime === null) {
      setErrorMsg("Please select start time");
      setIsPosting(false);
      return;
    }
    if (selectedEndTime === null) {
      setErrorMsg("Please select end time");
      setIsPosting(false);
      return;
    }
    const interview = {
      candidateName: storeInfo?.name,
      candidateEmail: storeInfo?.email,
      candidateImage: storeInfo?.image,
      date: deted,
      position: storeInfo?.title,
      startTime: timeStart,
      endTime: timeEnd,
      interViewerName: adminInfo?.name,
      interViewerEmail: adminInfo?.email,
      interViewerImage: adminInfo?.image,
    };
    axiosPublic
      .post("/interviews", interview)
      .then(() => {
        const sendEmail = {
          name: storeInfo?.name,
          to: storeInfo?.email,
          position: storeInfo?.title,
          date: deted,
          start: timeStart,
          end: timeEnd,
        };
        console.log("la ki ko ja ji do", sendEmail);
        axiosPublic
          .post("/sent-invite-email", sendEmail)
          .then(() => {
            axiosPublic
              .put(`/application-status/${storeInfo?._id}`, {
                status: "Confirmed",
              })
              .then(() => {
                setSuccessMsg("Invitation email sent successfully.");
                setIsPosting(false);
              })
              .catch((erro) => {
                setIsPosting(false);
                setErrorMsg(erro.message);
              });
          })
          .catch((error) => {
            setErrorMsg(error.message);
            setIsPosting(false);
          });
      })
      .catch((err) => {
        setErrorMsg(err.data);
        setIsPosting(false);
      });
    console.log("I got  the full array", interview);
  };

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
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Application Deleted successfully",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  const { data: applicationPreview } = useQuery({
    queryKey: ["getIndivisulItems", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/job_applications/${applicationId}`);
      return res?.data;
    },
  });

  console.log("hello check form mursalin", applicationPreview);

  //handler Show more button for admin select
  const handlerShowMore = () => {
    setStoreLength(allAdmins?.length);
    setShow(true);
  };

  // handler show less button for admins select
  const handlerShowLess = () => {
    setStoreLength(4);
    setShow(false);
  };

  if (isFetching) {
    return <ManageApplicationsSkeleton></ManageApplicationsSkeleton>;
  }
  return (
    <div className="py-10" id="manage_applications">
      {jobapplications.length > 0 ? (
        <div className="min-h-[460px] space-y-3">
          {jobapplications?.map((value) => (
            <ApplicationsCard
              key={value?._id}
              value={value}
              setStoreInfo={setStoreInfo}
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
          <div className={`join flex space-x-3`}>
            <button
              onClick={handlePagiBack}
              className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${currentPage === 0 ? 'text-[#ffffff] bg-[#d9d9db]':'bg-[#d0ceee] text-[#433EBE]'}`}
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
                  className="join-item px-3 h-8 md:px-4 md:h-10 font-semibold"
                >
                  {page + 1}
                </button>
              );
            })}
            <button
              onClick={handleRightPagi}
              className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${totalPages === currentPage + 1 ? 'text-[#ffffff] bg-[#d9d9db]':'bg-[#d0ceee] text-[#433EBE]'}`}
            >
              <IoIosArrowForward></IoIosArrowForward>
            </button>
          </div>
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_99" className="modal">
        <div className="modal-box max-w-[700px]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/**Form Submit */}
          {errorMsg && (
            <p className="text-red-600 py-2 text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-600 font-semibold text-base py-2 text-center">
              {successMsg}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label className="font-semibold text-sm font-inter">
                Candidate email
              </label>
              <input
                className="user_profile_input"
                type="email"
                value={storeInfo?.email}
                {...register("email")}
                readOnly
                placeholder="Enter Email Name"
              />

              {/**Second Two Part */}
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {/* Current Address field */}
                <label>
                  <div className="">
                    <span className="font-semibold text-sm font-inter">
                      Start Time:
                    </span>
                  </div>
                  <div className="relative">
                    <DatePicker
                      className="user_profile_input"
                      value={selectedStartTime || "Select start time"}
                      selected={selectedStartTime}
                      onChange={(time) => setSelectedStartTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      required
                      dateFormat="h:mm aa"
                    />
                    <IoMdTime className="absolute text-xl top-3 lg:top-4 right-2 cursor-pointer" />
                  </div>
                </label>
                {/* Current Address field End */}

                {/* Permanent Address */}
                <label>
                  <div className="">
                    <span className="font-semibold text-sm font-inter">
                      End Time
                    </span>
                  </div>
                  <div className="relative">
                    <DatePicker
                      className="user_profile_input"
                      value={selectedEndTime || "Select end time"}
                      selected={selectedEndTime}
                      onChange={(time) => setSelectedEndTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      required
                      dateFormat="h:mm aa"
                    />
                    <IoMdTime className="absolute text-xl top-4 lg:top-4 right-2 cursor-pointer" />
                  </div>
                </label>
              </div>

              {/*Event Date */}
              <div className="mt-3">
                <span className="font-semibold text-sm font-inter">
                  Date Select
                </span>
              </div>
              <div className="relative">
                <DatePicker
                  className="user_profile_input"
                  selected={selectDate}
                  onChange={(date) => setSelectDate(date)}
                  icon="fa fa-calendar"
                />
                <CiCalendar className="absolute text-xl top-4 lg:top-4 right-2 cursor-pointer" />
              </div>
              {/* Please Interviewer Select */}
              <div className="mt-4">
                <span className="font-semibold text-sm font-inter">
                  {" "}
                  Interviewer:
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                {allAdmins?.slice(0, storeLength)?.map((admin) => (
                  <div
                    key={admin._id}
                    className={` flex items-center border p-2 gap-3 cursor-pointer rounded-full hover:border-blue-600 ${
                      admin === adminInfo
                        ? "border-primary font-medium  text-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setAdminInfo({});
                      setAdminInfo(admin);
                      setDesign(true);
                    }}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={admin?.image}
                      alt="dd"
                    />
                    <p>
                      {admin?.name.length > 18
                        ? admin?.name.slice(0, 18) + "..."
                        : admin?.name}{" "}
                    </p>
                  </div>
                ))}
              </div>
              {/** condition Used Show less and show more */}
              <div
                className={`text-center mt-3 ${
                  allAdmins?.length > 4 ? "block" : "hidden"
                }`}
              >
                {show ? (
                  <p
                    className="btn-sm text-white rounded-md flex justify-center items-center"
                    onClick={handlerShowLess}
                  >
                    <FiMinusCircle className="text-primary text-3xl" />
                  </p>
                ) : (
                  <p
                    className="btn-sm text-white rounded-md flex justify-center items-center"
                    onClick={handlerShowMore}
                  >
                    <FiPlusCircle className="text-3xl text-primary" />
                  </p>
                )}
              </div>
              <button className="nbtn-fixed-bg w-full mt-7">
                {isPosting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Send Invitation"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>{" "}
    </div>
  );
};

export default ManageApplications;
