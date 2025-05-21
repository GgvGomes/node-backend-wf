import { Router, type Request, type Response } from "express";
import { sellerBuyerSchema } from "../../core/validators/sellerBuyerValidator";
import { formatZodError, createErrorResponse } from "../../types/zodErrors";
import { sellerBuyerController } from "../controllers/sellerBuyer.controller";
import { createLogger } from "../../utils/logger";

const router = Router();
const logger = createLogger("SaveSellerAndBuyerRoute");

router.post("/", async (req: Request, res: Response) => {
  try {
    const result = sellerBuyerSchema.safeParse(req.body);

    if (!result.success) {
      const formatted = formatZodError(result.error);
      return res.status(400).json(createErrorResponse(formatted));
    }

    const data = result.data;

    // Salvar os dados no banco de dados
    try {
      const id = await sellerBuyerController.save(data);
      logger.info(`Dados salvos com sucesso. ID: ${id}`);

      return res.status(201).json({
        message: "Dados recebidos e salvos com sucesso!",
        id,
        data,
      });
    } catch (dbError) {
      logger.error("Erro ao salvar dados no banco", dbError as Error);
      return res.status(500).json({
        message: "Erro ao salvar dados no banco de dados",
      });
    }
  } catch (error) {
    logger.error("Erro ao processar requisição", error as Error);
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
});

export default router;
