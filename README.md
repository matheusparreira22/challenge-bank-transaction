# Bank Transaction API

A NestJS-based REST API for handling bank transactions between users. This application provides functionality for user management, wallet operations, and secure money transfers between users.

## Features

- User Management (Common users and Shopkeepers)
- Digital Wallet System
- Secure Money Transfers
- Transaction History
- External Authentication Service Integration
- Swagger API Documentation

## Technical Stack

- **Framework**: NestJS v11
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Documentation**: Swagger/OpenAPI
- **HTTP Client**: Axios
- **Validation**: class-validator
- **Container**: Docker

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bank-transaction
```

2. Install dependencies:
```bash
npm install
```

3. Start the database using Docker:
```bash
docker-compose up -d
```

4. Run the application:
```bash
npm run start:dev
```

## API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:3001/docs
```

## Main Endpoints

### Users
- `POST /user` - Create a new user

### Transfers
- `POST /transfer/:id` - Create a new money transfer

## Business Rules

1. Common users can:
   - Send money to other users
   - Receive money from other users

2. Shopkeeper users can:
   - Only receive money
   - Cannot send money

3. Transfer validations:
   - Verify if users exist
   - Check if sender has sufficient funds
   - Validate through external authorization service
   - Rollback in case of any failure

## Database Structure

The application uses three main entities:

1. **Users**
   - ID
   - Name
   - Document
   - Email
   - Password
   - User Type (Common/Shopkeeper)

2. **Wallets**
   - ID
   - Balance
   - User ID
   - Status

3. **Transfers**
   - ID
   - Sender ID
   - Receiver ID
   - Amount
   - Timestamp

## Development

### Running Tests
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### Database Configuration

Database configuration can be found in `src/app.module.ts`. Default settings:
- Host: localhost
- Port: 5432
- Username: postgres
- Password: postgres
- Database: postgres

## Docker Support

The application includes a `docker-compose.yml` file for easy database setup:
```yaml
version: '3.8'
services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
```

## Error Handling

The application implements comprehensive error handling for:
- Invalid transfers
- Insufficient funds
- User not found
- Authorization failures
- External service unavailability

## Security

- External authorization service integration
- Input validation using class-validator
- TypeORM for SQL injection prevention
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
