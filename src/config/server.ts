import express from "express";
import cors from "cors";
import saveSellerAndBuyerRouter from "../infra/routes/saveSellerAndBuyer.route";
import { RouterEndpoints } from "../interfaces/routes";
import { errorHandler } from "../middlewares/errorHandler";

export class Server {
  private app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use(
      RouterEndpoints.SAVE_SELLER_AND_BUYER as string,
      saveSellerAndBuyerRouter
    );

    // Adicionar rota de healthcheck
    this.app.get("/health", (req, res) => {
      res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // Middleware para rotas não encontradas
    this.app.use("*", (req, res) => {
      res.status(404).json({ message: "Rota não encontrada" });
    });

    // Middleware de tratamento de erros
    this.app.use(errorHandler);
  }

  public async start(port: number | string) {
    this.app.listen(port, () => {
      console.log(`Servidor iniciado em http://localhost:${port}`);
    });
  }
}
