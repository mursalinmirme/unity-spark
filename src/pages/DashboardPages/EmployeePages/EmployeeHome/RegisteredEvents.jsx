/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const RegisteredEvents = ({EmployeeReqEvent}) => {


 
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-3">Registered Events</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1st Card */}
      {EmployeeReqEvent.map(information =>   <div key={information._id} className="border-2  bg-[#F7F7F7] rounded-xl px-2 md:px-5 py-2 space-y-4">
          <div className="flex items-center justify-between ">
            <div>
              <h2 className="text-[18px] font-bold">{information?.reqeventName}</h2>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <span className="border px-4 bg-[#DFDFDF] p-1 rounded-lg font-bold">
               {information?.reqeventDate}
              </span>
            </div>
            <div>
              <span className="border px-4 bg-[#DFDFDF] p-1 rounded-lg font-bold">
                {information?.reqeventStartTime}
              </span>
            </div>
          </div>
        </div>)}

       
      </div>
    </div>
  );
};

export default RegisteredEvents;
