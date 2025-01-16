import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import Loading from "../../../components/Loading";

const WorkerSubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: mySubmissions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-submissions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-summissions/${user?.email}`);
      return data;
    },
  });
  if(isLoading) return <Loading/>
  if(isError) console.log("error happend in my submission", isError)
  return (
    <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Added Tasks</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {mySubmissions && mySubmissions.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Task title</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Amount</th>
                <th>Submission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mySubmissions.map((submission) => (
                <tr key={submission?._id}>
                  <td>{submission?.task_title?.slice(0, 10)}</td>
                  <td>{submission?.buyer_name || "N/A"}</td>
                  <td>{submission?.buyer_email}</td>
                  <td>{submission?.payable_amount}</td>
                  <td>
                    {format(new Date(submission?.current_date), "dd-MM-yyyy")}
                  </td>
                  <td
                    
                  >
                    <button className={`px-2 py-1 rounded-md ${
                      submission?.status == "pending" &&
                      "bg-yellow-600 text-yellow-200"
                    }`}>{submission?.status}</button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center my-5">
            <p className="text-center">No Task added</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerSubmission;
