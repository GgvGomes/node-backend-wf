export interface ISellerBuyerDTO {
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
}
