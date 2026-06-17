import "dotenv/config";
import { prisma } from "./lib/prisma";
import express, { type Request, type Response } from "express";
import cors from "cors";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

app.use(cors());
app.use(express.json());


async function bootstrap(): Promise<void> {
  await prisma.$connect();
  console.log("Connected to database");

  const server = app.listen(PORT, () => {
    console.log(`Server listening on :${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      prisma.$disconnect().finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 5000);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

void bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
