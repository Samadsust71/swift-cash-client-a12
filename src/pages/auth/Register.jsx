import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-text-light">
      <div className="bg-gradient-to-t to-brand-primary/20 from-surface p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="text-center my-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            Don’t leave without your gift!
          </h2>
          <p>Sign up now and receive $2.00 as a sign up bonus! 💸</p>
        </div>

        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-surface text-text-light"
              />
            </div>
          </div>
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-surface text-text-light"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Photo field */}
          <div>
            <label className="block text-sm mb-1">Upload Photo</label>
            <div className="relative">
              <input
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>
          {/* Role Field */}
          <div>
            <label className="block text-sm mb-1">Role</label>
            <div className="relative">
              <select className="select select-bordered w-full">
                <option>Worker</option>
                <option>Buyer</option>
              </select>
            </div>
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

          <button type="submit" className="btn bg-brand-primary hover:bg-brand-primary/85 w-full mt-2 text-black">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
