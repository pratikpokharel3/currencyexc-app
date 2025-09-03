import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Modal from "./Modal";

const Appbar = () => {
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  // @ts-ignore
  useOnClickOutside(modalRef, closeModal);

  return (
    <>
      {modal && <Modal ref={modalRef} close={closeModal} />}

      <header className="bg-blue-700">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 text-white">
          <h1 className="text-2xl font-semibold">CurrencyExc</h1>

          <button type="button" className="hover:underline" onClick={openModal}>
            About
          </button>
        </div>
      </header>
    </>
  );
};

export default Appbar;
