import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const cepRegex = /^\d{5}-\d{3}$/;

export const winnerBuyerSchema = z
  .object({
    personType: z.enum(["PF", "PJ"]),
    cnpj: z.string().regex(cnpjRegex, "CNPJ inválido").optional(),
    cpf: z.string().regex(cpfRegex, "CPF inválido").optional(),
    name: z.string().min(1, "Nome é obrigatório"),
    phone: z.string().optional(),
    cellphone: z.string().min(8, "Celular inválido"),
    email: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Confirmação de email inválida"),
    address: z.object({
      cep: z.string().regex(cepRegex, "CEP inválido"),
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      city: z.string(),
      neighborhood: z.string(),
      state: z.string(),
    }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Os emails não coincidem",
  });
