import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const AdminManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUser = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log("error happend in admin manage user page");
  return (
    <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">All Users</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {allUser && allUser.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Coin</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user) => (
                <tr key={user?._id}>
                  <td>
                    <img
                      src={user?.photo}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{user?.coins}</td>

                  <td>
                    <button className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500">
                      Remove
                    </button>
                  </td>
                  <td>
                    <label className="form-control w-full max-w-40">
                      <div className="label">
                        <span className="label-text">
                          Update Role
                        </span>
                      </div>
                      <select className="p-2 rounded-md border outline-none border-brand-primary">
                        <option  selected>
                          Worker
                        </option>
                        <option>Buyer</option>
                        <option>Admin</option>
                        
                      </select>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center my-5">
            <p className="text-center">No Users Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageUsers;
