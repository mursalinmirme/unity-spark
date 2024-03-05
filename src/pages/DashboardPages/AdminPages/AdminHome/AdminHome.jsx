import { GoTasklist } from "react-icons/go";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { LuBellRing, LuCalendarClock, LuUserCheck } from "react-icons/lu";
import { PiPaypalLogo } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";
import NewsletterChart from "./NewsletterChart";
import NewUsersTable from "./NewUsersTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useEvents from "../../../../hooks/useEvents";
import moment from "moment";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const {events} = useEvents()

    const { data: today_presented, isFetching } = useQuery({
        queryKey: ["today_presented"],
        queryFn: async () => {
          const result = await axiosSecure.get("/today-presented");
          return result.data;
        },
    });
    const { data: running_tasks, isFetching: isTaskFetching } = useQuery({
        queryKey: ["running_tasks"],
        queryFn: async () => {
          const result = await axiosSecure.get("/running-tasks");
          return result.data;
        },
    });
    const { data: job_applicant_count, isFetching: isJobFetching } = useQuery({
        queryKey: ["job_applicant_count"],
        queryFn: async () => {
          const result = await axiosSecure.get("/job_applicants_nums");
          return result.data;
        },
    });

    let upcomingEventCount = 0
    events?.forEach(event => {
        const date = moment(event?.date)
        const today = moment();
        if (date.isSame(today, 'day')) {
            upcomingEventCount + 0
        } else if (date.isBefore(today, 'day')) {
            upcomingEventCount + 0
        } else {
            upcomingEventCount++
        }
    })

    return (
        <div>
            <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-b-4 pb-5">
                {/* Total Present */}
                <div className="font-inter bg-[#C7C5EB] py-5 rounded-xl space-y-2">
                    <div className="flex justify-center">
                        <HiOutlinePresentationChartLine className="text-4xl text-primary" />
                    </div>
                    <p className="font-bold text-4xl text-primary">
                        {today_presented ? today_presented?.count : 0}
                    </p>
                    <p className="text-primary font-semibold text-[19px]">
                        Today{"'"}s Employee
                    </p>
                </div>

                {/* Event Joined */}
                <div className="font-inter bg-[#46A3E14D] py-5 rounded-xl space-y-2">
                    <div className="flex justify-center">
                        <LuCalendarClock className="text-4xl text-[#46A3E1]"></LuCalendarClock>
                    </div>
                    <p className="font-medium font-inter text-4xl text-[#46A3E1]">
                        {upcomingEventCount ? upcomingEventCount : 0}
                    </p>
                    <p className="text-[#46A3E1] font-semibold text-[19px]">Upcoming Events</p>
                </div>

                {/* Task Completed */}
                <div className="font-inter bg-[#7209B74D] py-5 rounded-xl space-y-2">
                    <div className="flex justify-center">
                        <GoTasklist className="text-4xl text-[#7209B7]"></GoTasklist>
                    </div>
                    <p className="font-bold text-4xl text-[#7209B7]">
                        {running_tasks? running_tasks?.count : 0}
                    </p>
                    <p className="text-[#7209B7] font-semibold text-[19px]">
                        Running Tasks
                    </p>
                </div>

                {/* Job Posts */}
                <div className="font-inter bg-[#4361EE4D] py-5 rounded-xl space-y-2">
                    <div className="flex justify-center">
                        <LuUserCheck className="text-4xl text-[#4361EE]"></LuUserCheck>
                    </div>
                    <p className="font-bold text-4xl text-[#4361EE]">
                        {job_applicant_count? job_applicant_count.total : 0}
                    </p>
                    <p className="text-[#4361EE] font-semibold text-[19px]">
                        Chosen Candidate
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-10 mt-8">
                <div className="col-span-2">
                    <NewsletterChart></NewsletterChart>
                </div>
                <div className="space-y-5">
                    <div className="rounded-xl p-4 flex items-start gap-3" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                        <div className="bg-[#C7C5EB] p-2 rounded-xl">
                            <PiPaypalLogo className="text-2xl text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold font-inter text-3xl text-slate-800">
                                <span className="font-medium">$</span>10000
                            </p>
                            <p className="text-slate-700 font-semibold text-[19px]">
                                Overall Expenses
                            </p>
                        </div>
                    </div>
                    <div className="rounded-xl p-4 flex items-start gap-3" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                        <div className="bg-[#C7E3F6] p-2 rounded-xl">
                            <RiUser3Line className="text-2xl text-second" />
                        </div>
                        <div>
                            <p className="font-semibold font-inter text-3xl text-slate-800">
                                <span className="font-medium"></span>350
                            </p>
                            <p className="font-semibold text-[19px] text-slate-700">
                                New Users
                            </p>
                        </div>
                    </div>
                    <div className="rounded-xl p-4 flex items-start gap-3" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                        <div className="bg-[#D4B5E9] p-2 rounded-xl">
                            <LuBellRing className="text-2xl text-[#7209B7]" />
                        </div>
                        <div>
                            <p className="font-semibold font-inter text-3xl text-slate-800">
                                <span className="font-medium"></span>100
                            </p>
                            <p className="font-semibold text-[19px] text-slate-700">
                                New Subscriber
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <NewUsersTable></NewUsersTable>
            </div>
        </div>
    );
};

export default AdminHome;