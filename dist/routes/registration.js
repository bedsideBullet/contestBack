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
const express_1 = require("express");
const registrationController_1 = require("../controllers/registrationController");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a POST request on /registration");
    try {
        yield (0, registrationController_1.registerUser)(req, res);
    }
    catch (error) {
        console.error("Error in /registration route:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a POST request on /registration/delete");
    try {
        yield (0, registrationController_1.deleteRegistrations)(req, res);
    }
    catch (error) {
        console.error("Error in /registration/delete route:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.get("/registrations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a GET request on /registrations");
    try {
        yield (0, registrationController_1.getRegistrations)(req, res);
    }
    catch (error) {
        console.error("Error in /registrations route:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a GET request on /registration/:id");
    try {
        yield (0, registrationController_1.getUserById)(req, res);
    }
    catch (error) {
        console.error("Error in /registration/:id route:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a PATCH request on /registration/:id");
    try {
        yield (0, registrationController_1.updateRegistration)(req, res);
    }
    catch (error) {
        console.error("Error in /registration/:id route:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
