import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const NotificationModal = ({ closeModal, isModalOpen, notifications }) => {

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
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

        <div className="fixed inset-0 overflow-y-scroll">
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-surface p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-white"
                >
                   All Notifications
                </DialogTitle>

                <div className="mt-4 space-y-4">
                  {notifications?.length > 0 ? (
                    notifications.slice(0,4)?.map((notification) => (
                      <div
                        key={notification._id}
                        className="p-4 rounded-lg bg-gradient-to-t to-brand-primary/20 from-surface text-white shadow"
                      >
                        <p className="text-text-muted text-xs mb-2">
                          Time:
                          {format(new Date(notification?.Time || new Date()), "dd/MM/yyyy 'at' h:mm a")}
                        </p>
                        <h3>{notification?.message}</h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-white">
                      No notifications available.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center gap-2 rounded-md bg-[#2F3043] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#2F3043] data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
NotificationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  notifications: PropTypes.array,
};

export default NotificationModal;
