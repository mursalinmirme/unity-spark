

const JobApplyForm = () => {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <form method="dialog">
                    <button className="absolute right-0 top-0 bg-primary px-3 py-1.5 rounded-bl-xl text-white cursor-pointer">✕</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default JobApplyForm;