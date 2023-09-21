import { ServiceType, ServiceYear } from ".";
import { YearPrices } from "./index";

export const calculateDiscount = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear,
  yearPrices: YearPrices
) => {
  const weddingDiscount = getWeddingSessionDiscount(
    yearPrices.WeddingSession,
    selectedServices,
    selectedYear
  );
  const photographyAndVideoDiscount = getPhotographyAndVideoDiscount(
    selectedServices,
    yearPrices
  );

  const finalDiscount = weddingDiscount + photographyAndVideoDiscount;

  return finalDiscount;
};

const getWeddingSessionDiscount = (
  fullPrice: number,
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => {
  if (
    selectedYear === 2022 &&
    selectedServices.includes("WeddingSession") &&
    selectedServices.includes("Photography")
  ) {
    return fullPrice;
  }

  if (
    selectedServices.includes("WeddingSession") &&
    (selectedServices.includes("Photography") ||
      selectedServices.includes("VideoRecording"))
  ) {
    return 300;
  }

  return 0;
};

const getPhotographyAndVideoDiscount = (
  selectedServices: ServiceType[],
  yearPrices: YearPrices
) => {
  if (
    selectedServices.includes("Photography") &&
    selectedServices.includes("VideoRecording")
  ) {
    return (
      yearPrices.Photography +
      yearPrices.VideoRecording -
      yearPrices.PhotographyAndVideo
    );
  }

  return 0;
};
