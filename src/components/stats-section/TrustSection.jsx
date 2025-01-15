

const TrustSection = () => {
  return (
    <div className="flex flex-col md:flex-row  text-white rounded-md">
      {/* Left Section */}
      <div className="flex-1 p-8 flex flex-col justify-center bg-brand-primary rounded-md">
        <h2 className="text-4xl font-bold mb-4">
          Global Trust of <span className="text-5xl">1 Million</span> Businesses and Counting
        </h2>
        <p className="mb-6">
          Connect with skilled professionals, streamline collaboration, and unlock success. Join now and redefine your work experience!
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Connect with pros collaborate better succeed faster
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Redefine work Join now for a better experience
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Streamline collaboration unlock success
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Join us redefine your work experience
          </li>
        </ul>
        <button className="bg-white text-brand-primary px-6 py-2 rounded-lg shadow-md hover:bg-gray-200">
          Get Started
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative">
        <video
          className="w-full h-full object-cover rounded-lg"
          src="https://drive.google.com/file/d/1WHTLKnhrRMntz_T6QvQ1BoG1zVlIJZhM/view"
          controls
          poster="/path-to-poster-image.jpg"
        />
      </div>
    </div>
  );
};

export default TrustSection;
