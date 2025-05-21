import { Router, type Request, type Response } from "express";
import { winnerBuyerSchema } from "../../core/validators/winnerBuyerValidator";
import { formatZodError, createErrorResponse } from "../../types/zodErrors";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const result = winnerBuyerSchema.safeParse(req.body);

    if (!result.success) {
      const formatted = formatZodError(result.error);
      return res.status(400).json(createErrorResponse(formatted));
    }

    const data = result.data;

    // Aqui seria feita a lógica para salvar os dados (banco, etc)
    // TODO: Implementar a lógica de persistência

    return res.status(201).json({
      message: "Dados recebidos com sucesso!",
      data,
    });
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
});

export default router;
