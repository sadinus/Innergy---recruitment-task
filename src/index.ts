import { YearPrices } from "./data";
import data from "./data.json";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "photography"
  | "videoRecording"
  | "blurayPackage"
  | "twoDayEvent"
  | "weddingSession";

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => [];

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => {
  const yearPrices = getYearPrices(selectedYear);

  const basePrice = selectedServices.reduce(
    (acc: number, service: ServiceType) => {
      return acc + yearPrices[service];
    },
    0
  );

  const finalPrice = 0;
  //   const finalPrice = calculateDiscount(basePrice);

  return { basePrice, finalPrice };
};

const getYearPrices = (year: number) => {
  const yearPrices: YearPrices | undefined = data.prices[year];
  return yearPrices;
};
