import express from "express";
import cors from "cors";
import saveWinnerAndBuyerRouter from "../infra/routes/saveWinnerAndBuyer.route";
import { RouterEndpoints } from "../interfaces/routes";

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
    this.app.use(RouterEndpoints.SAVE_WINNER_AND_BUYER, saveWinnerAndBuyerRouter);
  }

  public async start(port: number | string) {
    this.app.listen(port, () => {
      console.log(`Servidor iniciado em http://localhost:${port}`);
    });
  }
}
