import Banner from "../../components/banner/Banner";
import BestWorker from "../../components/best-workers/BestWorker";
import CashoutSection from "../../components/stats-section/CashoutSection";
import FAQSection from "../../components/stats-section/FAQSection";
import FeaturesSection from "../../components/stats-section/FeaturesSection";
import StatsSection from "../../components/stats-section/StatsSection";
import TrustSection from "../../components/stats-section/TrustSection";
import Testimonial from "../../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="container mx-auto space-y-10 mt-10">
        
        <StatsSection />
        <BestWorker />
        <CashoutSection />
        <TrustSection/>
        <Testimonial />
        <FeaturesSection />
        <FAQSection />
      </div>
    </div>
  );
};

export default Home;
