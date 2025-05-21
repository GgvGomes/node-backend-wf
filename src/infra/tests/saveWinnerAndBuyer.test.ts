import request from "supertest";
import express from "express";
import saveWinnerAndBuyerRouter from "../routes/saveWinnerAndBuyer.route";
import { RouterEndpoints } from "../../interfaces/routes";

const app = express();
app.use(express.json());
app.use(RouterEndpoints.SAVE_WINNER_AND_BUYER, saveWinnerAndBuyerRouter);

describe(`POST ${RouterEndpoints.SAVE_WINNER_AND_BUYER}`, () => {
  const validBody = {
    personType: "juridica",
    cnpj: "12.345.678/0001-90",
    name: "Empresa Exemplo",
    cpf: "123.456.789-10",
    phone: "1133445566",
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

  it("deve retornar 201 com dados válidos", async () => {
    const response = await request(app)
      .post(RouterEndpoints.SAVE_WINNER_AND_BUYER)
      .send(validBody);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar 400 se os emails forem diferentes", async () => {
    const invalidBody = {
      ...validBody,
      confirmEmail: "diferente@exemplo.com",
    };

    const response = await request(app)
      .post(RouterEndpoints.SAVE_WINNER_AND_BUYER)
      .send(invalidBody);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});
