import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser,  loading ,signInWithGoogle} = useAuth();
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
        navigate( "/dashboard");
        reset();
        
      })
      .catch((error) => {
        toast.error("Invalid Email or Password");
        console.log(error.message)
        reset()
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGoogleSignIn = ()=>{
    signInWithGoogle()
    .then((res) => {
    
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
      toast.success("Login Successful!!!")
      navigate( "/dashboard");
      
    })
    .catch((err) => {
      toast.error(err?.message)
      console.log(err?.message)
    });
}
  return (
    <div className="min-h-screen flex items-center justify-center  text-text-light bg-bg-main">
      <Helmet>
        <title>Sign In | Swift Cash</title>
      </Helmet>
      <div className="bg-gradient-to-t to-brand-primary/20 from-surface p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <button onClick={handleGoogleSignIn} disabled={loading} className="btn  w-full flex items-center justify-center gap-2 mb-4 bg-white/80 text-gray-900 outline-none border-none hover:bg-white/60">
          <FcGoogle className="text-lg" />
          Sign In with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold">*Email</label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email here..."
                className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
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
            <label className="block mb-1 font-semibold">*Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
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

          <button disabled={loading} type="submit" className="btn bg-brand-primary text-gray-900 w-full mt-2 hover:bg-brand-primary/80 outline-none border-none font-semibold">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-6 font-semibold">
        No account?{" "}
          <Link to={"/register"} className="text-brand-primary">
            Sign Up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
