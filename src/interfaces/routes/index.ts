export const baseRouter = "/api/v1";

// Usando constantes em vez de enum para evitar problemas de tipo
export const RouterEndpoints = {
  SAVE_SELLER_AND_BUYER: `${baseRouter}/save-seller-and-buyer`,
} as const;

// Mantendo a compatibilidade com o código existente
export type RouterEndpoints = (typeof RouterEndpoints)[keyof typeof RouterEndpoints];
