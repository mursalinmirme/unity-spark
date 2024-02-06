const CompletedTaskCard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Completed Task</h2>
      <div className="border-2 border-[#38B000] bg-[#EBF7E5] rounded-xl px-2 md:px-5 py-2 space-y-4">
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="text-[18px] font-bold">
              Write Code for New Feature or Application
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div>
            <span className="border px-4 bg-[#C7E9B7] p-1 rounded-lg text-[#4AB716] font-bold">
              {" "}
              6 feb - 21 feb
            </span>
          </div>

          <div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://i.ibb.co/DRqXm4r/395687920-750115476879631-8529659874036745582-n.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://i.ibb.co/ZhFn0Ph/profile-pic-6.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://i.ibb.co/tLN9ddt/prflPic.jpg" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-white text-primary font-semibold text-xl">
                  <span>+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedTaskCard;
