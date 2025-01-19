import { FaHandHoldingUsd, FaMoneyBillWave, FaGift } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-6">
        {/* Heading */}
      <h2 className="text-2xl lg:text-4xl text-white font-bold text-center">
        We&apos;re the <span className="text-brand-primary">#1</span> site to make money.
        <span className="text-brand-primary"> Here’s why</span>
      </h2>
      </div>
      <div className=" text-white ">
      {/* Features Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-bg-main p-6 rounded-lg text-center">
          <FaHandHoldingUsd className="text-brand-primary text-5xl mx-auto" />
          <h3 className="mt-4 text-lg font-bold">Highest payouts</h3>
          <p className="text-white/80 mt-2 text-sm">
            Earn way more than on other sites. It’s our goal to help you make as much money as possible.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-bg-main p-6 rounded-lg text-center">
          <FaMoneyBillWave className="text-brand-primary text-5xl mx-auto" />
          <h3 className="mt-4 text-lg font-bold">Instant cashouts</h3>
          <p className="text-white/80 mt-2 text-sm">
            Need your earnings now? No problem. You can withdraw them almost instantly starting at $2.00.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-bg-main p-6 rounded-lg text-center">
          <FaGift className="text-brand-primary text-5xl mx-auto" />
          <h3 className="mt-4 text-lg font-bold">Daily bonuses</h3>
          <p className="text-white/80 mt-2 text-sm">
            Climb the daily bonus ladder, reach the leaderboard, or start a streak to earn extra rewards, for free.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FeaturesSection;
