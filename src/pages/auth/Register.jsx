import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { createUser, updateUser, setUser, loading, setLoading } = useAuth();

  // Handle form submission
  const onSubmit = async (data) => {
    const { name, email, photo, password, role } = data;

    const image = photo[0];

    const photoUrl = await imageUpload(image);

    createUser(email, password)
      .then((result) => {
        const user = result?.user;
        updateUser(name, photoUrl);
        setUser(user);
        const users = {
          name,
          email,
          photo: photoUrl,
          role: role,
          coins: role === "Buyer" ? 50 : 10,
          timestamp: new Date().getTime(),
        };
        axios.post(`${import.meta.env.VITE_API_URL}/users`, users);

        toast.success("Registration Succesfull!!!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Email already in use");
        setLoading(false);
        console.log(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-text-light bg-bg-main py-10">
      <div className="bg-gradient-to-t to-brand-primary/20 from-surface p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="text-center my-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            Don’t leave without your gift!
          </h2>
          <p>Sign up now and receive upto 50 coins as a sign up bonus! 💸</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block mb-1 font-semibold">*Name</label>
            <div className="relative">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold">*Email</label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          
            {/* Photo field */}
            <div>
              <label className="block mb-1 font-semibold">*Upload Photo</label>
              <div className="relative">
                <input
                  type="file"
                  {...register("photo", { required: "Photo is required" })}
                  className="file-input file-input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photo.message}
                  </p>
                )}
              </div>
            </div>
            {/* Role Field */}
            <div>
              <label className="block mb-1 font-semibold">*Role</label>
              <div className="relative">
                <select
                  {...register("role", { required: "Role is required" })}
                  className="select select-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
                >
                  <option value="Worker">Worker</option>
                  <option value="Buyer">Buyer</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>
         
          {/* Password Field */}
          <div>
            <label className="block mb-1 font-semibold">*Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                  },
                })}
                className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-text-muted"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-brand-primary text-gray-900 w-full mt-2 hover:bg-brand-primary/80 outline-none border-none font-semibold"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 font-semibold">
          Already have an account?{" "}
          <Link to={"/login"} className="text-brand-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
