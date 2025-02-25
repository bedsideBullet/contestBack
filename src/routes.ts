import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
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

router.get("/users", async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
});

router.get("/user/:id", async (req, res) => {
	const { id } = req.params;
	const user = await prisma.user.findUnique({
		where: { id: Number(id) },
	});
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ error: "User not found" });
	}
});

router.put("/user/:id", async (req, res) => {
	const { id } = req.params;
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
		const updatedUser = await prisma.user.update({
			where: { id: Number(id) },
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
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ error: "Failed to update user" });
	}
});

router.delete("/user/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.user.delete({
			where: { id: Number(id) },
		});
		res.status(204).end();
	} catch (error) {
		res.status(400).json({ error: "Failed to delete user" });
	}
});

export default router;
