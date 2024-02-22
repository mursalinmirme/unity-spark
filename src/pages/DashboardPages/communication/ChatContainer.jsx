import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ChatForDesktop from "./ChatForDesktop";
import ChatForPhone from "./ChatForPhone";

const ChatContainer = ({selectedChat, selectedUserEmail, user, selectedEmployee, messages, showChat, setShowChat}) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()

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
        <>
            {
                selectedChat === null ? 
                <div className={`col-span-1 md:col-span-4 bg-white rounded-lg flex flex-col justify-center`}>
                    <h2 className="my-10 text-2xl font-semibold text-center font-inter">Please Select a User to Start Conversation</h2>
                </div>
                :
                <div className="col-span-1 md:col-span-4 bg-white rounded-lg">
                    <ChatForDesktop
                        onSubmit={onSubmit}
                        register={register}
                        handleSubmit={handleSubmit}
                        selectedEmployee={selectedEmployee}
                        messages={messages}
                        showChat={showChat} 
                        setShowChat={setShowChat}
                        user={user}
                    ></ChatForDesktop>
                    <ChatForPhone
                        onSubmit={onSubmit}
                        register={register}
                        handleSubmit={handleSubmit}
                        selectedEmployee={selectedEmployee}
                        messages={messages}
                        showChat={showChat} 
                        setShowChat={setShowChat}
                        user={user}
                    ></ChatForPhone>
                </div>
            }            
        </>
    );
};

ChatContainer.propTypes = {
    user: PropTypes.object,
    selectedUserEmail: PropTypes.object,
    selectedEmployee: PropTypes.object,
    selectedChat: PropTypes.object,
    messages: PropTypes.object,
    showChat: PropTypes.object,
    setShowChat: PropTypes.object,
};

export default ChatContainer;