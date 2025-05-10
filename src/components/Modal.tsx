import { useEffect } from "react";

type Props = React.ComponentPropsWithRef<"div"> & {
  close: () => void;
};

const Modal = ({ close, ref }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-full w-full bg-black/40"></div>

      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 z-20 w-10/12 -translate-1/2 rounded-lg border border-neutral-800 bg-neutral-900 lg:w-3/5 xl:w-1/2 2xl:w-2/5"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 p-4">
          <h3 className="text-xl font-semibold text-white">About</h3>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-neutral-800"
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

        <div className="p-4 text-base text-neutral-400">
          <p>
            A simple and efficient web app that shows exchange rates of
            different currencies. The app also allows users to convert between
            currencies using exchange rate data from a public API. It's designed
            for quick conversions with a clean and responsive user interface.
          </p>

          <p className="mt-3">
            <span className="font-medium">Note</span>: Exchange rate data is
            updated daily and may differ slightly from official bank rates,
            which often include additional fees or variations.
          </p>

          <p className="mt-4 text-center">
            - {new Date().getFullYear()} CurrencyExc
          </p>
        </div>
      </div>
    </>
  );
};

export default Modal;
