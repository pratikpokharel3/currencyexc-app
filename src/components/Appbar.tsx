import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Modal from "./Modal";

const Appbar = () => {
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  // @ts-expect-error
  useOnClickOutside(ref, closeModal);

  return (
    <>
      {modal && <Modal ref={ref} close={closeModal} />}

      <nav className="border-b border-neutral-800 bg-black text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">CurrencyExc</h1>

          <span className="hover:cursor-pointer" onClick={openModal}>
            About
          </span>
        </div>
      </nav>
    </>
  );
};

export default Appbar;
