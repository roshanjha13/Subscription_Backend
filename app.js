import express from "express";
import { config } from "dotenv";

config({
  path: "./.env",
});
const app = express();

export default app;
