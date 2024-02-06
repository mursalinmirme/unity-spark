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
  // const {data: users = [] } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () =>{
  //   const res = await  axiosPublic.get("/users");
  //   return res?.data;
  // }

  // })
  // const [showButtons, setShowButtons] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [userDataRole , setuserDataRole] = useState({})

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
    axiosPublic
      .delete(`/job_applications/${id}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Deleted!",
          text: "Application Deleted",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update role

  // const handleUpdateRole = (value) => {
  //   axiosPublic
  //     .put(`/users?email=${value?.email}`)
  //     .then((res) => {
  //       if (res?.data?.modifiedCount > 0) {
  //         Swal.fire({
  //           title: "Role Updated",
  //           text: `${value?.email} is now Employee`,
  //           icon: "success",
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             handleDelete(value._id);
  //           }
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleUpdateRole = (id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You want to Select for interview",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/application-status/${id}`, { status: "Confirmed" })
          .then((res) => {
            console.log(res.data);

            Swal.fire({
              title: "Successfully!",
              text: "Candidate Selected.",
              icon: "success",
            });
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

  const [applicationId, setApplicationId] = useState(" ");

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
      <div className="min-h-[460px] space-y-3">
        {jobapplications?.map((value) => (
          <ApplicationsCard
            key={value?._id}
            value={value}
            handleUpdateRole={handleUpdateRole}
            handleDelete={handleDelete}
            jobapplications={jobapplications}
            setApplicationId={setApplicationId}
            applicationPreview={applicationPreview}
          ></ApplicationsCard>
        ))}
      </div>

      {/* pagination */}
      <div
        className={`mt-5 ${jobapplicationsNum?.total > 5 ? "block" : "hidden"}`}
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
