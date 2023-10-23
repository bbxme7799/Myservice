import React from "react";
import ModalHeader from "./ModalHeader";
import AddModal from "./AddModal";

const ModalOverlay = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="backdrop-blur-5 bg-opacity-50 bg-black absolute inset-0">
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center"></div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
              <ModalHeader closeModal={closeModal} />
              <AddModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;
