import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";

const TaskDetails = () => {
  const { id } = useParams();
  const [submissionDetails, setSubmissionDetails] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const {
    data: taskDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task-details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-task/${id}`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log(isError);

  const {
    task_image_url,
    task_title,
    required_workers,
    task_detail,
    deadline,
    payable_amount,

    buyer,
  } = taskDetails || {};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: id,
      task_title: task_title,
      payable_amount: payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      buyer_name: buyer?.name || "N/A",
      buyer_email: buyer?.email,
      submission_details: submissionDetails,
      current_date: new Date(),
      status: "pending",
    };
    setLoading(true);
    try {
      const { data } = await axiosSecure.post("/submissions", submissionData);
      if (data?.insertedId) {
        toast.success("Request send succesfully");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to save the submission.");
    } finally {
      setSubmissionDetails("");
      setLoading(false);
    }
  };
  return (
    <div className="p-6 bg-gradient-to-t to-brand-primary/20 from-surface text-white rounded-lg shadow-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Details</h1>


      <div className="flex flex-col lg:items-center lg:flex-row gap-6">
        {/* details  */}
        <div className=" flex flex-col w-full lg:w-[50%]">
          {/* Image Section */}
          <div>
            <img
              src={task_image_url}
              alt={task_title}
              className="w-full h-40 object-cover rounded-xl"
            />
          </div>
          {/* Content Section */}

          <div className="flex items-center justify-between flex-wrap  mt-2">
            <div className="flex items-center bg-brand-primary/10 text-brand-primary px-2 py-1 text-xs  rounded-full w-fit">
              <span>Vacancy:</span>
              <span className=" ">{required_workers}</span>
            </div>
            <div className="flex items-center bg-brand-primary/10 text-brand-primary px-3 py-1 text-xs  rounded-full w-fit">
              <span>Coins:</span>
              <span className=" ">{payable_amount}</span>
            </div>
          </div>
            
          <div className="flex-grow space-y-2 mt-2">
            <h3 className="text-lg font-semibold">
              {task_title}
            </h3>
            <div className=" text-text-muted">{task_detail}</div>
            <div className="flex items-center gap-2 w-fit text-sm text-gray-400">
              <span>Buyer:</span>
              <span className=" ">{buyer?.name || "N/A"}</span>
            </div>
            <div className=" flex items-center gap-2 text-sm text-gray-400">
              <span>Deadline:</span>
              <span>{format(new Date(deadline), "dd-MM-yyyy")}</span>
            </div>
          </div>
        </div>

        {/* form field */}
        <div className="lg:w-1/2 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="submissionDetails"
                className="block text-xl font-medium mb-6"
              >
                Submission Details
              </label>
              <textarea
                id="submissionDetails"
                rows="4"
                className="textarea textarea-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm max-h-52 min-h-52"
                placeholder="Enter your submission details..."
                value={submissionDetails}
                
                onChange={(e) => setSubmissionDetails(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#17413E] shadow-brand-primary/10 shadow-inner  px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition duration-300"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
