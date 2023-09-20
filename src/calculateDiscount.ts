import { ServiceType, ServiceYear } from ".";
import { YearPrices } from "./data";

export const calculateDiscount = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear,
  yearPrices: YearPrices
) => {
  const weddingDiscount = getWeddingSessionDiscount(
    yearPrices.weddingSession,
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
  if (selectedYear === 2022) {
    return fullPrice;
  }

  if (
    selectedServices.includes("photography") ||
    selectedServices.includes("videoRecording")
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
    selectedServices.includes("photography") &&
    selectedServices.includes("videoRecording")
  ) {
    return (
      yearPrices.photography +
      yearPrices.videoRecording -
      yearPrices.photographyAndVideo
    );
  }

  return 0;
};
