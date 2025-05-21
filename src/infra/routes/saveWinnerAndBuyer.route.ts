import { Router, Request, Response } from "express";
import { winnerBuyerSchema } from "../../core/validators/winnerBuyerValidator";
import { formatZodError } from "../../types/zodErrors";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const result = winnerBuyerSchema.safeParse(req.body);

  if (!result.success) {
    const formatted = formatZodError(result.error);
    return res.status(400).json({ message: "Erro de validação", errors: formatted });
  }

  const data = result.data;

  // Aqui seria feita a lógica para salvar os dados (banco, etc)
  return res.status(201).json({ message: "Dados recebidos com sucesso!", data });
});

export default router;
