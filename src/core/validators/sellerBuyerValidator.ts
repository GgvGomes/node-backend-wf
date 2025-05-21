import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const cepRegex = /^\d{5}-\d{3}$/;
const phoneRegex = /^\d{10,11}$/;

export const addressSchema = z.object({
  cep: z.string().regex(cepRegex, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  state: z
    .string()
    .min(2, "Estado é obrigatório")
    .max(2, "Use a sigla do estado (2 letras)"),
});

// Definindo o tipo para os dados do formulário
export type SellerBuyerFormData = {
  personType: "PF" | "PJ";
  cnpj?: string;
  cpf?: string;
  name: string;
  phone?: string;
  cellphone: string;
  email: string;
  confirmEmail: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    neighborhood: string;
    state: string;
  };
};

export const sellerBuyerSchema = z
  .object({
    personType: z.enum(["PF", "PJ"], {
      errorMap: () => ({ message: "Tipo de pessoa deve ser PF ou PJ" }),
    }),
    cnpj: z.string().regex(cnpjRegex, "CNPJ inválido").optional(),
    cpf: z.string().regex(cpfRegex, "CPF inválido").optional(),
    name: z.string().min(1, "Nome é obrigatório"),
    phone: z.string().regex(phoneRegex, "Telefone inválido").optional(),
    cellphone: z.string().regex(phoneRegex, "Celular inválido"),
    email: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Confirmação de email inválida"),
    address: addressSchema,
  })
  .refine((data: SellerBuyerFormData) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Os emails não coincidem",
  })
  .refine(
    (data: SellerBuyerFormData) => {
      if (data.personType === "PF") {
        return !!data.cpf;
      }
      return true;
    },
    {
      path: ["cpf"],
      message: "CPF é obrigatório para pessoa física",
    }
  )
  .refine(
    (data: SellerBuyerFormData) => {
      if (data.personType === "PJ") {
        return !!data.cnpj;
      }
      return true;
    },
    {
      path: ["cnpj"],
      message: "CNPJ é obrigatório para pessoa jurídica",
    }
  );
