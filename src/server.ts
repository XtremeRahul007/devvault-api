import express from "express";
import vaultRoutes from "./routes/vault.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(errorMiddleware);
app.use("/vault", vaultRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});