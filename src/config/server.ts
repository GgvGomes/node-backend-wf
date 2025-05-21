import express from "express";
import cors from "cors";
import saveWinnerAndBuyerRouter from "../infra/routes/saveWinnerAndBuyer.route";

export class Server {
  private app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api/v1/save-winner-and-buyer", saveWinnerAndBuyerRouter);
  }

  public async start(port: number | string) {
    this.app.listen(port, () => {
      console.log(`Servidor iniciado em http://localhost:${port}`);
    });
  }
}
