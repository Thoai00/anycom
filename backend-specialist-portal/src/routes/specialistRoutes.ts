import { Router } from "express";
import multer from "multer";

import { getAllSpecialists, upsertSpecialist } from "../controllers/SpecialistController.js";
const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });
router.post("/upsert", upload.array("images"), upsertSpecialist);
router.get("/all", getAllSpecialists);

export default router;