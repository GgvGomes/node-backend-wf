export const baseRouter = "/api/v1";

export const RouterEndpoints = {
  SAVE_SELLER_AND_BUYER: `${baseRouter}/save-seller-and-buyer`,
} as const;

export type RouterEndpoints = (typeof RouterEndpoints)[keyof typeof RouterEndpoints];
