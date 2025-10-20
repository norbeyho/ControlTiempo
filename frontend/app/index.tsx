/* eslint-disable import/no-named-as-default-member */

import styles from '../styles/styles'
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Campos requeridos", "Por favor ingresa usuario y contraseña");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://192.68.80.14:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        await AsyncStorage.setItem("token", response.data.token);
        router.replace("/scanner");
      } else {
        Alert.alert("Error", "Respuesta inesperada del servidor");
      }
    } catch (err: unknown) {
      console.error("Error en login:", err);

      if (axios.isAxiosError(err)) {
        const mensaje =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales o conexión.";
        Alert.alert("Error", mensaje);
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Control de Tiempo</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Entrando..." : "Iniciar sesión"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}




