import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const EmployeePhone = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <div className={`col-span-1 md:col-span-3 lg:col-span-2 bg-white p-2 rounded-lg overflow-y-hidden flex flex-col ${showChat ? "hidden" : "block"}`} style={{height: 'calc(100% - 2px)'}}>
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
                                <h3 className="font-inter font-semibold text-[17px]">{employee?.name}</h3>
                                <h4 className="font-inter text-sm font-medium">{employee?.position}</h4>
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
                        <div key={idx} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#e3e2f5] rounded-lg transition-all ${selectedChat === friend?._id ? 'md:bg-[#e3e2f5]' : ''}`} onClick={() => {
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
                        <div key={idx} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${selectedChat === friend?._id ? 'md:bg-[#e3e2f5]' : ''}`} onClick={() => {
                            setSelectedChat(friend?._id)
                            setSelectedUserEmail(friend?.email)
                            setShowChat(true)
                        }}>
                            <img src={friend?.image} className="w-12 h-12 rounded-full" alt="" />
                            <div>
                                <h3 className="font-inter font-semibold text-[17px]">{friend?.name?.length > 15 ? friend?.name?.slice(0, 12) + '...' : friend?.name}</h3>
                                <h4 className="font-inter text-sm font-medium">{friend?.position}</h4>
                            </div>
                        </div>
                        
                    ))
                }
                
            </div>
        </div>
    );
};

EmployeePhone.propTypes = {
    remainingEmployees: PropTypes.object,
    setSearchValue: PropTypes.object,
    searchValue: PropTypes.object,
    searchedEmployees: PropTypes.object,
    setSelectedUserEmail: PropTypes.object,
    setSelectedChat: PropTypes.object,
    selectedChat: PropTypes.object,
    sortedEmployees: PropTypes.object,
};

export default EmployeePhone;