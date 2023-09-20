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

  const highestDiscount = Math.max(
    weddingDiscount,
    photographyAndVideoDiscount
  );

  return highestDiscount;
};

const getWeddingSessionDiscount = (
  fullPrice: number,
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => {
  if (
    selectedYear === 2022 &&
    selectedServices.includes("Photography") &&
    selectedServices.includes("WeddingSession")
  ) {
    return fullPrice;
  }

  if (
    (selectedServices.includes("Photography") ||
      selectedServices.includes("VideoRecording")) &&
    selectedServices.includes("WeddingSession")
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
