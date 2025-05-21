export const baseRouter = "/api/v1";

export const RouterEndpoints = {
  SAVE_WINNER_AND_BUYER: `${baseRouter}/save-winner-and-buyer`,
} as const;

export type RouterEndpoints = (typeof RouterEndpoints)[keyof typeof RouterEndpoints];
