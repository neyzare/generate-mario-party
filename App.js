import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur"; // Import du flou
import { useStore } from "./store/useStore";

export default function App() {
  const { selectedImage, selectedIcon, getRandomBoard } = useStore(); 

  return (
    <ImageBackground source={selectedImage} style={styles.background}>
      {/* Ajout du flou */}
      <BlurView intensity={9} style={styles.blurContainer}>
        <Text style={styles.title}>Mario Partie</Text>

        {/* Affichage de l'icône */}
        <Image source={selectedIcon} style={styles.icon} />

        <TouchableOpacity onPress={getRandomBoard} style={styles.button}>
          <Text style={styles.buttonText}>Générer une map</Text>
        </TouchableOpacity>
      </BlurView>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  blurContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});