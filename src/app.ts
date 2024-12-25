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

// // application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  const a = "Hello Developer, this is assignment 3!!";
  res.send(a);
};

app.get("/", test);

// app.use(globalErrorHandler);
app.use(globalErrorHandler);

// not found
app.use(notFound as any);

// app.use("*", (req: Request, res: Response) => {
//   res.status(404).json({
//     status: false,
//     message: "Route not found",
//   });
// });

export default app;
