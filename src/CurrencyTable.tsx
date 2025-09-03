import type { Currency } from "./types";

interface Props {
  currencies: Currency[];
}

const CurrencyTable = ({ currencies }: Props) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left">
          <th className="border border-gray-300 px-5 pt-2 pb-1.5 font-medium">
            Currency Name
          </th>
          <th className="border border-gray-300 px-5 pt-2 pb-1.5 font-medium">
            Country
          </th>
          <th className="border border-gray-300 px-5 pt-2 pb-1.5 font-medium">
            Country Code
          </th>
          <th className="border border-gray-300 px-5 pt-2 pb-1.5 font-medium">
            Rate
          </th>
        </tr>
      </thead>

      <tbody>
        {currencies.length === 0 && (
          <tr>
            <td
              colSpan={4}
              className="te border border-gray-300 px-5 pt-3 pb-2.5 text-center"
            >
              No currencies found.
            </td>
          </tr>
        )}

        {currencies.map((c) => (
          <tr key={c.code}>
            <td className="border border-gray-300 px-5 pt-2 pb-1.5">
              {c.name}
            </td>

            <td className="border border-gray-300 px-5 pt-2 pb-1.5">
              <div className="flex flex-wrap items-center gap-x-4">
                <img width="24" height="24" src={c.flag} />
                <span>{c.country}</span>
              </div>
            </td>

            <td className="border border-gray-300 px-5 pt-2 pb-1.5">
              {c.code}
            </td>

            <td className="border border-gray-300 px-5 pt-2 pb-1.5">
              {c.rate?.toFixed(2) ?? "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
