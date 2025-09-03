import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"select">;

const Select = ({ className, children, ...rest }: Props) => {
  const baseClass =
    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-700 focus:ring-blue-700";

  return (
    <select className={twMerge(baseClass, className)} {...rest}>
      <option value="">Select option</option>
      {children}
    </select>
  );
};

export default Select;
