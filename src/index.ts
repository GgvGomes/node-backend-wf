import "dotenv/config";
import { Server } from "./config/server";

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    const server = new Server();
    await server.start(PORT);
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

bootstrap();
