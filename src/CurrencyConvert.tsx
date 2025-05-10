import { useEffect, useState } from "react";

import { axios } from "./api/axios";
import type { Currency } from "./types";

import Select from "./components/Select";
import InputField from "./components/InputField";

interface Props {
  currencies: Currency[];
}

let rate1 = 1;
let rate2 = 1;

const CurrencyConverter = ({ currencies }: Props) => {
  const [selectedCurrencyOne, setSelectedCurrencyOne] = useState("USD");
  const [selectedCurrencyTwo, setSelectedCurrencyTwo] = useState("NPR");
  const [exchangeAmountOne, setExchangeAmountOne] = useState(1);
  const [exchangeAmountTwo, setExchangeAmountTwo] = useState(1);

  useEffect(() => {
    getExchangeRates();
  }, []);

  async function getExchangeRates() {
    rate1 = await getCurrencyRate("usd", "npr");
    rate2 = await getCurrencyRate("npr", "usd");

    setExchangeAmountTwo(rate1);
  }

  async function getCurrencyRate(currency1: string, currency2: string) {
    try {
      const resp = await axios.get(`/currencies/${currency1}.json`);

      return (await resp.data[currency1][currency2].toFixed(4)) as number;
    } catch (e) {}

    return 1;
  }

  async function handleCurrencyChange(type: string, currencyCode: string) {
    try {
      if (type === "one") {
        const rate = await getCurrencyRate(
          selectedCurrencyTwo.toLowerCase(),
          currencyCode.toLowerCase()
        );

        rate2 = rate;

        setSelectedCurrencyOne(currencyCode);

        convertCurrencyOne(exchangeAmountTwo);

        return;
      }

      const rate = await getCurrencyRate(
        selectedCurrencyOne.toLowerCase(),
        currencyCode.toLowerCase()
      );

      rate1 = rate;

      setSelectedCurrencyTwo(currencyCode);

      convertCurrencyTwo(exchangeAmountOne);
    } catch (e) {}
  }

  function convertCurrencyTwo(rate: number) {
    const newRate = rate1 * rate;

    setExchangeAmountOne(rate);
    setExchangeAmountTwo(parseFloat(newRate.toFixed(4)));
  }

  function convertCurrencyOne(rate: number) {
    const newRate = rate2 * rate;

    setExchangeAmountTwo(rate);
    setExchangeAmountOne(parseFloat(newRate.toFixed(4)));
  }

  return (
    <>
      <div className="flex gap-x-2">
        <Select
          value={selectedCurrencyOne}
          onChange={(e) => handleCurrencyChange("one", e.target.value)}
        >
          {currencies.map((currency) => (
            <option value={currency.code} key={currency.code}>
              {currency.name}
            </option>
          ))}
        </Select>

        <InputField
          min="0"
          type="number"
          value={exchangeAmountOne}
          onChange={(e) => convertCurrencyTwo(e.target.valueAsNumber)}
        />
      </div>

      <div className="mt-2 flex gap-x-2">
        <Select
          value={selectedCurrencyTwo}
          onChange={(e) => handleCurrencyChange("two", e.target.value)}
        >
          {currencies.map((currency) => (
            <option value={currency.code} key={currency.code}>
              {currency.name}
            </option>
          ))}
        </Select>

        <InputField
          min="0"
          type="number"
          value={exchangeAmountTwo}
          onChange={(e) => convertCurrencyOne(e.target.valueAsNumber)}
        />
      </div>
    </>
  );
};

export default CurrencyConverter;
