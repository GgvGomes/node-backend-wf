## Backend - Wefit

Seja bem vindo ao teste de backend da Wefit.

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3307 (aparentemente o MySql já reserva a 3306 - tive conflitos nisso) e a senha do usuário **root** é **senha_root_123**

### Para iniciar o servidor express basta executar o seguinte comando:

    npm start
    ou
    yarn start

## Guia para como visualizar os resultados no container:

mysql -h localhost -P 3306 -u root -p <br/>
(inserir senha)

<br/>

-- Listar todos os bancos de dados <br/>
SHOW DATABASES;

-- Selecionar o banco de dados <br/>
USE seller_buyer_db;

-- Listar todas as tabelas <br/>
SHOW TABLES;

-- Descrever a estrutura de uma tabela <br/>
DESCRIBE seller_buyers;

-- Consultar dados de uma tabela <br/>
SELECT \* FROM seller_buyers;
