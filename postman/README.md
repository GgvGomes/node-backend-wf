# Seller Buyer API - Postman Collection

This folder contains Postman collection and environment files for testing the Seller Buyer API.

## Files

- `Seller_Buyer_API.postman_collection.json`: The main Postman collection with all API requests
- `Seller_Buyer_API.postman_environment.json`: Environment variables for local testing

## How to Import

1. Open Postman
2. Click on "Import" button in the top left corner
3. Drag and drop both files or browse to select them
4. Click "Import" to add them to your Postman workspace

## Available Requests

### Health Check

- `GET /health`: Check if the API is up and running

### Save Seller and Buyer

- `POST /api/v1/save-seller-and-buyer`: Save seller and buyer information

#### Valid Request Examples

- Save Seller and Buyer - PF (Valid): Example of a valid Pessoa Física request
- Save Seller and Buyer - PJ (Valid): Example of a valid Pessoa Jurídica request

#### Invalid Request Examples

- Save Seller and Buyer - Invalid Email: Test validation when emails don't match
- Save Seller and Buyer - Invalid CPF: Test validation with invalid CPF format
- Save Seller and Buyer - Invalid CNPJ: Test validation with invalid CNPJ format
- Save Seller and Buyer - Missing Required Fields: Test validation when required fields are missing
- Save Seller and Buyer - PF without CPF: Test validation when PF is missing CPF
- Save Seller and Buyer - PJ without CNPJ: Test validation when PJ is missing CNPJ

## Environment Variables

- `baseUrl`: The base URL of the API (default: http://localhost:3000)

You can modify the environment variables to point to different environments (development, staging, production, etc.).
