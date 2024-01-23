import { VscEye } from "react-icons/vsc";
import { MdOutlineFileDownload } from "react-icons/md";
import "./recruiment.css";
const Recruiment = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://i.ibb.co/qFcMyzH/loupe.jpg" alt="" />
          <div>
            <h1 className="text-xl font-bold">Ashraful Islam</h1>
            <p className="text-[#5B5555] font-semibold">applied 8min ago</p>
          </div>
        </div>
        <div>
          <div>
            <a className="flex gap-2 items-center text-primary font-inter font-bold text-sm border-2 rounded-lg cursor-pointer border-primary py-3 px-5 hover:bg-primary hover:text-white transition-all duration-500">
              <VscEye className="text-2xl" />
              <span>View Profile</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-y-2 pb-5 my-5">
        <h1 className="text-3xl font-semibold mt-3 mb-5">Contact Info: </h1>
        <div className="grid grid-cols-2 text-xl font-semibold">
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
        <h1 className="text-xl">Skills:</h1>
        <div className="skills text-sm uppercase flex gap-3 my-2">
          <h4>JAVASCRIPT</h4>
          <h4>REACT</h4>
          <h4>NEXT.JS</h4>
        </div>
        <div className="grid grid-cols-2 gap-y-3 text-xl">
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
