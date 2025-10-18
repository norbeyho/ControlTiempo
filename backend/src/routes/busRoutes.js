import express from "express";
import {
  crearBus,
  obtenerBuses,
  actualizarBus,
  eliminarBus,
} from "../controllers/busController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.post("/", protect, crearBus);
router.get("/", protect, obtenerBuses);
router.put("/:id", protect, actualizarBus);
router.delete("/:id", protect, eliminarBus);

export default router;
