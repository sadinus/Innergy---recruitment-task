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
  const shouldSelectService = validateService(
    service,
    previouslySelectedServices
  );

  if (type === "Select" && !containsService && shouldSelectService) {
    return [...previouslySelectedServices, service];
  }

  if (type === "Deselect" && containsService) {
    const services = deselectRelatedService(
      service,
      previouslySelectedServices
    );
    return services;
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

const deselectRelatedService = (
  service: ServiceType,
  previouslySelectedServices: ServiceType[]
) => {
  if (
    (service === "Photography" || service === "VideoRecording") &&
    !["Photography", "VideoRecording"].every((x: ServiceType) =>
      previouslySelectedServices.includes(x)
    ) &&
    previouslySelectedServices.includes("TwoDayEvent")
  ) {
    return previouslySelectedServices.filter(
      (x) => x !== service && x !== "TwoDayEvent"
    );
  }

  if (
    service === "VideoRecording" &&
    previouslySelectedServices.includes("BlurayPackage")
  ) {
    return previouslySelectedServices.filter(
      (x) => x !== service && x !== "BlurayPackage"
    );
  }

  return previouslySelectedServices.filter((x) => x !== service);
};
