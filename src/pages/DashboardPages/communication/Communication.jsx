import { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../../Provider/AuthProvider";
import useEmployees from "../../../hooks/useEmployees";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CommunicationForMobile from "./CommunicationForMobile";
import useAdmins from "../../../hooks/useAdmins";
import MessageForm from "./MessageForm";
import FriendsSkeleton from "./FriendsSkeleton";
import MessageSkeleton from "./MessageSkeleton";

const Communication = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const { allEmployees } = useEmployees();
  const { allAdmins } = useAdmins();
  const [allChatUser, setAllChatUser] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [messages, setMessages] = useState([]);
  const [sortedEmployees, setShortedEmployees] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showMessageSkeleton, setShowMessageSkeleton] = useState(true);
  console.log(showMessageSkeleton);

  const employees = allChatUser?.filter(
    (employee) => employee?.email !== user?.email
  );
  const searchedEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue?.toLowerCase())
  );
  const selectedEmployee = employees?.find(
    (employee) => employee.email === selectedUserEmail
  );

  useEffect(() => {
    setAllChatUser([...allEmployees, ...allAdmins]);
  }, [allAdmins, allEmployees]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    const messageTimeOut = setTimeout(() => {
      setShowMessageSkeleton(false);
    }, 2000);

    return () => clearTimeout(messageTimeOut);
  }, [showMessageSkeleton]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      axiosSecure
        .get(
          `/chat?sender_email=${user?.email}&reciever_email=${selectedUserEmail}`
        )
        .then((res) => {
          setMessages(res.data);
        });
    }, 200);

    return () => clearTimeout(timeOut);
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      axiosSecure.get(`/chat-friends/${user?.email}`).then((res) => {
        setMyFriends(res.data);
      });
    }, 100);

    return () => clearTimeout(timeOut);
  });

  useEffect(() => {
    const combinedArray = [];

    myFriends.forEach((friend) => {
      const newFriends = employees?.filter(
        (employee) => employee.email === friend
      );
      if (
        newFriends.length > 0 &&
        !sortedEmployees.some(
          (e) => JSON.stringify(e) === JSON.stringify(newFriends)
        )
      ) {
        combinedArray.push(...newFriends);
      }
    });

    if (JSON.stringify(combinedArray) !== JSON.stringify(sortedEmployees)) {
      setShortedEmployees(combinedArray);
    }
  }, [myFriends, employees, sortedEmployees]);

  const remainingEmployees = employees.filter(
    (employee) =>
      !sortedEmployees.some(
        (sortedEmployee) => sortedEmployee.email === employee.email
      )
  );

  return (
    <div>
      <div
        className="hidden md:grid grid-cols-7 lg:grid-cols-6 gap-3 bg-[#ececf8] p-2 rounded-lg overflow-hidden"
        style={{ height: "calc(100vh - 20vh)" }}>
        <div
          className={`col-span-3 lg:col-span-2 bg-white p-2 rounded-lg overflow-y-hidden flex flex-col`}
          style={{ height: "calc(100% - 2px)" }}>
          <div className="h-14">
            <div className="flex items-center justify-between relative">
              <h2 className="font-inter font-bold text-2xl">Chats</h2>
              <div
                className={`flex items-center justify-between border-2 rounded-lg p-1 bg-white absolute ${
                  showSearchBar ? "top-0" : "-top-14"
                } right-0 w-full transition-all duration-700`}>
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  className="border-0 m-0 outline-none pl-1 w-full"
                />
                <button
                  type="submit"
                  className={`bg-red-500 text-white p-1 rounded-lg`}
                  onClick={() => {
                    setShowSearchBar(false);
                    setSearchValue(null);
                  }}>
                  <RxCross2 className="text-lg" />
                </button>
              </div>
              <button
                type="submit"
                className={`bg-primary text-white p-1.5 rounded-lg transition-all duration-700 ${
                  showSearchBar ? "-mt-32" : "mt-0"
                }`}
                onClick={() => setShowSearchBar(true)}>
                <IoIosSearch className="text-lg" />
              </button>
            </div>
            <hr className="my-3 border border-slate-300" />
          </div>

          {/* SEARCHED EMPLOYEES */}
          <div
            className={`p-2 -mt-3 rounded-b-lg space-y-3 h-auto ${
              searchValue ? "block" : "hidden"
            }`}
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}>
            {searchedEmployees && searchedEmployees?.length > 0 ? (
              searchedEmployees?.map((employee) => (
                <div
                  onClick={() => {
                    setSelectedUserEmail(employee?.email);
                    setSelectedChat(employee?._id);
                    setShowSearchBar(false);
                    setSearchValue(null);
                    setShowMessageSkeleton(true);
                  }}
                  key={employee._id}
                  className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all`}>
                  <img
                    src={employee?.image}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    <h3 className="font-inter font-semibold text-[17px]">
                      {employee?.name}
                    </h3>
                    <h4 className="font-inter text-sm font-medium">
                      {employee?.position}
                    </h4>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="font-semibold text-center font-inter my-1">
                No Employee Found
              </h2>
            )}
          </div>
          <div className="grid gap-3 overflow-y-auto">
            {/* MY FRIENDS LIST */}
            <h2 className="font-inter font-semibold">Your Friends</h2>
            {showSkeleton ? (
              <FriendsSkeleton></FriendsSkeleton>
            ) : (
              sortedEmployees?.map((friend, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${
                    selectedChat === friend?._id ? "bg-[#ececf8]" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(friend?._id);
                    setSelectedUserEmail(friend?.email);
                    setShowMessageSkeleton(true);
                  }}>
                  <img
                    src={friend?.image}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    <h3 className="font-inter font-semibold text-[17px]">
                      {friend?.name}
                    </h3>
                    <h4 className="font-inter text-sm font-medium">
                      {friend?.position}
                    </h4>
                  </div>
                </div>
              ))
            )}
            <hr className="my-1 border border-slate-300" />
            {/* NOT MY FRIEND LIST */}
            <h2 className="font-inter font-semibold">Make More Friends</h2>
            {showSkeleton || remainingEmployees?.length === 0 ? (
              <FriendsSkeleton></FriendsSkeleton>
            ) : (
              remainingEmployees?.map((friend, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 items-center cursor-pointer p-1 hover:bg-[#ececf8] rounded-lg transition-all ${
                    selectedChat === friend?._id ? "bg-[#ececf8]" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(friend?._id);
                    setSelectedUserEmail(friend?.email);
                    setShowMessageSkeleton(true);
                  }}>
                  <img
                    src={friend?.image}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    <h3 className="font-inter font-semibold text-[17px]">
                      {friend?.name}
                    </h3>
                    <h4 className="font-inter text-sm font-medium">
                      {friend?.position}
                    </h4>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {selectedChat === null ? (
          <div className="col-span-4 bg-white rounded-lg flex flex-col justify-center">
            <h2 className="my-10 text-2xl font-semibold text-center font-inter">
              Please Select a User to Start Conversation
            </h2>
          </div>
        ) : (
          <div
            className="col-span-4 bg-white rounded-lg relative overflow-y-hidden flex flex-col justify-between"
            style={{ height: "calc(100% - 2px)" }}>
            <div className="h-20">
              <div className={`flex gap-3 items-center p-3`}>
                <img
                  src={selectedEmployee?.image}
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="font-inter font-semibold text-[17px] hidden sm:block">
                    {selectedEmployee?.name}
                  </h3>
                  <h3 className="font-inter font-semibold text-[17px] sm:hidden">
                    {selectedEmployee?.name?.length > 8
                      ? selectedEmployee?.name?.slice(0, 8) + "..."
                      : selectedEmployee?.name}
                  </h3>
                  <h4 className="font-inter text-sm font-medium hidden sm:block">
                    {selectedEmployee?.position}
                  </h4>
                  <h4 className="font-inter text-sm font-medium sm:hidden">
                    {selectedEmployee?.position?.length > 15
                      ? selectedEmployee?.position?.slice(0, 15) + "..."
                      : selectedEmployee?.position}
                  </h4>
                </div>
              </div>
              <hr className="my-1 border border-slate-300" />
            </div>

            {/* CHATS OF EMPLOYEES */}
            <div className="p-4 h-full overflow-y-auto flex flex-col-reverse">
              {showMessageSkeleton ? (
                <MessageSkeleton></MessageSkeleton>
              ) : messages.length > 0 ? (
                messages?.map((message) => (
                  <div
                    key={message._id}
                    className={`flex w-full ${
                      message.sender === user?.email
                        ? "justify-end"
                        : "justify-srart"
                    }`}>
                    <div
                      className={`mt-1.5 px-2 py-1 rounded-lg max-w-3/4 ${
                        message.sender === user?.email
                          ? "bg-[#c7e3f6]"
                          : "bg-[#c7c5eb]"
                      }`}>
                      <span className="font-medium font-inter">
                        {message.message}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-2xl font-semibold text-center font-inter">
                    No Conversation Found
                  </h2>
                </div>
              )}
            </div>

            {/* MESSAGE INPUT */}
            <div className="p-3 bg-white h-[70px]">
              <MessageForm
                selectedUserEmail={selectedUserEmail}
                setMessages={setMessages}
                messages={messages}></MessageForm>
            </div>
          </div>
        )}
      </div>

      {/* COMPONENT FOR RESPONSIVENESS */}
      <div className="block md:hidden">
        <CommunicationForMobile
          showSearchBar={showSearchBar}
          setSearchValue={setSearchValue}
          setShowSearchBar={setShowSearchBar}
          searchValue={searchValue}
          searchedEmployees={searchedEmployees}
          setSelectedUserEmail={setSelectedUserEmail}
          setSelectedChat={setSelectedChat}
          sortedEmployees={sortedEmployees}
          remainingEmployees={remainingEmployees}
          selectedChat={selectedChat}
          selectedEmployee={selectedEmployee}
          messages={messages}
          user={user}
          selectedUserEmail={selectedUserEmail}></CommunicationForMobile>
      </div>
    </div>
  );
};

export default Communication;
