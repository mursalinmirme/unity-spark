import { Link } from "react-router-dom";

const AddNewTask = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-primary font-bold text-2xl"> Add a New Task </h1>
        <Link
          to="/dashboard/taskManagement"
          className="edit_btn !text-red-500 hover:!text-white !border-red-600 hover:!border-red-600 hover:!bg-red-600"
        >
          <span> X Cancel </span>
        </Link>
      </div>
      <div> This is Cancal Page </div>

      {open}
    </div>
  );
};

export default AddNewTask;
