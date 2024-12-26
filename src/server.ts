import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;

async function main() {
  await mongoose.connect(config.database_url as string);

  server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} 🏃🏽‍♂️‍➡️`);
  });
}

main();

process.on("unhandledRejection", () => {
  console.log(`😈 unhandledRejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
