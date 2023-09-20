import { calculateDiscount } from "./calculateDiscount";
import data from "./data.json";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";
export type YearPrices = {
  [K in ServiceType]: number;
} & { PhotographyAndVideo: number };

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  const { type, service } = action;
  const containsService = previouslySelectedServices.includes(service);
  const shouldAddService = validateService(service, previouslySelectedServices);

  if (type === "Select" && !containsService && shouldAddService) {
    return [...previouslySelectedServices, service];
  }

  if (type === "Deselect" && containsService) {
    return previouslySelectedServices.filter((x) => x !== service);
  }

  return previouslySelectedServices;
};

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

const validateService = (
  service: ServiceType,
  previouslySelectedServices: ServiceType[]
) => {
  if (
    service === "BlurayPackage" &&
    !previouslySelectedServices.includes("VideoRecording")
  ) {
    return false;
  }

  if (
    service === "TwoDayEvent" &&
    !previouslySelectedServices.includes("Photography") &&
    !previouslySelectedServices.includes("VideoRecording")
  ) {
    return false;
  }

  return true;
};
