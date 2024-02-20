import { useState } from "react";
import { ImCross } from "react-icons/im";
import { IoIosSearch } from "react-icons/io";
import useChatFriend from "../../../hooks/useChatFriend";


const Communication = () => {
    // const [showSearchBar, setShowSearchBar] = useState(false);
    // const [searchValues, setSearchValues] = useState(null);
    const [selectedChat, setSelectedChat] = useState(0)
    const {friends} = useChatFriend()


    // const handleSearches = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const searchVal = form.search.value;
    //     if (!searchVal) {
    //       return;
    //     }
    //     setSearchValues(searchVal);
    // };

    return (
        <div>
            <div className="grid grid-cols-6 gap-3 bg-[#ececf8] p-2 rounded-lg">
                <div className="col-span-2 bg-white p-2 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="font-inter font-bold text-2xl">Chats</h2>
                        {/* <div className="flex gap-2">
                            <form
                                onSubmit={handleSearches}
                                className={`p-0 border-0 m-0 search-box ${
                                showSearchBar && "active-search"
                                }`}
                            >
                                <input
                                name="search"
                                defaultValue={searchValues}
                                type="text"
                                className=""
                                placeholder="Search..."
                                />
                                <div>
                                    <button
                                        onClick={() => setShowSearchBar(true)}
                                        style={{ background: "#433EBE" }}
                                        className="search-btn"
                                    >
                                        <IoIosSearch className="text-xl text-white"></IoIosSearch>
                                    </button>
                                </div>
                                <div>
                                {showSearchBar && (
                                    <button
                                        onClick={() => setShowSearchBar(false)}
                                        className="rounded-none bg-none text-primary cancel-btn"
                                        >
                                        <ImCross></ImCross>
                                    </button>
                                )}
                                </div>
                            </form>
                        </div> */}
                    </div>
                    <hr className="my-3 border border-slate-300" />
                    <div className="grid gap-3">
                        {
                            friends && friends?.map((friend, idx) =>(
                                <div key={idx} className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${selectedChat === idx ? 'bg-[#ececf8]' : ''}`} onClick={() => setSelectedChat(idx)}>
                                    <img src="https://i.ibb.co/ByK4Hpd/founder-4.jpg" className="w-12 h-12 rounded-full" alt="" />
                                    <div>
                                        <h3 className="font-inter font-semibold text-[17px]">Ashraful Islam</h3>
                                        <h4 className="font-inter text-sm font-medium">React Developer</h4>
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
                

                <div className="col-span-4 bg-white rounded-lg">
                    <div className={`flex gap-3 items-center cursor-pointer p-3 hover:bg-[#ececf8] rounded-lg transition-all`}>
                        <img src="https://i.ibb.co/ByK4Hpd/founder-4.jpg" className="w-12 h-12 rounded-full" alt="" />
                        <div>
                            <h3 className="font-inter font-semibold text-[17px]">Ashraful Islam</h3>
                            <h4 className="font-inter text-sm font-medium">React Developer</h4>
                        </div>
                    </div>
                    <hr className="my-1 border border-slate-300" />
                    <div className="p-4 space-y-4">
                        <div className="left_chat flex justify-start">
                            <div className="p-1 rounded-lg bg-[#c7c5eb] w-3/4">

                            </div>
                        </div>
                        <div className="right_chat flex justify-end">
                            <div className="p-1 rounded-lg bg-[#c7c5eb] w-3/4">

                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Communication;