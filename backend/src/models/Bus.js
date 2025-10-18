import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
    {
        numeroMovil: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        placa: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        estado: {
        type: String,
        enum: ["activo", "inactivo", "mantenimiento"],
        default: "activo",
        },
    },
    { timestamps: true }    
)

const Bus = mongoose.model("Bus", busSchema)
export default Bus;