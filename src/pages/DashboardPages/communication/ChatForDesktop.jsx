import PropTypes from "prop-types";
import { AiOutlineSend } from "react-icons/ai";

const ChatForDesktop = ({onSubmit, register, handleSubmit, selectedEmployee, messages, user}) => {
    return (
        <div className={`relative overflow-y-hidden flex flex-col justify-between`} style={{height: 'calc(100% - 2px)'}}>
            <div className="h-20">
                <div className={`flex gap-3 items-center p-3`}>
                    <img src={selectedEmployee?.image} className="w-12 h-12 rounded-full" alt="" />
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h3 className="font-inter font-semibold text-[17px] hidden sm:block">{selectedEmployee?.name}</h3>
                            <h3 className="font-inter font-semibold text-[17px] sm:hidden">{selectedEmployee?.name?.length > 8 ? selectedEmployee?.name?.slice(0, 8) + '...' : selectedEmployee?.name}</h3>
                            <h4 className="font-inter text-sm font-medium hidden sm:block">{selectedEmployee?.position}</h4>
                            <h4 className="font-inter text-sm font-medium sm:hidden">{selectedEmployee?.position?.length > 15 ? selectedEmployee?.position?.slice(0, 15) + '...' : selectedEmployee?.position}</h4>
                        </div>
                    </div>
                </div>
                <hr className="my-1 border border-slate-300" />
            </div>

            <div className="p-4 h-full overflow-y-auto flex flex-col-reverse">
                {
                    messages && messages.length > 0 ? messages?.map(message => (
                        <div key={message._id}>
                            {
                                <div className={`flex w-full ${message.sender === user?.email ? 'justify-end' : 'justify-srart'}`}>
                                    <div className={`mt-1.5 px-2 py-1 rounded-lg max-w-3/4 ${message.sender === user?.email ? 'bg-[#c7e3f6]' : 'bg-[#c7c5eb]'}`}>
                                        <span className="font-medium font-inter">{message.message}</span>
                                    </div>
                                </div>
                            }
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
    );
};

ChatForDesktop.propTypes = {
    onSubmit: PropTypes.object,
    register: PropTypes.object,
    handleSubmit: PropTypes.object,
    selectedEmployee: PropTypes.object,
    messages: PropTypes.object,
    user: PropTypes.object,
};

export default ChatForDesktop;