import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
const UserProfileEdit = () => {
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <div>
      <div className="user_profile_container">
        <img src="https://i.ibb.co/vcBNZ2H/founder-1.jpg" alt="profile" />
        <div className="flex justify-between w-full">
          <div>
            <h2>John Doe</h2>
            <h3>johndoetheheroalom@gmail.com</h3>
            <ProgressBar
              completed={90}
              bgColor="#433ebe"
              height="12px"
              baseBgColor="#e3e2f5"
              labelColor="#ffffff"
              labelSize="10px"
              maxCompleted={100}
              animateOnRender
            />
          </div>
          <div>
            <a
              className="edit_btn !border-red-600"
              onClick={() => setOpenEditor(true)}
            >
              <span className="text-red-500 hover:text-white"> X Cancel </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-2 w-full h-96 mt-8"></div>
    </div>
  );
};

export default UserProfileEdit;
