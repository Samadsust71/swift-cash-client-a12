import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-text-light">
      <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <button className="btn btn-outline w-full flex items-center justify-center gap-2 mb-4">
          <FaGoogle className="text-lg" />
          Sign In with Google
        </button>
      

        <div className="divider">OR</div>

        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Type here..."
                className="input input-bordered w-full bg-surface text-text-light"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full bg-surface text-text-light pr-10"
              />
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
