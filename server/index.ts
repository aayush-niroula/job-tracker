import "dotenv/config";
import { prisma } from "./lib/prisma";
import express, { type Request, type Response } from "express";
import cors from "cors";
import applicationsRouter from "./routes/applications";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/applications", applicationsRouter);

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
