import "dotenv/config";
import express from "express";
import fileRouter from "./routes/file.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { prepareRuntimeInfra } from "./utils/initInfrastructure.utils.js";
import { requestMiddleware } from "./middleware/request.middleware.js";
import { requestIdMiddleware } from "./middleware/requestId.middleware.js";
import { multerErrorHandler } from "./middleware/multer.ErrorHandler.middleware.js";

const app = express();
const PORT = Number(process.env.PORT);
if (Number.isNaN(PORT)) {
    throw new Error("PORT must be a valid number");
}

prepareRuntimeInfra();
app.use(requestIdMiddleware);
app.use(requestMiddleware);
app.use(express.json());
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    next();
});
app.use("/api/file", fileRouter);
app.use(multerErrorHandler);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});