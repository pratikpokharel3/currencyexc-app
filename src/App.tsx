import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { axios } from "./api/axios";
import type { Currency } from "./types";

import currenciesJson from "./currencies.json";

import CurrencyTable from "./CurrencyTable";
import CurrencyConverter from "./CurrencyConvert";

import Appbar from "./components/Appbar";
import Select from "./components/Select";
import Spinner from "./components/Spinner";
import SearchInput from "./components/SearchInput";

function App() {
  const [UILoading, setUILoading] = useState(true);
  const [baseCurrency, setBaseCurrency] = useState("npr");
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  const [filteredData, setFilteredData] = useState<Currency[]>([]);
  const [searchCurrency, setSearchCurrency] = useState("");
  const [isRefeshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getCurrencies(baseCurrency);
  }, []);

  async function getCurrencies(currency: string) {
    try {
      const resp = await axios.get(`/currencies/${currency}.json`);

      const c = [] as any;

      currenciesJson.forEach((v) => {
        c.push({
          ...v,
          rate: resp.data[baseCurrency][v.code.toLowerCase()]
        });
      });

      setCurrencyList(c);
      setFilteredData(c);

      setUILoading(false);
    } catch (e) {}
  }

  async function handleCurrencySelect(currencyName: string) {
    try {
      const currency = currencyName.toLowerCase();

      setIsRefreshing(true);

      const resp = await axios.get(`/currencies/${currency}.json`);

      const c = [] as any;

      currenciesJson.forEach((v) => {
        c.push({
          ...v,
          rate: resp.data[currency][v.code.toLowerCase()]
        });
      });

      setBaseCurrency(currency);
      setCurrencyList(c);
      setFilteredData(c);

      setIsRefreshing(false);
    } catch (e) {}
  }

  function handleCurrencySearch(currencyName: string) {
    const filtered = currencyList.filter((item) =>
      item.name.toLowerCase().includes(currencyName)
    );

    if (filtered.length === 0) {
      setFilteredData([]);
      setSearchCurrency(currencyName);
      return;
    }

    setSearchCurrency(currencyName);
    setFilteredData(filtered);
  }

  return (
    <>
      {UILoading && (
        <div className="grid min-h-screen place-items-center">
          <Spinner />
        </div>
      )}

      {!UILoading && (
        <>
          <Appbar />

          <main className="container mx-auto px-4 py-10">
            <div
              className={twMerge(
                "rounded-lg border border-gray-300 bg-white p-5 shadow-lg",
                isRefeshing && "pointer-events-none opacity-70"
              )}
            >
              <div className="grid grid-cols-12 items-start">
                <div className="col-span-12 lg:col-span-7">
                  <div className="flex items-center gap-x-4">
                    <div>Base Currency</div>

                    <div>
                      <Select
                        className="max-w-64"
                        value={baseCurrency.toUpperCase()}
                        onChange={(e) => handleCurrencySelect(e.target.value)}
                      >
                        {currencyList.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="mt-1 text-gray-500">
                    Showing exchange rates with {baseCurrency.toUpperCase()} as
                    base currency
                  </div>

                  <div className="mt-4 hidden lg:block">
                    <SearchInput
                      className="w-70"
                      placeholder="Search currency..."
                      value={searchCurrency}
                      onChange={(e) => handleCurrencySearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-12 mt-3 rounded-lg border border-gray-300 p-3 lg:col-span-5 lg:mt-0">
                  <CurrencyConverter currencies={currencyList} />
                </div>

                <div className="col-span-12 mt-4 lg:hidden">
                  <SearchInput
                    className="max-w-70"
                    placeholder="Search currency..."
                    value={searchCurrency}
                    onChange={(e) => handleCurrencySearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 overflow-auto">
                <CurrencyTable currencies={filteredData} />
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
