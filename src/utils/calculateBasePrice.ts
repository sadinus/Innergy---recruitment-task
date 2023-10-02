import { ServiceType, YearPrices } from "../types";

export const calculateBasePrice = (
  selectedServices: ServiceType[],
  yearPrices: YearPrices
): number => {
  return selectedServices.reduce(
    (acc: number, service: ServiceType) => acc + (yearPrices[service] || 0),
    0
  );
};
