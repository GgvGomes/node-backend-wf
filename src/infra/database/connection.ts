import mysql from "mysql2/promise";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Database");

const dbConfig = {
  host: process.env.MYSQLDB_HOST,
  port: Number(process.env.MYSQLDB_PORT),
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export const initDatabase = async (): Promise<void> => {
  try {
    logger.info(
      `Tentando conectar ao banco de dados: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    );

    pool = mysql.createPool(dbConfig);

    const connection = await pool.getConnection();
    logger.info("Conexão com o banco de dados estabelecida com sucesso");
    connection.release();

    await createDatabaseIfNotExists();

    await createTablesIfNotExist();

    return Promise.resolve();
  } catch (error) {
    logger.error("Erro ao conectar com o banco de dados", error as Error);
    pool = null;
    throw error;
  }
};

export const getPool = (): mysql.Pool => {
  if (!pool) {
    logger.error("Tentativa de acessar o pool de conexões antes da inicialização");
    throw new Error("Pool de conexões não inicializado");
  }
  return pool;
};

const createDatabaseIfNotExists = async (): Promise<void> => {
  try {
    logger.info(`Verificando se o banco de dados ${dbConfig.database} existe`);

    const tempPool = mysql.createPool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await tempPool.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await tempPool.query(`USE ${dbConfig.database}`);

    logger.info(`Banco de dados ${dbConfig.database} verificado/criado com sucesso`);
    await tempPool.end();
  } catch (error) {
    logger.error("Erro ao criar banco de dados", error as Error);
    throw error;
  }
};

const createTablesIfNotExist = async (): Promise<void> => {
  if (!pool) {
    throw new Error("Pool de conexões não inicializado");
  }

  try {
    logger.info("Verificando se as tabelas existem");

    const connection = await pool.getConnection();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS sellers_buyers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        person_type ENUM('PF', 'PJ') NOT NULL,
        cpf VARCHAR(14),
        cnpj VARCHAR(18),
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        cellphone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        cep VARCHAR(9) NOT NULL,
        street VARCHAR(255) NOT NULL,
        number VARCHAR(20) NOT NULL,
        complement VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        neighborhood VARCHAR(100) NOT NULL,
        state CHAR(2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    logger.info("Tabelas verificadas/criadas com sucesso");
    connection.release();
  } catch (error) {
    logger.error("Erro ao criar tabelas", error as Error);
    throw error;
  }
};

export const closePool = async (): Promise<void> => {
  if (pool) {
    logger.info("Fechando pool de conexões");
    await pool.end();
    pool = null;
    logger.info("Pool de conexões fechado com sucesso");
  }
};
