import { useEffect, useState } from "react";
import { FaCoins, FaDollarSign } from "react-icons/fa"
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  useMutation } from "@tanstack/react-query";




const WorkerWithdrawls = () => {
  const {user} = useAuth()
  const [userInfo] = useRole()
  const axiosSecure = useAxiosSecure()
  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  
  useEffect(() => {
    if (userInfo?.coins !== undefined) {
      setUserCoins(userInfo.coins);
    }
  }, [userInfo]);


  const handleCoinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if(value<0) {
      
      setCoinToWithdraw(0)
      setWithdrawalAmount(0)
      return
    }
    if(value > userCoins){
      setCoinToWithdraw(0)
      setWithdrawalAmount(0)
      return
    }
      setCoinToWithdraw(value);
      setWithdrawalAmount(value / 20); // Convert coins to dollars 
    
  };
 // Mutation to handle API call
 const { isPending, mutateAsync } = useMutation({
  mutationFn: async (withdrawalData) => {
    await axiosSecure.post("/withdrawals", withdrawalData);
  },
  onSuccess: () => {
    toast.success(
      "Withdrawal request submitted successfully!"
    );
    setCoinToWithdraw(0);
      setWithdrawalAmount(0);
      setPaymentSystem("");
      setAccountNumber("");
  },
  onError: (error) => {
    toast.error(error?.response?.data?.message || "Failed to submit request.");
  },
});
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (coinToWithdraw > userInfo?.coins) {
      toast.error("Insufficient coins");
      return;
    }
    if (!paymentSystem || !accountNumber) {
      toast.error("Please fill in all fields.");
      return;
    }

    const withdrawalData = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: coinToWithdraw,
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    await mutateAsync(withdrawalData);
  };

 
  return (
    <div className="bg-surface  text-white p-6 rounded-md shadow-md max-w-lg mx-auto">
    <h1 className="text-2xl font-bold mb-4 text-center">Withdraw Coins</h1>

    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <FaCoins className="text-yellow-400" size={24} />
        <p>Total Coins: <span className="font-bold">{userCoins}</span></p>
      </div>
      <div className="flex items-center gap-2">
        <FaDollarSign className="text-green-400" size={24} />
        <p>Equivalent: <span className="font-bold">${(userCoins / 20).toFixed(2)}</span></p>
      </div>
    </div>

    <form  onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Coin to Withdraw</label>
        <input
          type="number"
          className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none"
          placeholder="Enter coin amount"
          value={coinToWithdraw}
          onChange={handleCoinInputChange}
          
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Withdrawal Amount ($)</label>
        <input
          type="number"
          className="w-full p-2 bg-gray-800 text-gray-400 rounded-md"
          value={withdrawalAmount?.toFixed(2) || 0}
          readOnly
          disabled
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Select Payment System</label>
        <select
          className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none"
          value={paymentSystem}
          required
          onChange={(e) => setPaymentSystem(e.target.value)}
        >
          <option value="" disabled>Select payment system</option>
          <option value="Bkash">Bkash</option>
          <option value="Rocket">Rocket</option>
          <option value="Nagad">Nagad</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Account Number</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none"
          placeholder="Enter account number"
          value={accountNumber}
          required
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>

      {userInfo?.coins >= 200 ? (
        <button
          type="submit"
          className="w-full bg-brand-primary/90 hover:bg-brand-primary/70 text-black font-semibold py-2 rounded-md transition-all"
        >
          {isPending?"Withdrawing...":"Withdraw"}
          
        </button>
      ) : (
        <p className="text-red-500 text-center">Insufficient coins (Minimum 200 coins required).</p>
      )}
    </form>
  </div>
  )
}

export default WorkerWithdrawls
