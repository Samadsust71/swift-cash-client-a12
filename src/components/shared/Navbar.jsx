import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { RiCoinsFill, RiMenu2Fill } from "react-icons/ri";
import logo from "../../assets/logo-3.png";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import userIcon from "../../assets/userIcon.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const { signOutUser, user } = useAuth();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Log out successfully!");
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong");
      });
  };
  const links = (
    <>
      <li>
        <a
          href="https://github.com/Samadsust71"
          className="hover:text-brand-primary  active:bg-surface active:text-brand-primary"
          target="_blank"
        >
          Join as Developer
        </a>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-suface text-brand-primary "
                : "text-white hover:bg-suface hover:text-brand-primary"
            }
            to={"/dashboard"}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-bg-main w-full fixed top-0 left-0 h-[66px] z-20">
      <div className="navbar p-0 w-11/12 mx-auto text-text-light">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenu2Fill />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
            <h1 className="uppercase text-2xl font-bold hidden md:block">
              <span className="text-brand-primary">swift</span>cash
            </h1>
          </div>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <ul className="px-1 hidden lg:flex gap-2">{links}</ul>
          {user && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg">
            <div className="p-2 bg-white rounded-full flex items-center justify-center">
              
              <RiCoinsFill className="text-green-600 text-lg" />
            </div>
            <span className="text-lg font-semibold">10</span>
          </div>
          )}
          {user && (
            <div className="inline-flex items-center gap-2 rounded-md bg-[#2F3043] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#2F3043] data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              <img
                src={user.photoURL || userIcon}
                className="h-10 w-10 rounded-full object-cover"
                alt="user"
              />
              <p>{user?.displayName || "user"}</p>
            </div>
          )}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-md bg-[#2F3043] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#2F3043] data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaUser />
              Sign Out
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 rounded-md bg-[#2F3043] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#2F3043] data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <FaUser />
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                animate={{ transition: { ease: "easeInOut" } }}
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 rounded-md bg-brand-primary py-1.5 px-3 text-sm/6 font-semibold text-gray-900 shadow-inner shadow-white/10 focus:outline-none data-[hover]:brand-primary data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <IoKey />
                Sign Up
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
