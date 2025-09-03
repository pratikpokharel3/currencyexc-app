import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"input">;

const SearchInput = ({ className, ...rest }: Props) => {
  return (
    <div className="relative">
      <input
        type="text"
        className={twMerge(
          "peer block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm focus:border-blue-700 focus:ring-blue-700",
          className
        )}
        {...rest}
      />

      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500 peer-focus:text-blue-700">
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
