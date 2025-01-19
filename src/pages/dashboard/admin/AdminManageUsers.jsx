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
      title: "Are you sure you want to remove?",
      icon: "warning",
      background:'#1D1E30',
      showCancelButton: true,
      confirmButtonColor: "#1E333C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/all-users/${id}`);
          if (data?.deletedCount) {
            Swal.fire({
              background:'#1D1E30',
              title: "removed",
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
      title: "Are you sure you want to update the role?",
      icon: "warning",
      background:'#1D1E30',
      showCancelButton: true,
      confirmButtonColor: "#1E333C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/update-role/${id}`,{role});
          if (data) {
            Swal.fire({
              background:'#1D1E30',
              title: "Updated",
              icon: "success",
              confirmButtonColor: "#1E333C",
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
    <div className="p-6  rounded-lg shadow-lg  w-full mx-auto bg-bg-main">
      <h2 className="text-3xl font-semibold text-center mb-6 text-white">All Users</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {allUser && allUser.length ? (
          <table className="table text-white">
            {/* head */}
            <thead className="bg-surface text-brand-primary text-center">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Coin</th>
                <th>Action</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody className="text-center bg-surface">
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
                      className="text-sm bg-red-200 px-2 py-1 rounded-full text-red-600 hover:scale-105"
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <label className="form-control w-full max-w-40">
                      <form
                        onSubmit={(e) => handleSubmit(e, user?._id)}
                        className="flex items-center gap-1"
                      >
                        <select
                          required
                          name="role"
                          defaultValue={user && user?.role}
                          className="select select-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm select-sm"
                        >
                          <option value="Worker">Worker</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <button
                          type="submit"
                          className="btn bg-brand-primary text-gray-900  hover:bg-brand-primary/80 outline-none border-none font-semibold btn-xs"
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
