import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slideImage1 from "../../assets/banner-image/slide1.jpeg";
import slideImage2 from "../../assets/banner-image/slide2.jpeg";
import slideImage3 from "../../assets/banner-image/slide4.jpeg";
import { Link } from "react-router-dom";


const Banner = () => {
  const slides = [
    {
      title: "Your Gateway to Digital Success!",
      subtitle: "Join our platform and complete tasks to earn cash.",
      btnText: "Sign Up Now!",
      image: slideImage1,
    },
    {
      title: "Earn Rewards for Your Skills!",
      subtitle: "Connect with opportunities to grow your career.",
      btnText: "Explore Opportunities!",
      image: slideImage2,
    },
    {
      title: "Unleash the Power of Productivity!",
      subtitle: "Fast, secure, and rewarding experiences.",
      btnText: "Get Started Today!",
      image: slideImage3,
    },
  ];

  return (
    <div className="relative">
      <Swiper
        style={{
          "--swiper-pagination-color": "#04EA8E",
          "--swiper-pagination-bullet-inactive-color": "#17413E",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className=""
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative ">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[511px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t to-surface from-brand-primary/20 bg-opacity-50 flex flex-col justify-center items-center text-white space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center w-11/12 mx-auto text-white">
                {slide.title}
              </h2>
              <p className="mt-2 lg:text-xl text-center text-text-muted  w-11/12 mx-auto">
                {slide.subtitle}
              </p>
             <Link to={'/register'} className="bg-brand-primary shadow-brand-primary/10 shadow-inner text-gray-900  px-4 py-3 rounded-lg  font-semibold hover:scale-105 transition duration-300 ">{slide.btnText}</Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
