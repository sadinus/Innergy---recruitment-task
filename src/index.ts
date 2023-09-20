import { calculateDiscount } from "./calculateDiscount";
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
  const yearPrices: YearPrices | undefined = data.prices[selectedYear];
  const basePrice = calculateBasePrice(selectedServices, yearPrices);

  const discount = calculateDiscount(
    selectedServices,
    selectedYear,
    yearPrices
  );
  const finalPrice = basePrice - discount;

  return { basePrice, finalPrice };
};

const calculateBasePrice = (
  selectedServices: ServiceType[],
  yearPrices: YearPrices
) => {
  const basePrice = selectedServices.reduce(
    (acc: number, service: ServiceType) => acc + yearPrices[service],
    0
  );

  return basePrice;
};
