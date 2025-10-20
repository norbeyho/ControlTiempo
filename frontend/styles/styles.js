import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e53935",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  containerScanner: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  overlayScanner: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    alignItems: "center",
  },
  textScanner: { fontSize: 16, marginBottom: 10, color: "#333" },
  buttonScanner: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonTextScanner: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default styles;