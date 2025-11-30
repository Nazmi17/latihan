import app from "./app";
import { prisma, config } from "./config";

const PORT = config.port;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

main();
