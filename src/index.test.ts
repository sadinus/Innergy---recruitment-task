import {
  updateSelectedServices,
  calculatePrice,
  ServiceYear,
  ServiceType,
} from ".";

describe("updateSelectedServices.select", () => {
  test("should select when not selected", () => {
    const result = updateSelectedServices([], {
      type: "Select",
      service: "photography",
    });
    expect(result).toEqual(["Photography"]);
  });

  test("should not select the same service twice", () => {
    const result = updateSelectedServices(["photography"], {
      type: "Select",
      service: "photography",
    });
    expect(result).toEqual(["Photography"]);
  });

  test("should not select related service when main service is not selected", () => {
    const result = updateSelectedServices(["weddingSession"], {
      type: "Select",
      service: "blurayPackage",
    });
    expect(result).toEqual(["WeddingSession"]);
  });

  test("should select related service when main service is selected", () => {
    const result = updateSelectedServices(
      ["weddingSession", "videoRecording"],
      {
        type: "Select",
        service: "blurayPackage",
      }
    );
    expect(result).toEqual([
      "WeddingSession",
      "VideoRecording",
      "BlurayPackage",
    ]);
  });

  test("should select related service when one of main services is selected", () => {
    const result = updateSelectedServices(["weddingSession", "photography"], {
      type: "Select",
      service: "twoDayEvent",
    });
    expect(result).toEqual(["WeddingSession", "Photography", "TwoDayEvent"]);
  });
});

describe("updateSelectedServices.deselect", () => {
  test("should deselect", () => {
    const result = updateSelectedServices(["weddingSession", "photography"], {
      type: "Deselect",
      service: "photography",
    });
    expect(result).toEqual(["WeddingSession"]);
  });

  test("should do nothing when service not selected", () => {
    const result = updateSelectedServices(["weddingSession", "photography"], {
      type: "Deselect",
      service: "twoDayEvent",
    });
    expect(result).toEqual(["WeddingSession", "Photography"]);
  });

  test("should deselect related when last main service deselected", () => {
    const result = updateSelectedServices(
      ["weddingSession", "photography", "twoDayEvent"],
      {
        type: "Deselect",
        service: "photography",
      }
    );
    expect(result).toEqual(["WeddingSession"]);
  });

  test("should not deselect related when at least one main service stays selected", () => {
    const result = updateSelectedServices(
      ["weddingSession", "photography", "videoRecording", "twoDayEvent"],
      {
        type: "Deselect",
        service: "photography",
      }
    );
    expect(result).toEqual(["WeddingSession", "VideoRecording", "TwoDayEvent"]);
  });
});

describe.each([2020, 2021, 2022])(
  "calculatePrice.zero (%i)",
  (year: ServiceYear) => {
    test("should be zero with no services selected", () => {
      const result = calculatePrice([], year);
      expect(result).toEqual({ basePrice: 0, finalPrice: 0 });
    });
  }
);

describe.each([
  ["WeddingSession", 2020, 600],
  ["WeddingSession", 2021, 600],
  ["WeddingSession", 2022, 600],
  ["Photography", 2020, 1700],
  ["Photography", 2021, 1800],
  ["Photography", 2022, 1900],
  ["VideoRecording", 2020, 1700],
  ["VideoRecording", 2021, 1800],
  ["VideoRecording", 2022, 1900],
])(
  "calculatePrice.singleService (%s, %i)",
  (service: ServiceType, year: ServiceYear, expectedPrice) => {
    test("no discount applied", () => {
      const result = calculatePrice([service], year);
      expect(result.basePrice).toBeGreaterThan(0);
      expect(result.finalPrice).toBeGreaterThan(0);
      expect(result.basePrice).toBe(result.finalPrice);
    });

    test("price matches requirements", () => {
      const result = calculatePrice([service], year);
      expect(result).toEqual({
        basePrice: expectedPrice,
        finalPrice: expectedPrice,
      });
    });
  }
);

describe.each([
  [2020, 300],
  [2021, 300],
  [2022, 0],
])(
  "calcularePrice.photographyWithWeddingSessionPrice (%i increase by %i)",
  (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
      const withoutSession = calculatePrice(["photography"], year);
      const withSession = calculatePrice(
        ["photography", "weddingSession"],
        year
      );

      const priceChangeWithSession =
        withSession.finalPrice - withoutSession.finalPrice;

      expect(withSession.basePrice).toBeGreaterThan(0);
      expect(withSession.finalPrice).toBeGreaterThan(0);
      expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
      const withoutSession = calculatePrice(["photography"], year);
      const onlySession = calculatePrice(["weddingSession"], year);
      const withSession = calculatePrice(
        ["photography", "weddingSession"],
        year
      );

      const priceWithoutDiscounts =
        withoutSession.finalPrice + onlySession.finalPrice;

      expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
  }
);

describe.each([
  [2020, 300],
  [2021, 300],
  [2022, 300],
])(
  "calcularePrice.videoRecordingWithWeddingSessionPrice (%i increase by %i)",
  (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
      const withoutSession = calculatePrice(["videoRecording"], year);
      const withSession = calculatePrice(
        ["videoRecording", "weddingSession"],
        year
      );

      const priceChangeWithSession =
        withSession.finalPrice - withoutSession.finalPrice;

      expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
      const withoutSession = calculatePrice(["videoRecording"], year);
      const onlySession = calculatePrice(["weddingSession"], year);
      const withSession = calculatePrice(
        ["videoRecording", "weddingSession"],
        year
      );

      const priceWithoutDiscounts =
        withoutSession.finalPrice + onlySession.finalPrice;

      expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
  }
);

describe.each([
  [2020, 500],
  [2021, 500],
  [2022, 600],
])(
  "calcularePrice.videoRecordingWithPhotographyPrice (%i increase by %i)",
  (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
      const withoutPhotography = calculatePrice(["videoRecording"], year);
      const withPhotography = calculatePrice(
        ["videoRecording", "photography"],
        year
      );

      const priceChangeWithPhotography =
        withPhotography.finalPrice - withoutPhotography.finalPrice;

      expect(priceChangeWithPhotography).toEqual(increase);
    });

    test("discount applied", () => {
      const withoutPhotography = calculatePrice(["videoRecording"], year);
      const onlyPhotography = calculatePrice(["photography"], year);
      const withPhotography = calculatePrice(
        ["videoRecording", "photography"],
        year
      );

      const priceWithoutDiscounts =
        withoutPhotography.finalPrice + onlyPhotography.finalPrice;

      expect(priceWithoutDiscounts).toBeGreaterThan(withPhotography.finalPrice);
    });
  }
);

describe.each([
  [2020, 300],
  [2021, 300],
  [2022, 0],
])(
  "calcularePrice.videoRecordingWithPhotographyWithSessionPrice (%i increase by %i)",
  (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
      const withoutSession = calculatePrice(
        ["videoRecording", "photography"],
        year
      );
      const withSession = calculatePrice(
        ["videoRecording", "photography", "weddingSession"],
        year
      );

      const priceChangeWithSession =
        withSession.finalPrice - withoutSession.finalPrice;

      expect(withSession.basePrice).toBeGreaterThan(0);
      expect(withSession.finalPrice).toBeGreaterThan(0);
      expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
      const withoutSession = calculatePrice(
        ["videoRecording", "photography"],
        year
      );
      const onlySession = calculatePrice(["weddingSession"], year);
      const withSession = calculatePrice(
        ["videoRecording", "photography", "weddingSession"],
        year
      );

      const priceWithoutDiscounts =
        withoutSession.finalPrice + onlySession.finalPrice;

      expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
  }
);
