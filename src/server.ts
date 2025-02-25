import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/register", async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		vehicleModel,
		otherNotes,
		city,
		state,
		phone,
		year,
		make,
	} = req.body;
	try {
		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				vehicleModel,
				otherNotes,
				city,
				state,
				phone,
				year,
				make,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: "Email already registered" });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
