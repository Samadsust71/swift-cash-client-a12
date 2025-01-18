import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/logo-3.png";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-bg-main text-white shadow-md border-t border-brand-primary/10">
      <section className="py-10">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div>
            <div
              onClick={() => navigate("/")}
              className="lg:ml-0 flex items-center cursor-pointer"
            >
              <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
              <h1 className="uppercase text-2xl font-bold">
                <span className="text-brand-primary">swift</span>cash
              </h1>
            </div>
            {/* Social Icons */}
            <div className="flex mt-2 space-x-4 transition-colors duration-100 ease-in-out">
              <a
                href="https://www.facebook.com/samad.reza.31"
                target="blank"
                className="bg-surface/30 hover:bg-blue-500 rounded-full p-2 text-white"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/_samad_reza_"
                target="blank"
                className="bg-surface/30 hover:bg-rose-700 rounded-full p-2 text-white"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/SamadReza71"
                target="blank"
                className="bg-surface/30 hover:bg-blue-500 rounded-full p-2 text-white"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/abdus-samad-reza"
                target="_blank"
                className="bg-surface/30 hover:bg-blue-500 rounded-full p-2 text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>

            {/* Contact Information */}
           
          </div>
          <div className="">
              <p className="flex items-center space-x-2">
                <FaPhoneAlt className="" />
                <span>+88 01748-307587</span>
              </p>
              <a
                href={"mailto: samadsust71@gmail.com"}
                className="flex items-center space-x-2 mt-2"
              >
                <FaEnvelope className="" />
                <span>samadsust71@gmail.com</span>
              </a>
              <p className="flex items-center space-x-2 mt-2">
                <FaMapMarkerAlt className="" />
                <span>Sylhet, Bangladesh</span>
              </p>
            </div>
          {/* Right Section */}
          <div className="">
            <h3 className="text-xl font-bold leading-none">Subscribe for Newsletter</h3>
            <form className="mt-4 space-y-4">
              <div>
                <input
                  placeholder="Enter Your Email"
                  type="email"
                  className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
                  rows="4"
                ></input>
              </div>
              <button
                type="button"
                className="px-4 font-semibold text-sm rounded-md py-2  bg-brand-primary text-gray-900 border-none outline-none hover:bg-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <aside className="text-center text-xs text-text-muted mt-8">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Swift
            Cash
          </p>
        </aside>
      </section>
    </div>
  );
};

export default Footer;
