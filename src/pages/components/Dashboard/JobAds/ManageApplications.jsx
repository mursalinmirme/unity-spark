/* eslint-disable no-constant-condition */
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { IoEyeOutline } from "react-icons/io5";
// import { IoCheckmark } from "react-icons/io5";
// import { RxCross1 } from "react-icons/rx";
// import { HiDotsVertical } from "react-icons/hi";
// import { Link } from "react-router-dom";
// import { CiMenuKebab } from "react-icons/ci";
// import { MdHideSource } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ApplicationsCard from "./ApplicationsCard";
import Loading from "../../Loading/Loading";

const ManageApplications = () => {
  const axiosPublic = useAxiosPublic();
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationId, setApplicationId] = useState(" ");
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
  console.log("ayay ayay population", jobapplications);

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

  console.log("Indivisual37", applicationPreview);

  return (
    <div className="py-10" id="manage_applications">
      {jobapplications.length > 0 ? (
        <div className="min-h-[460px] space-y-3">
          {jobapplications?.map((value) => (
            <ApplicationsCard
              key={value?._id}
              value={value}
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
    </div>
  );
};

export default ManageApplications;
