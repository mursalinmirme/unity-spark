import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import MessageForm from "./MessageForm";

const CommunicationForMobile = ({showSearchBar, setSearchValue, setShowSearchBar, searchValue, searchedEmployees, setSelectedUserEmail, setSelectedChat, sortedEmployees, remainingEmployees, selectedChat, selectedEmployee, messages, user, selectedUserEmail}) => {    
    const [showChat, setShowChat] = useState(false)

    return (
        <div className="grid grid-cols-1 gap-3 bg-[#ececf8] p-2 rounded-lg overflow-hidden" style={{height: 'calc(100vh - 20vh)'}}>
            <div className={`bg-white p-2 rounded-lg overflow-y-hidden flex-col ${showChat ? 'hidden' : 'flex'}`} style={{height: 'calc(100% - 2px)'}}>
                <div className="h-14">
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
                </div>

                {/* SEARCHED EMPLOYEES */}
                <div className={`p-2 -mt-3 rounded-b-lg space-y-3 h-auto ${searchValue ? 'block' : 'hidden'}`} style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'}}>
                    {
                        searchedEmployees && searchedEmployees?.length > 0 ? searchedEmployees?.map(employee => (
                            <div onClick={() => {
                                setSelectedUserEmail(employee?.email)
                                setSelectedChat(employee?._id)
                                setShowSearchBar(false)
                                setSearchValue(null)
                                setShowChat(true)
                            }} key={employee._id} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all`}>
                                <img src={employee?.image} className="w-12 h-12 rounded-full" alt="" />
                                <div>
                                    <h3 className="font-inter font-semibold text-[17px]">{employee?.name?.length > 15 ? employee?.name?.slice(0, 15) + '...' : employee?.name}</h3>
                                    <h4 className="font-inter text-sm font-medium">{employee?.position?.length > 20 ? employee?.position?.slice(0, 20) + '...' : employee?.position}</h4>
                                </div>
                            </div>
                        ))
                        :
                        <h2 className="font-semibold text-center font-inter my-1">No Employee Found</h2>
                    }
                </div>
                <div className="grid gap-3 overflow-y-auto">
                    <h2 className="font-inter font-semibold">Your Friends</h2>
                    {
                        sortedEmployees && sortedEmployees?.map((friend, idx) =>(
                            <div key={idx} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${selectedChat === friend?._id ? 'bg-[#ececf8]' : ''}`} onClick={() => {
                                setSelectedChat(friend?._id)
                                setSelectedUserEmail(friend?.email)
                                setShowChat(true)
                            }}>
                                <img src={friend?.image} className="w-12 h-12 rounded-full" alt="" />
                                <div>
                                    <h3 className="font-inter font-semibold text-[17px]">{friend?.name?.length > 15 ? friend?.name?.slice(0, 15) + '...' : friend?.name}</h3>
                                    <h4 className="font-inter text-sm font-medium">{friend?.position?.length > 20 ? friend?.position?.slice(0, 20) + '...' : friend?.position}</h4>
                                </div>
                            </div>
                            
                        ))
                    }
                    <hr className="my-1 border border-slate-300" />
                    <h2 className="font-inter font-semibold">Make More Friends</h2>
                    {
                        remainingEmployees && remainingEmployees?.map((friend, idx) =>(
                            <div key={idx} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${selectedChat === friend?._id ? 'bg-[#ececf8]' : ''}`} onClick={() => {
                                setSelectedChat(friend?._id)
                                setSelectedUserEmail(friend?.email)
                                setShowChat(true)
                            }}>
                                <img src={friend?.image} className="w-12 h-12 rounded-full" alt="" />
                                <div>
                                    <h3 className="font-inter font-semibold text-[17px]">{friend?.name?.length > 15 ? friend?.name?.slice(0, 15) + '...' : friend?.name}</h3>
                                    <h4 className="font-inter text-sm font-medium">{friend?.position?.length > 20 ? friend?.position?.slice(0, 20) + '...' : friend?.position}</h4>
                                </div>
                            </div>
                            
                        ))
                    }
                </div>
            </div>
            
            {
                selectedChat === null ? 
                <div className={`bg-white rounded-lg flex-col justify-center ${showChat ? 'flex' : 'hidden'}`}>
                    <h2 className="my-10 text-xl font-semibold text-center font-inter">Please Select a User to Start Conversation</h2>
                </div>
                :
                <div className={`bg-white rounded-lg relative overflow-y-hidden flex-col justify-between ${showChat ? 'flex' : 'hidden'}`} style={{height: 'calc(100% - 2px)'}}>
                    <div className="h-20">
                        <div className={`flex gap-3 items-center p-3`}>
                    <img src={selectedEmployee?.image} className="w-12 h-12 rounded-full" alt="" />
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h3 className="font-inter font-semibold text-[17px] sm:hidden">{selectedEmployee?.name?.length > 8 ? selectedEmployee?.name?.slice(0, 8) + '...' : selectedEmployee?.name}</h3>
                            <h4 className="font-inter text-sm font-medium sm:hidden">{selectedEmployee?.position?.length > 15 ? selectedEmployee?.position?.slice(0, 15) + '...' : selectedEmployee?.position}</h4>
                        </div>
                        <div className="text-primary bg-[#e3e2f5] p-2 rounded-full md:hidden" onClick={() => {
                            setShowChat(false)
                        }}>
                            <IoChevronBackOutline />
                        </div>
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
                        <MessageForm selectedUserEmail={selectedUserEmail}></MessageForm>
                    </div>                    
                </div>
            }
            
        </div>
    );
};

CommunicationForMobile.propTypes = {
    showSearchBar: PropTypes.bool,
    setSearchValue: PropTypes.string,
    setSelectedChat: PropTypes.string,
    setShowSearchBar: PropTypes.bool,
    searchValue: PropTypes.string,
    searchedEmployees: PropTypes.array,
    setSelectedUserEmail: PropTypes.string,
    sortedEmployees: PropTypes.array,
    selectedChat: PropTypes.string,
    remainingEmployees: PropTypes.array,
    selectedEmployee: PropTypes.string,
    messages: PropTypes.array,
    user: PropTypes.object,
    selectedUserEmail: PropTypes.string,
};

export default CommunicationForMobile;