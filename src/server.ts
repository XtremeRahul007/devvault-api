import "dotenv/config";
import express from "express";
import vaultRoutes from "./routes/vault.routes.js";
import fileRouter from "./routes/file.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { prepareRuntimeInfra } from "./utils/initInfrastructure.js";
import { requestMiddleware } from "./middleware/request.middleware.js";
import { requestIdMiddleware } from "./middleware/requestId.middleware.js";

const app = express();
const PORT = Number(process.env.PORT);
if (Number.isNaN(PORT)) {
    throw new Error("PORT must be a valid number");
}

prepareRuntimeInfra();
app.use(requestIdMiddleware);
app.use(requestMiddleware);
app.use(express.json());
app.use("/vault", vaultRoutes);
app.use(errorMiddleware);
app.use("/file", fileRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});