import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AdminManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUser = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log("error happend in admin manage user page");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete the user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/all-users/${id}`);
          if (data?.deletedCount) {
            Swal.fire({
              title: "User Deleted",
              text: "Your user has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error?.message || "Some thing went Wrong");
        }
      }
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const role = e.target.role.value;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update the user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/update-role/${id}`,{role});
          if (data?.modifiedCount) {
            Swal.fire({
              title: "User updated",
              text: "Your user has been updated.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error?.message || "Some thing went Wrong");
        }
      }
    });
  };
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
                    <button
                      onClick={() => handleDelete(user?._id)}
                      className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500"
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <label className="form-control w-full max-w-40">
                      <div className="label">
                        <span className="label-text">Update Role</span>
                      </div>
                      <form
                        onSubmit={(e) => handleSubmit(e, user?._id)}
                        className="flex items-center gap-1"
                      >
                        <select
                          required
                          name="role"
                          defaultValue={user && user?.role}
                          className="p-2 rounded-md border outline-none border-brand-primary"
                        >
                          <option value="Worker">Worker</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <button
                          type="submit"
                          className="px-1 py-2 rounded-md bg-brand-primary text-white"
                        >
                          Update
                        </button>
                      </form>
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
