import { ServiceType, ServiceYear, YearPrices } from "../types";

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
  const hasWeddingSession = selectedServices.includes("WeddingSession");
  const hasPhotography = selectedServices.includes("Photography");
  const hasVideoRecording = selectedServices.includes("VideoRecording");
  const isYear2022 = selectedYear === 2022;

  if (isYear2022 && hasWeddingSession && hasPhotography) {
    return fullPrice;
  }

  if (hasWeddingSession && (hasPhotography || hasVideoRecording)) {
    return 300;
  }

  return 0;
};

const getPhotographyAndVideoDiscount = (
  selectedServices: ServiceType[],
  yearPrices: YearPrices
) => {
  const hasPhotography = selectedServices.includes("Photography");
  const hasVideoRecording = selectedServices.includes("VideoRecording");

  if (hasPhotography && hasVideoRecording) {
    return (
      yearPrices.Photography +
      yearPrices.VideoRecording -
      yearPrices.PhotographyAndVideo
    );
  }

  return 0;
};
