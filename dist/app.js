"use strict";
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import routes from "./routes";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const port = process.env.PORT;
// app.use(
// 	cors({
// 		origin: process.env.FRONTEND_URL,
// 		credentials: true,
// 		optionsSuccessStatus: 200,
// 	})
// );
// app.options("*", cors());
// app.use(express.json());
// app.use("/api", routes);
// app.listen(port, () => {
// 	console.log(`Server is running on port ${port}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "10000", 10);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "https://contestfront.onrender.com",
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from build folder
app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
// API routes
app.use("/api", routes_1.default);
// Catch-all route for SPA
app.get("*", (req, res) => {
    const filePath = path_1.default.join(__dirname, "../build/index.html");
    console.log(`Serving: ${filePath}`); // Debug log
    res.sendFile(filePath);
});
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
