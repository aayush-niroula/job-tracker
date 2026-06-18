import "dotenv/config";
import { prisma } from "./lib/prisma";
import express from "express";
import cors from "cors";
import applicationsRouter from "./routes/applications";
import path from "path";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const SERVER_URL = process.env.SERVER_URL ?? `http://localhost:${PORT}`;
const app = express();


const _dirname = path.resolve()
app.use(cors());
app.use(express.json());

app.use("/applications", applicationsRouter);
app.use(
  express.static(
    path.join(_dirname, "..", "client", "dist")
  )
);
app.get("/*splat", (req, res) => {
 res.sendFile(
  path.join(_dirname, "..", "client", "dist", "index.html")
);
});

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
