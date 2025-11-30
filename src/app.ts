import express, { Application, Request, Response } from "express";
import cors from "cors";
import { requestLogger } from "./utils/logger"; // Log requests
import { errorMiddleware } from "./middlewares/error.middleware";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(requestLogger); // Log setiap request

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Monlist Backend API");
});

app.use(errorMiddleware);

export default app;
