import express, { Application } from "express";
import cors from "cors";

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      cors({
        origin: "*", // TODO: Trocar por domínios específicos em produção
        credentials: true,
      })
    );
  }

  private setupRoutes() {
    // TODO: Aqui serão registradas as rotas futuramente
    // this.app.use('/api/v1/save-form', formRouter);
  }

  public async start(port: number | string) {
    this.app.listen(port, () =>
      console.log(`Servidor iniciado em http://localhost:${port}`)
    );
  }
}
