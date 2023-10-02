import { ServiceType } from "../types";

export const validateService = (
  service: ServiceType,
  previouslySelectedServices: ServiceType[]
) => {
  const hasVideoRecording =
    previouslySelectedServices.includes("VideoRecording");
  const hasPhotography = previouslySelectedServices.includes("Photography");

  if (service === "BlurayPackage" && !hasVideoRecording) {
    return false;
  }

  if (service === "TwoDayEvent" && !(hasPhotography || hasVideoRecording)) {
    return false;
  }

  return true;
};

export const deselectRelatedService = (
  service: ServiceType,
  previouslySelectedServices: ServiceType[]
) => {
  const hasPhotographyOrVideo = !["Photography", "VideoRecording"].every(
    (x: ServiceType) => previouslySelectedServices.includes(x)
  );
  const hasTwoDayEvent = previouslySelectedServices.includes("TwoDayEvent");
  const hasBlurayPackage = previouslySelectedServices.includes("BlurayPackage");

  if (hasPhotographyOrVideo && hasTwoDayEvent) {
    return previouslySelectedServices.filter(
      (x) => x !== service && x !== "TwoDayEvent"
    );
  }

  if (service === "VideoRecording" && hasBlurayPackage) {
    return previouslySelectedServices.filter(
      (x) => x !== service && x !== "BlurayPackage"
    );
  }

  return previouslySelectedServices.filter((x) => x !== service);
};
