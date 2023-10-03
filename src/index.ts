import { getYearPrices } from "./assets";
import {
  calculateBasePrice,
  calculateDiscount,
  deselectService,
  selectService,
} from "./utils";
import { ServiceType, ServiceYear } from "./types";

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
  const { type, service } = action;

  if (type === "Select") {
    return selectService(service, previouslySelectedServices);
  }

  if (type === "Deselect") {
    return deselectService(service, previouslySelectedServices);
  }

  return previouslySelectedServices;
};

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
): { basePrice: number; finalPrice: number } => {
  const yearPrices = getYearPrices(selectedYear);
  const basePrice = calculateBasePrice(selectedServices, yearPrices);

  const discount = calculateDiscount(
    selectedServices,
    selectedYear,
    yearPrices
  );
  const finalPrice = basePrice - discount;

  return { basePrice, finalPrice };
};
