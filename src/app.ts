import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import globalErrorhandler from "./middleware/globalErrorhandler";
import notFound from "./middleware/notFound";
// import './interface/index.d.ts';
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorhandler);

app.use(notFound);

export default app;
