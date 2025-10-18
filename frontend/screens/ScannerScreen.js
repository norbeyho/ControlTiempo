import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function ScannerScreen () {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeSacanned = async ({ type, data}) => {
        setScanned(true);
        try {
            const info = JSON.parse(data);
            console.log("Datos QR:", info);

            const puntoControl = "COTRAFA";
            const origen = "MEDELLIN";

            const token = "dkfg_01_fed_98ari-98";

            const res = await axios.post(
                "http://localhost:5000/api/registros",
                {
                    busId: info.busId,
                    tipo: "CONTROL",
                    origen,
                    puntoControl,
                },
                {
                    headers: { Authorization: `Bearer ${token}`},
                }
            );

            Alert.alert("Registro exitoso", `${res.data.msg}\nEstado: ${res.data.estado}`);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo registrar el control");
        } finally {
            setScanned(false);
        }
    };

    if (hasPermission === null) return <Text>Solicitando permiso...</Text>;
    if (hasPermission === false) return <Text>Sin acceso a la cámara</Text>;

    return (
        <View style={{flex: 1}}>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeSacanned}
            style={{flex: 1}}
            />
        </View>
    );
}