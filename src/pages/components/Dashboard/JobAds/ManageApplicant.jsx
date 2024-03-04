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
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import ManageApplicantSkeleton from "./ManageApplicantSkeleton";
import "../../../DashboardPages/EmployeePages/MyProfile/profile.css";

const ManageApplicant = () => {
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationId, setApplicationId] = useState(" ");
  const [individual, setIndividual] = useState("");

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

  // console.log("Indivisual37", applicationPreview);

  const axiosSecure = useAxiosSecure();

  const { data: usersId } = useQuery({
    queryKey: ["usersId", individual],
    enabled: !!individual,
    queryFn: async () => {
      // ToDo : replace mursalinmir02@gmail.com to user?.email
      const res = await axiosSecure.get(`/user-id?email=${individual}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const interViewInfo = {
      position: data?.position,
      salary: data?.salary,
      role: "employee",
    };

    axiosPublic
      .patch(`/confirm-employee/${usersId?._id}`, interViewInfo)
      .then((res) => {
        console.log(res?.data);

        axiosPublic
          .put(`/application-status/${applicationId}`, { status: "Selected" })
          .then((res) => {
            toast.success("Update Your Employee");
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  console.log("checked333", applicationId);
  if (isFetching) {
    return <ManageApplicantSkeleton></ManageApplicantSkeleton>;
  }
  return (
    <div className="py-10">
      {jobapplicants.length > 0 ? (
        <div className="min-h-[460px] space-y-3">
          {jobapplicants?.map((value) => (
            <ApplicantsCard
              key={value._id}
              value={value}
              setIndividual={setIndividual}
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
            There has not job applicants
          </h4>
        </div>
      )}
      {/* pagination */}
      <div
        className={`mt-10 ${jobapplicantsNum?.total > 6 ? "block" : "hidden"}`}
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
      {/** Modal Some DDDDDDDD */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_88" className="modal">
        <div className="modal-box max-w-[600px]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/**Form Submit */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="">
              <label className="font-semibold text-sm font-inter">
                Candidate Position
              </label>
              <input
                className="user_profile_input"
                type="text"
                {...register("position", { required: true })}
                placeholder="Enter Position Name"
              />
            </div>
            <div className="">
              <label className="font-semibold text-sm font-inter">
                Candidate Salary
              </label>
              <input
                className="user_profile_input"
                type="text"
                {...register("salary", { required: true })}
                placeholder="Enter Salary"
              />
            </div>
            <button className="nbtn-fixed-bg w-36 mt-7"> Confirem Now</button>
          </form>
        </div>
      </dialog>{" "}
    </div>
  );
};

export default ManageApplicant;
