import { ServiceType } from "../types";

export const selectService = (
  service: ServiceType,
  previouslySelectedServices: ServiceType[]
) => {
  const hasVideoRecording =
    previouslySelectedServices.includes("VideoRecording");
  const hasPhotography = previouslySelectedServices.includes("Photography");
  const containsService = previouslySelectedServices.includes(service);

  if (
    containsService ||
    (service === "BlurayPackage" && !hasVideoRecording) ||
    (service === "TwoDayEvent" && !(hasPhotography || hasVideoRecording))
  ) {
    return previouslySelectedServices;
  }

  return [...previouslySelectedServices, service];
};

export const deselectService = (
  service: ServiceType,
  previouslySelectedServices: ServiceType[]
) => {
  const hasPhotographyOrVideo = !["Photography", "VideoRecording"].every(
    (x: ServiceType) => previouslySelectedServices.includes(x)
  );
  const hasTwoDayEvent = previouslySelectedServices.includes("TwoDayEvent");
  const hasBlurayPackage = previouslySelectedServices.includes("BlurayPackage");
  const containsService = previouslySelectedServices.includes(service);

  if (!containsService) return previouslySelectedServices;

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
