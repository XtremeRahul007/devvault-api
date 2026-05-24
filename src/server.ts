import express from "express";

const app = express();
const PORT = 2007;

app.get("/", (_, res) => {
    res.send("DevVault API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});