// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import routes from "./routes";

// dotenv.config();

// const app = express();

// const corsOptions = {
// 	origin: process.env.FRONTEND_URL || "http://localhost:5173",
// 	optionsSuccessStatus: 200,
// 	credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// app.use("/api", routes);

// const PORT = process.env.PORT || 10000;
// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });

// export default app;

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import path from "path";

dotenv.config();

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// API routes
app.use("/api", routes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../../dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../../dist", "index.html"));
	});
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
