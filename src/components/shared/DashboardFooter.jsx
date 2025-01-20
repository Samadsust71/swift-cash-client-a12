import {  FaFacebookF, FaGithub,  FaLinkedinIn,  FaTwitter } from "react-icons/fa"

import logo from "../../assets/logo-3.png"

const DashboardFooter = () => {
  return (
    <div className="bg-bg-main text-white shadow-md border-t border-brand-primary/10">
          <section className="py-5">
            <div className="lg:pl-4 container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Left Section */}
              <div>
                <div
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
                href="https://github.com/Samadsust71"
                target="blank"
                className="bg-surface/30 hover:bg-white/90 rounded-full p-2 text-white hover:text-gray-900"
                aria-label="Instagram"
              >
                <FaGithub />
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
                
              </div>
              <aside className="text-center text-xs text-text-muted mt-8">
              <p>
                Copyright © {new Date().getFullYear()} - All right reserved by Swift
                Cash
              </p>
            </aside>
            </div>
            
          </section>
        </div>
  )
}

export default DashboardFooter
