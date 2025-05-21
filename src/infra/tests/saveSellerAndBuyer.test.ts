import request from "supertest";
import express from "express";
import saveSellerAndBuyerRouter from "../routes/saveSellerAndBuyer.route";
import { RouterEndpoints } from "../../interfaces/routes";
import { sellerBuyerController } from "../controllers/sellerBuyer.controller";

// Mock do controlador para os testes
jest.mock("../controllers/sellerBuyer.controller", () => ({
  sellerBuyerController: {
    save: jest.fn().mockResolvedValue(1),
  },
}));

// Configuração correta do app de teste
const app = express();
app.use(express.json());
// Usando a rota raiz para o router nos testes
app.use("/", saveSellerAndBuyerRouter);

const validPJBody = {
  personType: "PJ",
  cnpj: "12.345.678/0001-90",
  name: "Empresa Exemplo",
  cellphone: "11999999999",
  email: "email@exemplo.com",
  confirmEmail: "email@exemplo.com",
  address: {
    cep: "12345-678",
    street: "Rua A",
    number: "123",
    complement: "Sala 1",
    city: "Cidade",
    neighborhood: "Centro",
    state: "SP",
  },
};

const validPFBody = {
  personType: "PF",
  cpf: "123.456.789-10",
  name: "Pessoa Física Exemplo",
  cellphone: "11999999999",
  email: "email@exemplo.com",
  confirmEmail: "email@exemplo.com",
  address: {
    cep: "12345-678",
    street: "Rua A",
    number: "123",
    city: "Cidade",
    neighborhood: "Centro",
    state: "SP",
  },
};

describe(`POST ${RouterEndpoints.SAVE_SELLER_AND_BUYER}`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 201 com dados válidos de PJ", async () => {
    const response = await request(app).post("/").send(validPJBody);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Dados recebidos e salvos com sucesso!");
    expect(response.body.data).toMatchObject(validPJBody);
    expect(sellerBuyerController.save).toHaveBeenCalledWith(validPJBody);
  });

  it("deve retornar 201 com dados válidos de PF", async () => {
    const response = await request(app).post("/").send(validPFBody);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Dados recebidos e salvos com sucesso!");
    expect(response.body.data).toMatchObject(validPFBody);
    expect(sellerBuyerController.save).toHaveBeenCalledWith(validPFBody);
  });

  it("deve retornar 400 se os emails forem diferentes", async () => {
    const invalidBody = {
      ...validPJBody,
      confirmEmail: "diferente@exemplo.com",
    };

    const response = await request(app).post("/").send(invalidBody);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe("Os emails não coincidem");
    expect(sellerBuyerController.save).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se o CPF for inválido", async () => {
    const invalidBody = {
      ...validPFBody,
      cpf: "123.456.789-1", // CPF inválido
    };

    const response = await request(app).post("/").send(invalidBody);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe("CPF inválido");
    expect(sellerBuyerController.save).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se o CNPJ for inválido", async () => {
    const invalidBody = {
      ...validPJBody,
      cnpj: "12.345.678/0001-9", // CNPJ inválido
    };

    const response = await request(app).post("/").send(invalidBody);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe("CNPJ inválido");
    expect(sellerBuyerController.save).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se campos obrigatórios estiverem faltando", async () => {
    const invalidBody = {
      personType: "PF",
      // Faltando nome e outros campos obrigatórios
    };

    const response = await request(app).post("/").send(invalidBody);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(sellerBuyerController.save).not.toHaveBeenCalled();
  });

  it("deve retornar 500 se houver erro ao salvar no banco", async () => {
    // Mock para simular erro no banco
    (sellerBuyerController.save as jest.Mock).mockRejectedValueOnce(
      new Error("Erro de banco")
    );

    const response = await request(app).post("/").send(validPFBody);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Erro ao salvar dados no banco de dados");
  });
});
