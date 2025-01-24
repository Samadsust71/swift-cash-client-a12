import { useState } from "react";
import PurchaseModal from "../../../components/modal/PurchaseModal";

const BuyerPurchaseCoin = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [coinPackage, setCoinPackage] = useState({})
  const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div className="my-10 text-white w-full mx-auto">
      <h2 className="text-2xl font-bold mb-10 text-center">Purchase Coins</h2>
      <div className="max-w-2xl mx-auto  grid grid-cols-1 md:grid-cols-2  gap-6">
        {coinPackages.map((coinPackage, idx) => (
          <div
            key={idx}
            className="card bg-gradient-to-t to-brand-primary/20 from-surface text-white shadow-md p-4 rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold">{coinPackage.coins} Coins</h3>
            <p className="text-lg">=</p>
            <p className="text-2xl font-bold">${coinPackage.price}</p>
            <button onClick={() => {
              setCoinPackage({coins:coinPackage?.coins, price:coinPackage?.price})
              setIsOpen(true)}} className="btn mt-4 bg-surface text-brand-primary outline-none border-none hover:bg-brand-primary/20">
              Purchase Now
            </button>
          </div>
        ))}
        <PurchaseModal coinPackage={coinPackage} closeModal={closeModal} isOpen={isOpen} />
      </div>

      
    </div>
  );
};

export default BuyerPurchaseCoin;
