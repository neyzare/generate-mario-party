import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ActivityIndicator, Image } from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./store/useStore";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

export default function App() {
  const { selectedImage, selectedIcon, getRandomBoard, logo } = useStore();
  const [sound, setSound] = useState();

  const triggerHapticsMedium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const triggerHapticsHeavy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  useEffect(() => {
    async function playMusic() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/sounds/Mario-Kart-Stadium-Mario-Kart 8-OST.mp3"),
          { shouldPlay: true, isLooping: true }
        );
        setSound(sound);
        await sound.playAsync();
      } catch (error) {
        console.error("Erreur lors du chargement du son :", error);
      }
    }

    playMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const [isFontLoaded] = useFonts({
    maPolice: require("./assets/fonts/AOTFShinGoProDeBold.otf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isFontLoaded) {
      setIsReady(true);
    }
  }, [isFontLoaded]);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotationValue = useRef(new Animated.Value(0)).current;

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

  // Animation de rotation
  const spinAnimation = () => {
    return new Promise((resolve) => {
      Animated.timing(rotationValue, {
        toValue: 1, 
        duration: 1000, 
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        rotationValue.setValue(0); 
        resolve(); 
      });
    });
  };

  const handleGenerateMap = async () => {
    triggerHapticsMedium(); 
    await spinAnimation(); 
    getRandomBoard(); 
  };

  return (
    <View style={styles.container}>
      {!isReady ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ImageBackground source={selectedImage} style={styles.background}>
          <BlurView intensity={4} style={styles.blurContainer}>
            {logo && <Image source={logo} style={styles.logo} />}

            <Animated.Image
              source={selectedIcon}
              style={[
                styles.icon,
                {
                  transform: [
                    { translateY: animatedValue }, 
                    {
                      rotate: rotationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"], 

                      }),
                    },
                  ],
                },
              ]}
            />

            <TouchableOpacity onPress={handleGenerateMap} style={styles.button}>
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