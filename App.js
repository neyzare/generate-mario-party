import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ActivityIndicator, Image } from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./store/useStore";
import { useFonts } from "expo-font";

export default function App() {
  const { selectedImage, selectedIcon, getRandomBoard, logo } = useStore();
  


  const [isFontLoaded] = useFonts({
    "maPolice": require("./assets/fonts/AOTFShinGoProDeBold.otf"), 
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isFontLoaded) {
      setIsReady(true);
    }
  }, [isFontLoaded]);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 10,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {!isReady ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ImageBackground source={selectedImage} style={styles.background}>
          <BlurView intensity={9} style={styles.blurContainer}>
           
            <Image source={logo} style={styles.logo} />
            
            <Animated.Image
              source={selectedIcon}
              style={[styles.icon, { transform: [{ translateY: animatedValue }] }]}
            />
            <TouchableOpacity onPress={getRandomBoard} style={styles.button}>
              <Text style={styles.buttonText}>Générer une map</Text>
            </TouchableOpacity>
          </BlurView>
          <StatusBar style="auto" />
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  logo: {
    width: 290,
    height: 290,
    paddingBottom: 90,
    resizeMode: "contain",
  },
  icon: {
    width: 300,
    height: 300,
    borderRadius: 9999,
    overflow: "hidden",
    marginBottom: 10,
    resizeMode: "contain",
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
    fontFamily: "maPolice",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});