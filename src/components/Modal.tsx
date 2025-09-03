import { forwardRef, useEffect } from "react";

interface Props {
  close: () => void;
}

const Modal = forwardRef<HTMLDivElement, Props>(({ close }, ref) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-full w-full bg-black/50"></div>

      <div
        ref={ref}
        className="absolute top-1/2 left-1/2 z-20 w-10/12 -translate-1/2 rounded-md border border-gray-300 bg-white p-3 shadow-lg sm:w-[500px]"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">About</h3>

          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded text-gray-600 hover:bg-gray-100 hover:text-black"
            onClick={close}
          >
            <svg
              fill="none"
              className="h-3 w-3"
              aria-hidden="true"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="mt-2 border-t border-gray-300 pt-3 text-gray-600">
          <p>
            CurrencyExc is a web app that shows exchange rates of different
            currencies and allows users to convert between currencies using
            exchange rate data from a public API. It's designed for quick
            conversions with a clean and responsive user interface.
          </p>

          <p className="mt-3">
            <span className="font-medium">Note</span>: Exchange rate data is
            updated daily and may differ slightly from official bank rates,
            which often include additional fees or variations.
          </p>

          <p className="mt-2 text-center">
            - CurrencyExc, {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </>
  );
});

export default Modal;
