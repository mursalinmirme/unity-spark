import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdTime } from "react-icons/io";
// import { IoEyeOutline } from "react-icons/io5";
// import { IoCheckmark } from "react-icons/io5";
// import { RxCross1 } from "react-icons/rx";
// import { HiDotsVertical } from "react-icons/hi";
// import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ApplicantsCard from "../ApplicantsCard";
import DatePicker from "react-datepicker";
import useTimePicker from "../../../../hooks/useTimePicker";

const ManageApplicant = () => {
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationId, setApplicationId] = useState(" ");

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { data: jobapplicantsNum = [], refetch: refetchjobapplicantsNum } =
    useQuery({
      queryKey: ["jobapplicantsNums", totalPages, currentPage],
      queryFn: async () => {
        const res = await axiosPublic.get("/job_applicants_nums");
        setToalPages(Math.ceil(res?.data?.total / 6));
        return res?.data;
      },
    });
  // fetch the applications by pagination
  const {
    data: jobapplicants = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["jobapplicants", totalPages, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/job_applicants?skip=${currentPage * 6}`
      );
      return res?.data;
    },
  });
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
      text: "You want to delete this applicants!",
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
              text: "Applicant Deleted successfully",
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

  // update role

  const handleUpdateRole = (value, appli_id) => {
    console.log("new emaployee email is", value, appli_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user as a employee",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/users?email=${value}`)
          .then((res) => {
            console.log(
              "user role update info is and next id is",
              res.data,
              appli_id
            );
            axiosPublic
              .put(`/application-status/${appli_id}`, { status: "Selected" })
              .then((res) => {
                Swal.fire({
                  title: "Make Employee Successfully",
                  text: `${value} is now Employee`,
                  icon: "success",
                });
                refetch();
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
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

  console.log("Indivisual37", applicationPreview);

  // if(isFetching){
  //   return <Loading></Loading>
  // }
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const timeStart = useTimePicker(selectedStartTime || null);
  const timeEnd = useTimePicker(selectedEndTime || null);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form?.email.value;
    const info = form?.info?.value;
    console.log(email, info);
    console.log("start", timeStart, "end", timeEnd);
  };

  return (
    <div className="py-10">
      {jobapplicants.length > 0 ? (
        <div className="min-h-[460px] space-y-3">
          {jobapplicants?.map((value) => (
            <ApplicantsCard
              key={value._id}
              value={value}
              handleUpdateRole={handleUpdateRole}
              handleDelete={handleDelete}
              setApplicationId={setApplicationId}
              applicationPreview={applicationPreview}
            ></ApplicantsCard>
          ))}
        </div>
      ) : (
        <div className="min-h-[460px] space-y-3 flex justify-center items-center">
          <h4 className="text-xl font-semibold">
            There has not job applications Yes No Problem
          </h4>
        </div>
      )}
      {/* pagination */}
      <div
        className={`mt-10 ${jobapplicantsNum?.total > 6 ? "block" : "hidden"}`}
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
      {/* <div className="border border-red-800 flex justify-between p-2 items-center">
        <h2> React Developer </h2>
        <button
          onClick={() => document.getElementById("my_modal_99").showModal()}
          className="nbtn"
        >
          {" "}
          Invited Interview
        </button>
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
          <form onSubmit={handlerSubmit}>
            <div className="space-y-3">
              <label className="font-bold font-inter"> Email Name</label>
              <input type="email" name="email" placeholder="Enter Email Name" />

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

              <p className="font-bold font-inter">Date</p>
              <input
                type="date"
                name="date"
                placeholder="Please Select Date"
                id=""
              />

              <p className="font-bold font-inter">Other info</p>
              <textarea
                className="w-full border pl-2 pt-2"
                name="info"
                id=""
                cols="10"
                rows="5"
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

export default ManageApplicant;
