import express from "express";
import {
    registerAthlete,
    getLiveDashboard,
    deleteAthlete
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAthlete);
router.get("/live", getLiveDashboard);
router.delete("/delete-athlete/:id", deleteAthlete);

export default router;
