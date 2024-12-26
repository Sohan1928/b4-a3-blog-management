import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const test = async (req: Request, res: Response) => {
  const a = "Hello Developer, this is assignment 3!!";
  res.send(a);
};

app.get("/", test);

// // application routes
app.use("/api", router);

// app.use(globalErrorHandler);
app.use(globalErrorHandler);

// not found
app.use(notFound as any);

export default app;
