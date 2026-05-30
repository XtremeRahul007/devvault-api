import express from "express";
import vaultRoutes from "./routes/vault.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import { prepareRuntimeInfra } from "./utils/initInfrastructure.js";
import { requestMiddleware } from "./middleware/request.middleware.js";
import { requestIdMiddleware } from "./middleware/requestId.middleware.js";
import "dotenv/config";
import { infrastructureConfig } from "./core/configs/infrastructure.js";

const app = express();
const PORT = infrastructureConfig.PORT;

prepareRuntimeInfra();
app.use(requestIdMiddleware);
app.use(requestMiddleware);
app.use(express.json({ limit: "2mb" }));
app.use("/vault", vaultRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});