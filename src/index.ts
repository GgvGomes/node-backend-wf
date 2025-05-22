import dotenv from "dotenv";
dotenv.config();

import { Server } from "./config/server";
import { createLogger } from "./utils/logger";
import { initDatabase } from "./infra/database/connection";

const PORT = process.env.PORT || 3000;
const logger = createLogger("Bootstrap");

const bootstrap = async () => {
  try {
    logger.info("Inicializando conexão com o banco de dados");
    await initDatabase();
    logger.info("Conexão com o banco de dados inicializada com sucesso");

    logger.info(`Iniciando servidor na porta ${PORT}`);
    const server = new Server();
    await server.start(PORT);
    logger.info(`Servidor iniciado com sucesso na porta ${PORT}`);
  } catch (error) {
    logger.error("Erro ao iniciar aplicação", error as Error);
    process.exit(1);
  }
};

bootstrap().catch((error) => {
  console.error("Fatal error during bootstrap:", error);
  process.exit(1);
});
