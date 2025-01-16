import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

const BuyerPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["payments-history", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-history/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log(isError);
    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/payment-history/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your payment history has been deleted.",
              icon: "success",
            });
            refetch()
          }
        }
      });
    };
  return (
    <div className="p-6  rounded-lg shadow-lg my-10 w-11/12 mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Payment History</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {payments && payments.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial</th>
                <th>Price</th>
                <th>Coins</th>
                <th>TransectionID</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment?._id}>
                  <th>{idx + 1}</th>
                  <td>${payment?.price}</td>
                  <td>{payment?.coins}</td>
                  <td>{payment?.transactionId}</td>
                  <td>
                    <button
                      className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500"
                      onClick={() => handleDelete(payment?._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center my-5">
            <p className="text-center">No coin purchased</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerPaymentHistory;
