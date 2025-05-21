import type { ResultSetHeader } from "mysql2";
import { getPool } from "../database/connection";
import type { ISellerBuyerDTO } from "../../interfaces/dtos/sellerBuyer.dto";
import { createLogger } from "../../utils/logger";

const logger = createLogger("SellerBuyerController");

export interface ISellerBuyerController {
  save(data: ISellerBuyerDTO): Promise<number>;
}

export class SellerBuyerController implements ISellerBuyerController {
  async save(data: ISellerBuyerDTO): Promise<number> {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO sellers_buyers (
          person_type, cpf, cnpj, name, phone, cellphone, email,
          cep, street, number, complement, city, neighborhood, state
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.personType,
          data.cpf || null,
          data.cnpj || null,
          data.name,
          data.phone || null,
          data.cellphone,
          data.email,
          data.address.cep,
          data.address.street,
          data.address.number,
          data.address.complement || null,
          data.address.city,
          data.address.neighborhood,
          data.address.state,
        ]
      );

      logger.info(`Vendedor/Comprador salvo com sucesso. ID: ${result.insertId}`);
      return result.insertId;
    } catch (error) {
      logger.error("Erro ao salvar vendedor/comprador", error as Error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export const sellerBuyerController = new SellerBuyerController();
