import dotenv from "dotenv";
dotenv.config();

import { Server } from "./config/server";
import { createLogger } from "./utils/logger";

const PORT = process.env.PORT || 3000;
const logger = createLogger("Bootstrap");

const bootstrap = async () => {
  try {
    logger.info(`Iniciando servidor na porta ${PORT}`);
    const server = new Server();
    await server.start(PORT);
    logger.info(`Servidor iniciado com sucesso na porta ${PORT}`);
  } catch (error) {
    logger.error("Erro ao iniciar servidor", error as Error);
    process.exit(1);
  }
};

bootstrap();
