# Arquitectura_Programacion_Sistemas_Internet_P5
# GraphQL and MongoDB API for Travel Services (UBER)

## Overview
This project implements a GraphQL API with MongoDB for managing travel services. It includes functionalities for handling clients, drivers, and travels.

## Data Models

### Client
- `name`: String, required
- `email`: String, unique, required, email format
- `cards`: Array of Card objects
  - `number`: String, credit card format, required
  - `cvv`: Number, 3 digits, required
  - `expirity`: String, format MM/YYYY, required
  - `money`: Float, balance on the card
- `travels`: Array of Travel objects

### Driver
- `name`: String, required
- `email`: String, unique, required, email format
- `username`: String, unique, required
- `travels`: Array of Travel objects

### Travel
- `client`: ID, reference to Client
- `driver`: ID, reference to Driver
- `money`: Float, required, minimum 5 euros
- `distance`: Float, required, minimum 0.01km
- `date`: String, required
- `status`: String

## Functionalities

### Client Management
- **Create Client**
  - `name`: String, required
  - `email`: String, required, email format
- **Delete Client**
  - `id`: ID of the Client, required
- **List all Clients**
  - No parameters required

### Driver Management
- **Create Driver**
  - `name`: String, required
  - `email`: String, required, email format
  - `username`: String, required
- **Delete Driver**
  - `id`: ID of the Driver, required
- **List all Drivers**
  - No parameters required

### Card Management for Clients
- **Add Card to Client**
  - `client`: ID of the Client, required
  - `number`: String, credit card number, required
  - `cvv`: Int, 3 digits, required
  - `expirity`: String, format MM/YYYY, required
  - `money`: Float, initial balance, required
- **Remove Card from Client**
  - `id`: ID of the Client, required
  - `number`: String, credit card number, required

### Travel Management
- **Create a Travel**
  - `client`: ID of the Client, required
  - `driver`: ID of the Driver, required
  - `money`: Float, required, minimum 5 euros
  - `distance`: Float, required, minimum 0.01km
  - `date`: String, required
- **List all Travels**
  - No parameters required
- **Finish a Travel**
  - `id`: ID of the Travel, required
