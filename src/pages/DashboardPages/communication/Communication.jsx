import { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import useChatFriend from "../../../hooks/useChatFriend";
import { AuthContext } from "../../../Provider/AuthProvider";
import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useEmployees from "../../../hooks/useEmployees";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Communication = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const {allEmployees} = useEmployees()
    const [selectedChat, setSelectedChat] = useState(13)
    const [selectedUserEmail, setSelectedUserEmail] = useState('')
    const {user} = useContext(AuthContext);
    const [value, setValue] = useState('')
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()

    const searchedEmployees = allEmployees?.filter(employee => employee.name.toLowerCase().includes(searchValue?.toLowerCase()))

    useEffect(() => {
        setSelectedUserEmail(allEmployees[13]?.email)
    }, [allEmployees])

    const { data: messages = [], isPending } = useQuery({
        queryKey: ["chat_message", user?.email, selectedUserEmail],
        // enabled: !!user?.email && !!selectedUserEmail,
        queryFn: async () => {
          const res = await axios.get(`http://localhost:5000/chat?sender_email=${user?.email}&reciever_email=${selectedUserEmail}`);
          return res.data;
        },
    });
    
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
            <div className="grid grid-cols-6 gap-3 bg-[#ececf8] p-2 rounded-lg overflow-hidden">
                <div className="col-span-2 bg-white p-2 rounded-lg">
                    <div className="flex items-center justify-between relative">
                        <h2 className="font-inter font-bold text-2xl">Chats</h2>
                        <div className={`flex items-center justify-between border-2 rounded-lg p-1 bg-white absolute ${showSearchBar ? 'top-0' : '-top-14'} right-0 w-full transition-all duration-700`}>
                            <input onChange={e => setSearchValue(e.target.value)} type="text" className="border-0 m-0 outline-none pl-1 w-full" />      
                            <button type="submit" className={`bg-red-500 text-white p-1 rounded-lg`} onClick={() => {
                                setShowSearchBar(false)
                                setSearchValue(null)
                            }}>
                                <RxCross2 className="text-lg" />
                            </button>
                        </div>
                        <button type="submit" className={`bg-primary text-white p-1.5 rounded-lg transition-all duration-700 ${showSearchBar ? '-mt-32' : 'mt-0'}`} onClick={() => setShowSearchBar(true)}>
                            <IoIosSearch className="text-lg" />
                        </button>
                    </div>
                    <hr className="my-3 border border-slate-300" />
                    <div className={`p-2 -mt-3 rounded-b-lg space-y-3 ${searchValue ? 'block' : 'hidden'}`} style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'}}>
                        {
                            searchedEmployees && searchedEmployees?.map(employee => (
                                <div key={employee._id} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all`}>
                                    <img src={employee?.image} className="w-12 h-12 rounded-full" alt="" />
                                    <div>
                                        <h3 className="font-inter font-semibold text-[17px]">{employee?.name}</h3>
                                        <h4 className="font-inter text-sm font-medium">{employee?.position}</h4>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid gap-3">
                        {
                            allEmployees && allEmployees?.map((friend, idx) =>(
                                <div key={idx} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${selectedChat === idx ? 'bg-[#ececf8]' : ''}`} onClick={() => {
                                    setSelectedChat(idx)
                                    setSelectedUserEmail(friend?.email)
                                }}>
                                    <img src={friend?.image} className="w-12 h-12 rounded-full" alt="" />
                                    <div>
                                        <h3 className="font-inter font-semibold text-[17px]">{friend?.name}</h3>
                                        <h4 className="font-inter text-sm font-medium">{friend?.position}</h4>
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
                

                <div className="col-span-4 bg-white rounded-lg relative">
                    <div className={`flex gap-3 items-center p-3`}>
                        <img src="https://i.ibb.co/ByK4Hpd/founder-4.jpg" className="w-12 h-12 rounded-full" alt="" />
                        <div>
                            <h3 className="font-inter font-semibold text-[17px]">Ashraful Islam</h3>
                            <h4 className="font-inter text-sm font-medium">React Developer</h4>
                        </div>
                    </div>
                    <hr className="my-1 border border-slate-300" />
                    <div className="p-4 space-y-1.5">
                        {
                            messages && messages?.map(message => (
                                <div key={message._id} className={`flex w-full ${message.sender === user?.email ? 'justify-end' : 'justify-srart'}`}>
                                    <div className={`px-2 py-1 rounded-lg max-w-3/4 ${message.sender === user?.email ? 'bg-[#c7e3f6]' : 'bg-[#c7c5eb]'}`}>
                                        <span className="font-medium font-inter">{message.message}</span>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>

                    {/* MESSAGE INPUT */}
                    <div className="px-4 absolute w-full bottom-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-lg flex items-center justify-between p-1">
                            <input {...register("message", { required: true })} onChange={e => setValue(e.target.value)} type="text" className="border-none mt-0 p-0 pl-2" placeholder="Enter your message" />
                            <button type="submit" className={`text-white bg-primary px-2 py-1.5 rounded-lg`}>
                                <AiOutlineSend className="text-lg" />
                            </button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Communication;