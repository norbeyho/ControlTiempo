import Bus from "../models/Bus.js";

//Crear bus
export const crearBus = async (req, res) => {
    try {
        const { numeroMovil, placa, empresa } = req.body;

        //Validar duplicado
        const existe = await Bus.findOne({ $or: [{ numeroMovil},{ placa }]});
        if (existe) {
            return res.status(400).json({ msg: "El bus ya existe"});
        }

        const bus = new Bus({ numeroMovil, placa });
        await bus.save();

        res.status(201).json({ msg: "Bus creado correctamente", bus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el bus" });
    }
};

// Obtener todos los buses
export const obtenerBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los buses" });
  }
};

// Actualizar un bus
export const actualizarBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bus) return res.status(404).json({ msg: "Bus no encontrado" });
    res.json({ msg: "Bus actualizado", bus });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el bus" });
  }
};

// Eliminar un bus
export const eliminarBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ msg: "Bus no encontrado" });
    res.json({ msg: "Bus eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el bus" });
  }
};