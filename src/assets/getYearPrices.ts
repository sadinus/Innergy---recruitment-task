import { PricesData, ServiceYear } from "../types";
import data from "./data.json";

export const getYearPrices = (selectedYear: ServiceYear) => {
  const pricesData: PricesData = data;
  const yearPrices = pricesData.prices[selectedYear] || {};

  return yearPrices;
};
