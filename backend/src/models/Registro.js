import mongoose from "mongoose";

const registroSchema = new mongoose.Schema(
    {
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true,
        },
        tipo: {
            type: String,
            enum: ["SALIDA", "CONTROL"],
            required: true,
        },
        puntoControl: {
            type: String,
            default: null,
        },
        horaRegistro: {
            type: Date,
            default: Date.now,
        },
        tiempoTranscurrido: {
            type: Number,
            default: 0,
        },
        estado: {
            type: String,
            enum: ["A TIEMPO", "CON RETRASO", "EN RUTA"],
            default: "EN RUTA",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Registro", registroSchema);