import type { ZodError } from "zod";

export interface FormattedError {
  field: string;
  message: string;
}

export const formatZodError = (error: ZodError): FormattedError[] => {
  return error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

export const createErrorResponse = (errors: FormattedError[]) => {
  return {
    message: "Erro de validação",
    errors,
  };
};
