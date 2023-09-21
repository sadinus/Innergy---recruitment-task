# Considerations

In my opinion, unit tests are not consistent with the task requirements. It is said:

> Any discounts should never be applied twice - greater discount wins.

Last 6 tests pass only if I count both discounts (Photography + VideoRecording and Photography/VideoRecording + WeddingSession) file `calculateDiscount.ts line 18`. If I used `Math.max()` to get the highest discount, tests do not pass.
