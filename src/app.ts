// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import routes from "./routes";
// import dotenv from "dotenv";

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
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
	origin: process.env.FRONTEND_URL, // Allow requests from this origin
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Your routes go here
app.get("/api/registration/registrations", (req, res) => {
	res.send("Registrations data");
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
