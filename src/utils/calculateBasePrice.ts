import { ServiceType, YearPrices } from "../types";

export const calculateBasePrice = (
  selectedServices: ServiceType[],
  yearPrices: YearPrices
) => {
  const basePrice = selectedServices.reduce(
    (acc: number, service: ServiceType) => acc + yearPrices[service],
    0
  );

  return basePrice;
};
