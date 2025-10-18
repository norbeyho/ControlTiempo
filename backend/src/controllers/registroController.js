import Registro from "../models/Registro.js";
import Bus from "../models/Bus.js";
import { tramos, tramosIntermedios } from "../utils/tramos.js";

// Crear un nuevo registro
export const crearRegistro = async (req, res) => {
  try {
    const { busId, tipo, puntoControl, origen } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ msg: "Bus no encontrado" });

    // Validación básica
    if (!["GIRARDOTA", "MEDELLIN"].includes(origen)) {
      return res.status(400).json({ msg: "Origen inválido" });
    }

    if (tipo === "SALIDA") {
      const nuevo = await Registro.create({
        bus: busId,
        tipo,
        puntoControl: origen,
      });
      return res.status(201).json({
        msg: `Salida registrada desde ${origen}`,
        registro: nuevo,
      });
    }

    // Si es punto de control
    if (tipo === "CONTROL") {
      // buscar la última salida o punto previo
      const ultimoRegistro = await Registro.findOne({ bus: busId })
        .sort({ horaRegistro: -1 })
        .lean();

      if (!ultimoRegistro)
        return res.status(400).json({ msg: "No existe registro previo" });

      const horaActual = new Date();
      const tiempo = Math.round(
        (horaActual - new Date(ultimoRegistro.horaRegistro)) / (1000 * 60)
      );

      let tiempoEsperado = 0;

      // Determinar tiempo esperado según origen
      if (origen === "GIRARDOTA") {
        tiempoEsperado = tramos.GIRARDOTA[puntoControl] || 0;
      } else if (origen === "MEDELLIN") {
        // Si venía de salida o de otro punto
        if (ultimoRegistro.puntoControl === "MEDELLIN") {
          tiempoEsperado = tramos.MEDELLIN[puntoControl] || 0;
        } else {
          // ejemplo: de TERMINAL → COTRAFA o COTRAFA → VILLANUEVA
          const clave = `${ultimoRegistro.puntoControl}_${puntoControl}`;
          tiempoEsperado = tramosIntermedios.MEDELLIN[clave] || 0;
        }
      }

      const estado =
        tiempoEsperado && tiempo > tiempoEsperado
          ? "CON RETRASO"
          : "A TIEMPO"; // tolerancia de 2 min

      const nuevo = await Registro.create({
        bus: busId,
        tipo,
        puntoControl,
        horaRegistro: horaActual,
        tiempoTranscurrido: tiempo,
        estado,
      });

      return res.status(201).json({
        msg: "Registro creado correctamente",
        tiempoEsperado,
        tiempoReal: tiempo,
        estado,
        registro: nuevo,
      });
    }

    res.status(400).json({ msg: "Tipo inválido" });
  } catch (error) {
    console.error("Error en crearRegistro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const obtenerRegistros = async (req, res) => {
    try {
        const registros = await Registro.find().populate("bus");
        res.json(registros);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener registros"});
    }
};