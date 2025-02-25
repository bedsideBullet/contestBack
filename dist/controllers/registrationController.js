"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegistration = exports.getUserById = exports.deleteRegistrations = exports.getRegistrations = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, vehicleModel, otherNotes, city, state, phone, year, make, } = req.body;
        console.log("Received user data:", req.body);
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newUser = yield prisma.user.create({
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
        res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
});
exports.registerUser = registerUser;
const getRegistrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrations = yield prisma.user.findMany();
        res.status(200).json(registrations);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching registrations", error });
    }
});
exports.getRegistrations = getRegistrations;
const deleteRegistrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res
            .status(400)
            .json({ message: "No IDs provided or invalid format" });
    }
    try {
        const numericIds = ids.map((id) => parseInt(id));
        const deleteResponse = yield prisma.user.deleteMany({
            where: {
                id: { in: numericIds },
            },
        });
        if (deleteResponse.count === 0) {
            return res
                .status(404)
                .json({ message: "No registrations found to delete" });
        }
        res.status(200).json({
            message: `${deleteResponse.count} registrations deleted successfully`,
        });
    }
    catch (error) {
        console.error("Error deleting registrations:", error);
        res.status(500).json({ message: "Error deleting registrations", error });
    }
});
exports.deleteRegistrations = deleteRegistrations;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});
exports.getUserById = getUserById;
const updateRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dataToUpdate = req.body;
        const updatedUser = yield prisma.user.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
        });
        res
            .status(200)
            .json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) { }
});
exports.updateRegistration = updateRegistration;
