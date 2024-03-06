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
import useUsers from "../../../../hooks/useUsers";
import useNewsletterSubscriber from "../../../../hooks/useNewsletterSubscriber";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const {events} = useEvents()
    const {allUsers} = useUsers()
    const {subscribers} = useNewsletterSubscriber()
    let upcomingEventCount = 0
    let newUsers = 0

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

    const { data: new_subscriber, isFetching: isSubcriberFetching } = useQuery({
        queryKey: ["new-subscriber"],
        queryFn: async () => {
          const result = await axiosSecure.get("/new-subscriber");
          return result.data;
        },
    });

    const { data: getAllExpense, isFetching: isallExpenseFetching } = useQuery({
        queryKey: ["getAllExpense"],
        queryFn: async () => {
          const result = await axiosSecure.get("/total-expenses");
          return result.data;
        },
    });


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

    

    allUsers?.forEach(user => {
        const month = moment(user?.createdAt).month()
        const currentMonth = moment().month();
        if(month === currentMonth){
            newUsers++
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

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 md:gap-y-10 md:gap-x-0 lg:gap-10 mt-8">
                <div className="col-span-1 md:col-span-2">
                    <NewsletterChart subscribers={subscribers}></NewsletterChart>
                </div>
                <div className="space-y-5 md:space-y-0 lg:space-y-5 flex flex-col md:flex-row lg:flex-col  justify-between">
                    <div className="rounded-xl p-4 flex items-start gap-3" style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                        <div className="bg-[#C7C5EB] p-2 rounded-xl">
                            <PiPaypalLogo className="text-2xl text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold font-inter text-3xl text-slate-800">
                                <span className="font-medium">$</span>{getAllExpense?.employeeCost + getAllExpense?.othersPaymentsCost}
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
                                {newUsers}
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
                                {new_subscriber?.count}
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