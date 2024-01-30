import { useEffect, useState } from "react";

const Attendance = () => {
    const [weekName, setWeekName] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long' };
        const currentWeekName = today.toLocaleDateString('en-US', options);
        let hours = today.getHours();
      const minutes = today.getMinutes();
      const meridiem = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12; 
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${meridiem}`;
        setWeekName(currentWeekName);
        setCurrentTime(formattedTime)
      }, []);
    return (
        <div>
           <h1 className="text-center text-[40px] font-bold text-[#1E1E1E]">Effortlessly log your presence for work.</h1>
           <h1 className="text-center text-[25px] font-semibold text-[#1E1E1E] my-5">Mark Your Attendance - Time to Clock In</h1>
           <div className="border-2 border-[#D9D9D9] p-5 rounded-md space-y-5">
                <section className="flex justify-center">
                <img src="https://i.ibb.co/x2WP2jQ/73886110a00aca5829ed3e9b6ca8b3e3.png" alt="pp" 
                className="w-20 h-20 rounded-full" />
                </section>
                <h1 className="text-3xl font-semibold text-center">Ashraful Islam</h1>
                <h1 className="text-xl font-medium text-center">developerashrafulislamrifaz@gmali.com</h1>
                <h1 className="text-center text-xl font-medium"><span className="font-semibold">Day:</span> {weekName} </h1>
                <h1 className="text-center text-xl font-medium"><span className="font-semibold">Time:</span> {currentTime}</h1>
                <h1 className="text-center text-xl font-medium"><span className="font-semibold">Total Presented:</span> 10 day </h1>
                <h1 className="text-center text-xl font-medium"><span className="font-semibold">Today Presented:</span> 10day</h1>

                <section className="flex gap-7 items-center justify-center">
                   <a className="rounded-xl px-8 py-2 bg-[#433EBE] text-white font-semibold">Present</a>
                   <a className="rounded-xl px-8 py-2 bg-[#433EBE] text-white font-semibold">Absent</a>
                </section>
           </div>
        </div>
    );
};

export default Attendance;