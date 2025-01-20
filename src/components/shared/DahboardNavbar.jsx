import logo from "../../assets/logo-3.png";
import coinIcon from "../../assets/coin.gif";
import userIcon from "../../assets/userIcon.jpg";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../Loading";
import Notifications from "./Notifications";
const DahboardNavbar = () => {
  const { user, loading } = useAuth();
  const [adminInfo] = useAdmin();
  const [userInfo] = useRole();
  const navigate = useNavigate();
  const contents = (
    <>
      {user && (
        <li>
          <div className="inline-flex items-center gap-2 rounded-md bg-[#2F3043] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-[#2F3043]/10 focus:outline-none ">
            <p>{userInfo?.role || "Worker"}</p>
          </div>
        </li>
      )}
      {user && (
        <li>
          <div className="flex items-center bg-[#17413E] rounded-md pr-3 font-semibold text-white shadow-inner shadow-brand-primary/10 focus:outline-none gap-1">
            <img
              src={coinIcon}
              className="h-10 w-10  object-cover rounded-l-md"
              alt="user"
            />

            <div className="">
              {userInfo?.role === "Admin"
                ? adminInfo?.totalAvailableCoins
                : userInfo?.coins}
            </div>
          </div>
        </li>
      )}
      {user && (
        <li>
          <div className="inline-flex  items-center gap-2 rounded-md bg-[#2F3043] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-[#2F3043]/10 focus:outline-none ">
            <img
              src={user.photoURL || userIcon}
              className="h-7 w-7 rounded-full object-cover sm:hidden lg:block"
              alt="user"
            />
            <p>{user?.displayName?.slice(0, 6) || "user"}</p>
          </div>
        </li>
      )}
    </>
  );
  if (loading) return <Loading />;
  return (
    <div className="bg-bg-main w-full fixed top-0 left-0 h-24 inset-0 z-20 shadow-md border-b border-brand-primary/10 pt-4">
      <div className="navbar p-0 container mx-auto text-text-light bg-bg-main">
        <div className="navbar-start">
          {/*drawer open btn for sm device */}
          <div className="drawer-content flex flex-col items-center justify-center bg-bg-main">
            <label
              htmlFor="my-drawer-2"
              className="btn  drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div
            onClick={() => navigate("/")}
            className="ml-2 lg:ml-0 flex items-center cursor-pointer"
          >
            <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
            <h1 className="uppercase text-2xl font-bold hidden md:block">
              <span className="text-brand-primary">swift</span>cash
            </h1>
          </div>
        </div>

        <div className="navbar-end w-[75%]">
          {/* nav links for lg device */}
          <div className="hidden  flex-shrink-0 lg:flex items-center gap-2 mr-2">
            <ul tabIndex={0} className=" flex items-center gap-6">
              {contents}
            </ul>
          </div>

          {/* drop down for sm device  */}
          <div className="dropdown dropdown-end block lg:hidden bg-bg-main">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user" src={user?.photoURL || userIcon} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-bg-main rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {contents}
            </ul>
          </div>

          {/* notification indicator */}
          <div className="ml-4">
          <Notifications userEmail={user?.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DahboardNavbar;
