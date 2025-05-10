import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"input">;

const InputField = ({ type = "text", className, ...rest }: Props) => {
  return (
    <input
      type={type}
      className={twMerge(
        "block w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 text-sm text-white focus:border-neutral-700 focus:ring-neutral-700",
        className
      )}
      {...rest}
    />
  );
};

export default InputField;
