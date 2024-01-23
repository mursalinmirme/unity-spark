import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { set } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const AvailableJobs = () => {
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);


    // fetch all jobs cards
    const { data:getTotalJobsNumber } = useQuery({
      queryKey: ['getTotalAdsNumbers'],
      queryFn: async () => {
        const result = await axios.get('http://localhost:5000/total-job-ads');
        setTotalPages(Math.ceil(result.data.length / 5));
        return result.data;
      }
    })

    // fetch all jobs cards
    const { data:allJobs, refetch } = useQuery({
      queryKey: ['allJobsAds', currentPage],
      queryFn: async () => {
        const result = await axios.get(`http://localhost:5000/job-ads?skip=${currentPage * 5}`);
        return result.data;
      }
    })


    const handleRightPagi = () => {
       if(currentPage + 1 < totalPages){
        setCurrentPage(currentPage + 1)
       }
    }

    const handlePagiBack = () => {
       if(currentPage > 0){
        setCurrentPage(currentPage - 1)
       }
    }



    const pagesArray = Array.from({length:totalPages}, (_, index) => index)
    console.log('kjkjk', pagesArray);

    // handle show search bar or hidden
    const handleDateOnchange = (date) => {
        console.log(date.target.value);
    }
    return (
        <div className="mt-6">
            {/* top */}
            <div className="flex justify-between items-center">
                <div className="space-x-2">
                    <select onChange={handleDateOnchange} className="border-2 border-primary p-1.5 text-primary font-medium rounded-lg space-y-2" name="" id="">
                        <option value="">Date</option>
                        <option value="1">Today</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last 7 days</option>
                        <option value="15">Last 15 days</option>
                        <option value="15">Last 30 days</option>
                    </select>
                    <select onChange={handleDateOnchange} className="border-2 border-primary p-1.5 text-primary font-medium rounded-lg" name="" id="">
                        <option value="">Job Type</option>
                        <option value="1">Today</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last 7 days</option>
                        <option value="15">Last 15 days</option>
                        <option value="15">Last 30 days</option>
                    </select>
                    <select onChange={handleDateOnchange} className="border-2 border-primary p-1.5 text-primary font-medium rounded-lg" name="" id="">
                        <option value="">Work Type</option>
                        <option value="1">Today</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last 7 days</option>
                        <option value="15">Last 15 days</option>
                        <option value="15">Last 30 days</option>
                    </select>
                </div>
                <div className="flex ">
                    <form className={`p-0 border-0 m-0 relative ${showSearchBar ? 'hidden' : 'visible'}`}> 
                        <input className="py-3 pr-14 m-0 w-80 border-second" type="text" />
                        <button className="absolute top-0 right-0 h-full rounded-none rounded-r-lg"><FaSearch className="text-lg"></FaSearch></button>
                    </form>
                    {
                        showSearchBar ? <button onClick={() => setShowSearchBar(false)} className="rounded-md h-[51.2px]"><FaSearch className="text-lg"></FaSearch></button> : 
                        <button onClick={() => setShowSearchBar(true)} className="rounded-none bg-none text-primary"><ImCross className="text-lg"></ImCross></button>
                    }
                    
                </div>
            </div>
            {/* middle */}
            <div>
                {/* card 1 */}
                {
                  allJobs?.map(job => {
                    return <div key={job?._id} className="job_post_card mt-6">
                    <div>
                      <h3 className="text-2xl">{job?.job_title}</h3>
                      <div className="job_status">
                        <span>{job?.job_category1}</span>
                        <span>{job?.job_category2}</span>
                      </div>
                      <div className="flex items-center gap-5 ">
                        <p>
                          {" "}
                          <strong>Salary:</strong> {job?.salary} per year
                        </p>
                        |
                        <p className="my-1">
                          {" "}
                          <strong>Posted:</strong> {moment(job?.createdAt).startOf('day').fromNow() }
                        </p>
                      </div>
                      <p>{job?.job_description.length > 250 ? job?.job_description.slice(0, 250) + '...' : job?.job_description }</p>
                      <div className="card-actions justify-start">
                        <button className="mt-3 mr-3">Apply Now</button>
                        <Link to={`/job-details/${job?._id}`}>
                          <div className="mt-3 mr-3 text-primary  cursor-pointer px-5 py-1.5 rounded-xl border-2 border-primary text-[15px]">
                            View Details
                          </div>
                        </Link>
                      </div>
                    </div>
                              </div>
                  })
                }
                
            </div>
            {/* bottom */}
            <div className="flex justify-center py-10">
              <div className="join flex space-x-2">
              <button onClick={handlePagiBack} style={{background: `${'#d0ceee'}`, color:"#433EBE", fontSize: '18px'}} className="join-item btn"><IoIosArrowBack></IoIosArrowBack></button>
                {
                  pagesArray?.map((page, index) => {
                    return <button onClick={() => setCurrentPage(page)} key={index} style={{background: `${currentPage == page ? '#433EBE' : '#d0ceee'}`, color:`${currentPage == page ? '#FFFFFF' : '#433EBE'}`, fontSize: '18px'}} className="join-item btn">{page}</button>
                  })
                }
                <button onClick={handleRightPagi} style={{background: `${'#d0ceee'}`, color:"#433EBE", fontSize: '18px'}} className="join-item btn"><IoIosArrowForward></IoIosArrowForward></button>

              </div>
            </div>
        </div>
    );
};

export default AvailableJobs;