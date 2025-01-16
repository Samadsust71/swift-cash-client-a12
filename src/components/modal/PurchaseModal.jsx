import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from 'prop-types';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../form/CheckoutForm";
import useAuth from "../../hooks/useAuth";



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PurchaseModal = ({ closeModal, isOpen,coinPackage}) => {
  const {user} = useAuth()
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase Coin
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Buyer:{user?.displayName || ""}</p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Price:{coinPackage?.price || 0} $ </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Coins:{coinPackage?.coins || 0}</p>
                </div>

                {/* CheckoutForm */}
                <Elements stripe={stripePromise}>
                  {/* Form component */}
                  <CheckoutForm coinPackage={coinPackage} closeModal={closeModal} />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
PurchaseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  coinPackage: PropTypes.object.isRequired,
};


export default PurchaseModal;
