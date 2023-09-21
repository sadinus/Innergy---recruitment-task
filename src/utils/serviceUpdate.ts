import { ServiceType } from "../types";

export const validateService = (
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

export const deselectRelatedService = (
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
