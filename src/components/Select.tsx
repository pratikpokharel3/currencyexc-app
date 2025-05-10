import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"select">;

const Select = ({ className, children, ...rest }: Props) => {
  return (
    <select
      className={twMerge(
        "block w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 text-sm text-white focus:border-neutral-700 focus:ring-neutral-700",
        className
      )}
      {...rest}
    >
      <option value="">Select option</option>
      {children}
    </select>
  );
};

export default Select;
