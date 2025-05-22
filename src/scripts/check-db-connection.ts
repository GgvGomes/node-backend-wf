import dotenv from "dotenv";
dotenv.config();

import { initDatabase, closePool } from "../infra/database/connection";
import { createLogger } from "../utils/logger";

const logger = createLogger("CheckDBConnection");

const checkConnection = async () => {
  try {
    logger.info("Verificando conexão com o banco de dados...");
    await initDatabase();
    logger.info("Conexão com o banco de dados estabelecida com sucesso!");
    await closePool();
    process.exit(0);
  } catch (error) {
    logger.error("Falha ao conectar com o banco de dados", error as Error);
    process.exit(1);
  }
};

checkConnection();
