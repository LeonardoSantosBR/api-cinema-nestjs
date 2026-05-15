# API Cinema

API REST para gerenciamento de cinemas, salas, filmes, sessões e reserva de assentos. Construída com [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/) e MySQL.

## Stack

- **Runtime:** Node.js 20
- **Framework:** NestJS 11
- **ORM:** Prisma 6
- **Banco:** MySQL
- **Auth:** JWT (`@nestjs/jwt`) + bcrypt
- **Validação:** `class-validator` / `class-transformer`
- **Docs:** Swagger (`@nestjs/swagger`)
- **Agendamento:** `@nestjs/schedule` (expiração automática de sessões)
- **Container:** Docker / docker-compose

## Funcionalidades

- Cadastro e autenticação de **usuários** (clientes) e **administradores** com papéis distintos
- CRUD de **cinemas**, **salas**, **fileiras** e **assentos**
- CRUD de **filmes** com classificação indicativa (`FREE`, `PLUS12`, `PLUS16`, `PLUS18`)
- Criação e listagem de **sessões** com filtro por nome de filme
- Reserva de **assentos por sessão** vinculada a um usuário
- Expiração automática de sessões via job agendado
- Soft delete em todos os recursos (`deleted_at`)
- Controle de acesso por papel (`admin` / `client`) via guards

## Modelo de dados

```
Cinemas ──< Rooms ──< RowsRoom ──< Seats
                │                    │
                └──< Sessions >── Movies
                          │
                          └──< SessionSeats >── Users
```

- Um **cinema** tem várias **salas**.
- Cada **sala** possui **fileiras** (`RowsRoom`) identificadas por letra, e cada fileira contém **assentos** (`Seats`), com flag de acessibilidade.
- Uma **sessão** associa um **filme** a uma **sala** com horários de início/fim.
- Uma reserva (`SessionSeats`) liga um **usuário** a um **assento** de uma **sessão**.

Enum de classificação:

```
MovieClassification = FREE | PLUS12 | PLUS16 | PLUS18
```

## Módulos

| Módulo          | Responsabilidade                                  |
| --------------- | ------------------------------------------------- |
| `auth`          | Login de clientes e administradores, emissão JWT  |
| `users`         | Gestão de clientes                                |
| `admins`        | Gestão de administradores                         |
| `cinemas`       | CRUD de cinemas                                   |
| `rooms`         | CRUD de salas, fileiras e assentos                |
| `movies`        | CRUD de filmes                                    |
| `sessions`      | CRUD e busca de sessões (filtro por filme)        |
| `session-seats` | Reserva de assentos em uma sessão                 |

## Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="mysql://user:password@localhost:3306/api_cinema"
JWT_SECRET="sua-chave-secreta"
PORT=3000
```

## Como rodar

### Local

```bash
# instalar dependências
npm install

# gerar o Prisma Client
npm run prisma-generate-mysql

# aplicar o schema ao banco
npm run prisma-push-mysql

# subir em modo desenvolvimento
npm run start:dev
```

### Docker

```bash
docker-compose up --build
```

A API ficará disponível em `http://localhost:3000`.

## Documentação Swagger

Após subir a aplicação, acesse:

```
http://localhost:3000/api
```

## Autenticação

A API usa JWT global via `AuthGuard`. Para autenticar:

1. `POST /auth/signin` — login de cliente
2. `POST /auth/signin/admin` — login de administrador

Use o token retornado no header `Authorization: Bearer <token>` nas demais requisições. Rotas protegidas por papel utilizam o `RolesGuard`.

## Scripts úteis

| Script                          | Descrição                              |
| ------------------------------- | -------------------------------------- |
| `npm run start`                 | Inicia a API                           |
| `npm run start:dev`             | Inicia em modo watch                   |
| `npm run start:prod`            | Roda o build (`dist/main`)             |
| `npm run build`                 | Compila o projeto                      |
| `npm run lint`                  | Lint + autofix                         |
| `npm run format`                | Formata com Prettier                   |
| `npm run test`                  | Testes unitários (Jest)                |
| `npm run test:e2e`              | Testes end-to-end                      |
| `npm run prisma-generate-mysql` | Gera o Prisma Client                   |
| `npm run prisma-push-mysql`     | Sincroniza o schema com o banco        |

## Estrutura do projeto

```
src/
├── app.module.ts
├── main.ts
├── common/         # filtros, interceptors, utilitários compartilhados
├── database/       # PrismaService e configuração de acesso a dados
├── decorators/     # decorators customizados (ex.: @Roles)
├── helpers/
├── modules/        # módulos de domínio (auth, cinemas, movies, ...)
├── services/       # serviços compartilhados (ex.: HashService)
├── swagger/
└── types/
```
