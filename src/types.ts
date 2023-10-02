export type YearPrices = {
  [service: string]: number;
};

export type ServicePrices = {
  [year: number]: YearPrices;
};

export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

export type ServiceYear = 2020 | 2021 | 2022;

export type PricesData = {
  prices: ServicePrices;
};
