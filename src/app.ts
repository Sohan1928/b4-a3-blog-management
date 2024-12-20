import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// // application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  const a = "Hello Developer, this is assignment 3!!";
  res.send(a);
};

app.get("/", test);

// app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

export default app;
