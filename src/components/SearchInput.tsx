import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"input">;

const SearchInput = ({ className, ...rest }: Props) => {
  return (
    <div className="relative">
      <input
        type="text"
        className={twMerge(
          "peer block w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 ps-10 text-sm text-white placeholder:text-neutral-400 focus:border-neutral-700 focus:ring-neutral-700 focus:placeholder:text-white",
          className
        )}
        {...rest}
      />

      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-neutral-400 peer-focus:text-white">
        <svg
          fill="none"
          aria-hidden="true"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-current transition-colors"
        >
          <path
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
