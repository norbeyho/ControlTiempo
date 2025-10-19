import express from "express";
import { crearRegistro, obtenerRegistros } from "../controllers/registroController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, crearRegistro);
router.get("/", protect, obtenerRegistros);

export default router;