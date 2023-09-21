import { data } from "./assets";
import {
  calculateBasePrice,
  calculateDiscount,
  deselectRelatedService,
  validateService,
} from "./utils";
import { ServiceType, ServiceYear, YearPrices } from "./types";

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
export { ServiceYear };
