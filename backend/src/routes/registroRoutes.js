import express from "express";
import { crearRegistro, obtenerRegistros } from "../controllers/registroController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, crearRegistro);
router.get("/", protect, obtenerRegistros);

export default router;