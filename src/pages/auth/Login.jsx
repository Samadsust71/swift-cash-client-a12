import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, setLoading, loading ,signInWithGoogle} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        toast.success("Login Succesfull");
        navigate("/");
        reset();
        setLoading(false);
      })
      .catch(() => {
        toast.error("Invalid Email or Password");
        setLoading(false);
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGoogleSignIn = ()=>{
    signInWithGoogle()
    .then((res) => {
      setLoading(false)
      const user = res?.user
      const users = {
        name: user?.displayName || "",
        email: user?.email || "",
        photo: user?.photoURL || "",
        role: "Worker",
        coins: 10,
        timestamp: new Date().getTime(),
      };
      axios.post(`${import.meta.env.VITE_API_URL}/users`, users);
      toast.success("Login Successfull !!!")
      navigate( "/");
    })
    .catch((err) => {
      setLoading(false)
      toast.error(err.message)
    });
}
  return (
    <div className="min-h-screen flex items-center justify-center  text-text-light">
      <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <button onClick={handleGoogleSignIn} disabled={loading} className="btn btn-outline w-full flex items-center justify-center gap-2 mb-4">
          <FaGoogle className="text-lg" />
          Sign In with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Type here..."
                className="input input-bordered w-full bg-surface text-text-light"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="input input-bordered w-full bg-surface text-text-light pr-10"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                className="absolute right-3 top-4 text-text-muted"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-full mt-2">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="text-brand-primary">
            Sign Up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
