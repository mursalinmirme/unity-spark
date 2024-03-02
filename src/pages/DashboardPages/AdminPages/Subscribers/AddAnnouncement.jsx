import { useQuery } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from 'sonner';

const AddAnnouncement = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: allSubscriberEmails } = useQuery({
    queryKey: ["allSubscriberEmails"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-subscriber-emails");
      return result.data;
    },
  });
  console.log("total users emails are", allSubscriberEmails);
  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!e.target.title.value) {
      toast.error("Please enter the subject");
      setIsSubmitting(false);
      return;
    }
    if (content === "") {
      toast.error("Please enter the body");
      setIsSubmitting(false);
      return;
    }

    const newAnnouncement = {
      title: e.target.title.value,
      emailBody: content,
      to: allSubscriberEmails,
    };

    axiosSecure.post("/send-announcement", newAnnouncement)
    .then((res) => {
        console.log('send announcement result is',res.data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Announcement sent Successfully",
            showConfirmButton: false,
            timer: 2000
          });
        setIsSubmitting(false);
        setContent('');
        e.target.reset();
    })
    .catch(err => {
        console.log(err.message);
        setIsSubmitting(false);
    })
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold">Publish Announcement</h3>
      <form onSubmit={handlePublishAnnouncement} className="mt-5">
        <div>
          <label className="text-base text-gray-600" htmlFor="">
            Email Subject
          </label>
          <input
            className="py-2 text-base"
            type="text"
            name="title"
            placeholder="Enter your titel..."
          />
        </div>
        <div className="mt-5 space-y-2 text-base">
          <label className="text-base text-gray-600" htmlFor="">
            Email Body
          </label>
          <JoditEditor
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <button
          className="nbtn w-32 mt-6 !rounded-md flex justify-center items-center"
          type="submit"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Publish"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAnnouncement;
