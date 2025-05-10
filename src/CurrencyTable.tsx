import type { Currency } from "./types";

interface Props {
  currencies: Currency[];
}

const CurrencyTable = ({ currencies }: Props) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-gray-300">
          <th className="border border-neutral-800 bg-neutral-900 px-5 pt-2 pb-1.5 font-medium">
            Currency Name
          </th>
          <th className="border border-neutral-800 bg-neutral-900 px-5 pt-2 pb-1.5 font-medium">
            Country
          </th>
          <th className="border border-neutral-800 bg-neutral-900 px-5 pt-2 pb-1.5 font-medium">
            Country Code
          </th>
          <th className="border border-neutral-800 bg-neutral-900 px-5 pt-2 pb-1.5 font-medium">
            Rate
          </th>
        </tr>
      </thead>

      <tbody>
        {currencies.map((c) => (
          <tr className="text-gray-400" key={c.code}>
            <td className="border border-neutral-800 px-5 pt-2 pb-1.5 text-gray-300">
              {c.name}
            </td>

            <td className="border border-neutral-800 px-5 pt-2 pb-1.5">
              <div className="flex flex-wrap items-center gap-x-4">
                <img width="24" height="24" src={c.flag} />
                <span>{c.country}</span>
              </div>
            </td>

            <td className="border border-neutral-800 px-5 pt-2 pb-1.5">
              {c.code}
            </td>

            <td className="border border-neutral-800 px-5 pt-2 pb-1.5">
              {c.rate?.toFixed(2) ?? "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
