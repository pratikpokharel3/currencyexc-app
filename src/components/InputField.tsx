import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"input">;

const InputField = ({ type = "text", className, ...rest }: Props) => {
  const baseClass =
    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-700 focus:ring-blue-700";

  return (
    <input type={type} className={twMerge(baseClass, className)} {...rest} />
  );
};

export default InputField;
