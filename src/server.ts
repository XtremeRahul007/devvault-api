import express from "express";
import vaultRoutes from "./routes/vault.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import { prepareRuntimeInfra } from "./utils/initInfrastructure.js";
import { requestMiddleware } from "./middleware/request.middleware.js";

const app = express();
const PORT = 5000;

prepareRuntimeInfra();
app.use(requestMiddleware);
app.use(express.json());
app.use("/vault", vaultRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});