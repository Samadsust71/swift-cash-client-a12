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
    <div className="p-6  text-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Purchase Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((coinPackage, idx) => (
          <div
            key={idx}
            className="card bg-gradient-to-r from-bg-surface to-bg-main text-white shadow-md p-4 rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold">{coinPackage.coins} Coins</h3>
            <p className="text-lg">=</p>
            <p className="text-2xl font-bold">${coinPackage.price}</p>
            <button onClick={() => {
              setCoinPackage({coins:coinPackage?.coins, price:coinPackage?.price})
              setIsOpen(true)}} className="btn mt-4">
              Buy Now
            </button>
          </div>
        ))}
        <PurchaseModal coinPackage={coinPackage} closeModal={closeModal} isOpen={isOpen} />
      </div>

      
    </div>
  );
};

export default BuyerPurchaseCoin;
