import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import router from "./routes";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger Docs
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/api.yml"));
app.use("/swagger-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define Router
app.use("/", router);

// Health Check
app.get("/health-check", (req, res) => {
  res.send("Server Running!");
});

export default app;
