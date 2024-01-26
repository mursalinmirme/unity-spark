import { VscEye } from "react-icons/vsc";
import { MdOutlineFileDownload } from "react-icons/md";
import "./recruiment.css";
const Recruiment = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 md:gap-3">
          <img
            className="h-12 w-12 md:h-16 md:w-16"
            src="https://i.ibb.co/qFcMyzH/loupe.jpg"
            alt=""
          />
          <div>
            <h1 className="text-xl font-bold">Ashraful Islam</h1>
            <p className="text-[#5B5555] font-semibold">applied 8min ago</p>
          </div>
        </div>
        <div>
          <div>
            <a className="flex md:gap-2 items-center text-primary font-inter font-bold text-sm border-2 rounded-lg cursor-pointer border-primary p-1 md:py-3 md:px-5 hover:bg-primary hover:text-white transition-all duration-500">
              <VscEye className="text-2xl" />
              <span>View Profile</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-y-2 pb-4 my-4">
        <h1 className="text-2xl font-bold my-3">Contact Info: </h1>
        <div className="md:grid grid-cols-2 space-y-3 md:space-y-0 text-lg font-semibold">
          <div>
            <h1>Email:</h1>
            <p>johndoetheheroalom@gmail.com</p>
          </div>
          <div>
            <h1>Phone:</h1>
            <p>+88 ##### 876985</p>
          </div>
        </div>
      </div>
      <div className="font-semibold">
        <h1 className="text-lg">Skills:</h1>
        <div className="badge_container my-2">
          <span>JAVASCRIPT</span>
          <span>REACT</span>
          <span>NEXT.JS</span>
        </div>
        <div className="md:grid grid-cols-2 gap-y-3 space-y-3 md:space-y-0 text-lg">
          <div>
            <h1>Current Address:</h1>
            <p>N/A</p>
          </div>
          <div>
            <h1>Permanent Address:</h1>
            <p>N/A</p>
          </div>
          <div>
            <h1>Age:</h1>
            <p>20</p>
          </div>
          <div>
            <h1>Gender:</h1>
            <p>Male</p>
          </div>
          <div>
            <h1>Education Level:</h1>
            <p>N/A</p>
          </div>
          <div>
            <h1>Institute Name:</h1>
            <p>N/A</p>
          </div>
          <div className="mt-4">
            <h1>Resume:</h1>
            <div className="flex gap-5 resume mt-2">
              <a>
                <VscEye className="text-2xl" />
                <span>View</span>
              </a>
              <a>
                <MdOutlineFileDownload className="text-2xl" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiment;
