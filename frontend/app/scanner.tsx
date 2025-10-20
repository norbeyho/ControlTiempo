import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
//import styles from '../styles/styles'
import styles from '../styles/styles'
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import axios from "axios";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setScannedData(data);

    try {
      // Envía el registro al backend
      const res = await axios.post("http://localhost:5000/api/registros", {
        qrData: data,
        punto: "comfama",
        hora: new Date(),
      });

      Alert.alert("✅ Registro exitoso", `Bus registrado: ${data}`);
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "No se pudo registrar la lectura.");
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permisos de cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permiso de cámara no concedido</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      {scanned && (
        <View style={styles.overlayScanner}>
          <Text style={styles.textScanner}>QR leído: {scannedData}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Escanear otro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#555" }]}
            onPress={() => router.replace("/home")}
          >
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}