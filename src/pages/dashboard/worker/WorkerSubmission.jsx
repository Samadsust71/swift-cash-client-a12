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
    <div className="p-6  rounded-lg shadow-lg w-full mx-auto bg-bg-main">
      <h2 className="text-3xl font-semibold text-center mb-6 text-white">All Submission</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {mySubmissions && mySubmissions.length ? (
          <table className="table text-white">
            {/* head */}
            <thead className="bg-surface text-brand-primary text-center">
              <tr>
                <th>Task title</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Amount</th>
                <th>Submission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center bg-surface">
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
                    <span className={`text-sm px-2 py-1 rounded-full

                     ${
                      submission?.status == "pending" &&
                      "text-yellow-800 bg-yellow-200"
                     }
                     ${
                      submission?.status == "approve" &&
                      "text-brand-primary bg-brand-primary/5"
                       
                     }
                     ${
                      submission?.status == "rejected" &&
                      "text-red-600 bg-red-200"
                     }
                    
                    `}>{submission?.status}</span>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center text-white items-center my-5">
            <p className="text-center">No Submission made</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerSubmission;
