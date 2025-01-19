import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const BuyerPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments-history", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-history/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log(isError);
  return (
    <div className="p-6 rounded-lg shadow-lg  w-full mx-auto bg-bg-main">
      <h2 className="text-3xl font-semibold text-center mb-6 text-white">
        Payment History
      </h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {payments && payments.length ? (
          <table className="table text-white">
            {/* head */}
            <thead className="bg-surface  text-brand-primary text-center">
              <tr>
                <th>Serial</th>
                <th>Price</th>
                <th>Coins</th>
                <th>TransectionID</th>
              </tr>
            </thead>
            <tbody className="text-center bg-surface">
              {payments.map((payment, idx) => (
                <tr key={payment?._id}>
                  <th>{idx + 1}</th>
                  <td>${payment?.price}</td>
                  <td>{payment?.coins}</td>
                  <td>{payment?.transactionId}</td>
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
