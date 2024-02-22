import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useEmployees from "../../../hooks/useEmployees";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmployeeContainer from "./EmployeeContainer";

const Communication = () => {
    const [selectedChat, setSelectedChat] = useState(null)
    const [selectedUserEmail, setSelectedUserEmail] = useState('')
    const {user} = useContext(AuthContext);
    const {allEmployees} = useEmployees()
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()
    const [messages, setMessages] = useState([])
    
     
    const employees =  allEmployees?.filter(employee => employee?.email !== user?.email)  
    const selectedEmployee = employees?.find(employee => employee.email === selectedUserEmail)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            axiosSecure.get(`/chat?sender_email=${user?.email}&reciever_email=${selectedUserEmail}`)
            .then(res => {
                setMessages(res.data)
            })
        }, 100)

        return () => clearTimeout(timeOut)        
    })

    
    
    
    const onSubmit = (data) => {
        const messageInfo = {
            message: data.message,
            reciever: selectedUserEmail,
            sender: user?.email
        }
        axiosSecure.post('/chat', messageInfo)
        .then(() => {
            reset();
        })
    }


    return (
        <div>
            <div className="grid grid-cols-6 gap-3 bg-[#ececf8] p-2 rounded-lg overflow-hidden" style={{height: 'calc(100vh - 20vh)'}}>
                <EmployeeContainer 
                    setSelectedUserEmail={setSelectedUserEmail}
                    setSelectedChat={setSelectedChat}
                    user={user}
                    selectedChat={selectedChat}
                    employees={employees}
                ></EmployeeContainer>
                
                {
                    selectedChat === null ? 
                    <div className="col-span-4 bg-white rounded-lg flex flex-col justify-center">
                        <h2 className="my-10 text-2xl font-semibold text-center font-inter">Please Select a User to Start Conversation</h2>
                    </div>
                    :
                    <div className="col-span-4 bg-white rounded-lg relative overflow-y-hidden flex flex-col justify-between" style={{height: 'calc(100% - 2px)'}}>
                        <div className="h-20">
                            <div className={`flex gap-3 items-center p-3`}>
                                <img src={selectedEmployee?.image} className="w-12 h-12 rounded-full" alt="" />
                                <div>
                                    <h3 className="font-inter font-semibold text-[17px]">{selectedEmployee?.name}</h3>
                                    <h4 className="font-inter text-sm font-medium">{selectedEmployee?.position}</h4>
                                </div>
                            </div>
                            <hr className="my-1 border border-slate-300" />
                        </div>
                        
                        <div className="p-4 h-full overflow-y-auto flex flex-col-reverse">
                            {
                                messages && messages.length > 0 ? messages?.map(message => (
                                    <div key={message._id} className={`flex w-full ${message.sender === user?.email ? 'justify-end' : 'justify-srart'}`}>
                                        <div className={`mt-1.5 px-2 py-1 rounded-lg max-w-3/4 ${message.sender === user?.email ? 'bg-[#c7e3f6]' : 'bg-[#c7c5eb]'}`}>
                                            <span className="font-medium font-inter">{message.message}</span>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="h-full flex flex-col justify-center">
                                    <h2 className="text-2xl font-semibold text-center font-inter">No Conversation Found</h2>
                                </div>
                            }
                        </div>

                        {/* MESSAGE INPUT */}
                        <div className="p-3 bg-white h-[70px]">
                            <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-lg flex items-center justify-between p-1">
                                <input onKeyDown={e => {
                                    if(e.key === 'Enter'){
                                        handleSubmit(onSubmit)
                                    }
                                }} {...register("message", { required: true })} type="text" className="border-none mt-0 p-0 pl-2" placeholder="Enter your message" />
                                <button type="submit" className={`text-white bg-primary px-2 py-1.5 rounded-lg`}>
                                    <AiOutlineSend className="text-lg" />
                                </button>
                            </form>
                        </div>                    
                    </div>
                }
                
            </div>
        </div>
    );
};

export default Communication;