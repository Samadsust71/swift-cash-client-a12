import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const TaskDetails = () => {
  const { id } = useParams();
  const [submissionDetails, setSubmissionDetails] = useState("");
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false)
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
    
    task_title,
    
    task_detail,
    
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
    setLoading(true)
    try {
      const {data} = await axiosSecure.post("/submissions", submissionData);
      if(data?.insertedId){
        toast.success("Request send succesfully")
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to save the submission.");
    }finally{
      setSubmissionDetails("")
      setLoading(false)
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-bg-main rounded-lg shadow-md text-white">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      <div className="mb-6">
        <p>
          <strong>Title:</strong> {task_title}
        </p>
        <p>
          <strong>Description:</strong> {task_detail}
        </p>
        <p>
          <strong>Payable Amount:</strong> ${payable_amount}
        </p>
        <p>
          <strong>Buyer Name:</strong> {buyer?.name || "N/A"}
        </p>
        <p>
          <strong>Buyer Email:</strong> {buyer?.email}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="submissionDetails"
            className="block text-sm font-medium"
          >
            Submission Details
          </label>
          <textarea
            id="submissionDetails"
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your submission details..."
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading?"Submitting...":"Submit"}
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
