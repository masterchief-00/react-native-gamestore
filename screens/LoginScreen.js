import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../data/GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../data/Colours";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import { useIsFocused } from "@react-navigation/native";
import { Audio } from "expo-av";
import sndFile from "../assets/audio/bgaudio.m4a";

const bgImage = {
  uri: "https://www.xtrafondos.com/en/descargar.php?id=1766&vertical=1",
};
export default function LoginScreen({ navigation }) {
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [sound, setSound] = useState(null);

  async function playSound() {
    if (sound === null) {
      console.log("Loading sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/bgaudio.m4a")
      );
      setSound(sound);
      console.log("Playing sound");
      await sound.playAsync();
    }
  }

  const isFocused = useIsFocused();
  const handleNavigation = () => {
    setIndicatorVisibility(true);
    stopMusic();
    navigation.navigate("BottomTabs");
  };

  const stopMusic = () => {
    console.log("Unloading sound");
    sound.stopAsync();
    sound.unloadAsync();
    setSound(null);
  };

  useEffect(() => {
    if (isFocused) {
      playSound();
      setIndicatorVisibility(false);
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.image}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            height: 600,
            width: 400,
            paddingHorizontal: 30,
            paddingTop: 80,
          }}
        >
          <View style={{ padding: 15 }}>
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
                fontSize: 45,
                width: 200,
              }}
            >
              Welcome back!
            </Text>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholderTextColor={colors.white}
                    style={{
                      color: colors.white,
                      padding: 10,
                      backgroundColor: colors.black_a,
                      fontSize: 15,
                      width: "100%",
                      height: 50,
                      borderRadius: 20,
                      marginVertical: 10,
                      borderWidth: 0.8,
                      borderColor: colors.white_a,
                    }}
                  />
                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholderTextColor={colors.white}
                    style={{
                      color: colors.white,
                      padding: 10,
                      backgroundColor: colors.black_a,
                      fontSize: 15,
                      width: "100%",
                      height: 50,
                      borderRadius: 20,
                      marginVertical: 10,
                      borderWidth: 0.8,
                      borderColor: colors.white_a,
                    }}
                  />
                  <Text
                    style={{
                      color: colors.white,
                      fontStyle: "italic",
                      alignSelf: "flex-end",
                      fontSize: 10,
                      textTransform: "uppercase",
                    }}
                  >
                    Forgot your password?
                  </Text>
                  <CustomButton
                    bg={colors.white}
                    color={colors.black}
                    width={150}
                    text="Login"
                    bdcolor="transparent"
                    mt={50}
                    onPress={handleNavigation}
                  />
                </View>
              )}
            </Formik>

            <View
              style={{
                position: "absolute",
                bottom: -80,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              {indicatorVisible && (
                <ActivityIndicator
                  size="large"
                  color={colors.white}
                  style={{ marginBottom: 10 }}
                />
              )}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: colors.white,
                    textTransform: "uppercase",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  New here?{" "}
                </Text>
                <Pressable
                  onPress={() => {
                    stopMusic();
                    navigation.navigate("Signup");
                  }}
                >
                  <Text
                    style={{
                      color: colors.yellow,
                      textTransform: "uppercase",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    sign up
                  </Text>
                </Pressable>
              </View>

              <View
                style={{
                  width: 150,
                  height: 5,
                  backgroundColor: colors.white,
                  marginTop: 5,
                  borderRadius: 15,
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
