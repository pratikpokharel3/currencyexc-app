import { useEffect, useState } from "react";

import { axios } from "./api/axios";
import type { Currency } from "./types";

import Select from "./components/Select";
import InputField from "./components/InputField";

interface Props {
  currencies: Currency[];
}

let exRate = 1;

const CurrencyConverter = ({ currencies }: Props) => {
  const [selectedCurrencyOne, setSelectedCurrencyOne] = useState("USD");
  const [selectedCurrencyTwo, setSelectedCurrencyTwo] = useState("NPR");
  const [exchangeAmountOne, setExchangeAmountOne] = useState(1);
  const [exchangeAmountTwo, setExchangeAmountTwo] = useState(1);

  useEffect(() => {
    getExchangeRates();
  }, []);

  async function getExchangeRates() {
    exRate = await getCurrencyRate("usd", "npr");

    setExchangeAmountTwo(exRate);
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
          currencyCode.toLowerCase(),
          selectedCurrencyTwo.toLowerCase()
        );

        exRate = rate;

        const newAmount = exchangeAmountTwo / rate;

        setExchangeAmountOne(parseFloat(newAmount.toFixed(4)));
        setSelectedCurrencyOne(currencyCode);

        return;
      }

      const rate = await getCurrencyRate(
        currencyCode.toLowerCase(),
        selectedCurrencyOne.toLowerCase()
      );

      exRate = rate;

      const newAmount = exchangeAmountOne / rate;

      setExchangeAmountTwo(parseFloat(newAmount.toFixed(4)));
      setSelectedCurrencyTwo(currencyCode);
    } catch (e) {}
  }

  function convertCurrencyOneTwo(amount: number) {
    const newValue = amount * exRate;

    setExchangeAmountOne(amount);
    setExchangeAmountTwo(parseFloat(newValue.toFixed(4)));
  }

  function convertCurrencyTwoOne(amount: number) {
    const newValue = amount / exRate;

    setExchangeAmountTwo(amount);
    setExchangeAmountOne(parseFloat(newValue.toFixed(4)));
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
          onChange={(e) => convertCurrencyOneTwo(e.target.valueAsNumber)}
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
          onChange={(e) => convertCurrencyTwoOne(e.target.valueAsNumber)}
        />
      </div>
    </>
  );
};

export default CurrencyConverter;
