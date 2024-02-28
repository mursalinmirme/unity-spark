import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import PropTypes from "prop-types";

const MessageForm = ({selectedUserEmail, socket, setMessages, messages}) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)

    const onSubmit = (data) => {
        const messageInfo = {
            message: data.message,
            reciever: selectedUserEmail,
            sender: user?.email
        }
        axiosSecure.post('/chat', messageInfo)
        .then(() => {
            socket.emit('new-message-sent', messageInfo)
            setMessages([messageInfo, ...messages])
            reset();
        })
    }

    return (
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
    );
};

MessageForm.propTypes = {
    selectedUserEmail: PropTypes.string,
    socket: PropTypes.object,
    setMessages: PropTypes.object,
    messages: PropTypes.object,
};

export default MessageForm;