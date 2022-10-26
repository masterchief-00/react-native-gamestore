import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  TouchableOpacity,
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
import { Feather } from "@expo/vector-icons";

const bgImage = {
  uri: "https://images.wallpapersden.com/image/download/call-of-duty-warzone-hd-gaming_bGxmbmeUmZqaraWkpJRmaWllrWdqa2U.jpg",
};

export default function SignupScreen({ navigation }) {
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [sound, setSound] = useState(null);
  const [sndIcon, setSndIcon] = useState(true);

  async function playSound() {
    if (sound === null) {
      console.log("Loading sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/bgaudio2.m4a")
      );
      sound.setIsLoopingAsync();
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

  const toggleMusic = async () => {
    console.log("toggling music");
    sndIcon ? sound.pauseAsync() : sound.replayAsync();
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
              Fill this up
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
                    placeholder="Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
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
                    placeholder="Location"
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    value={values.location}
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

                  <CustomButton
                    bg={colors.white}
                    color={colors.black}
                    width={150}
                    text="Sign up"
                    bdcolor="transparent"
                    mt={20}
                    onPress={handleNavigation}
                  />
                </View>
              )}
            </Formik>

            <View
              style={{
                marginTop: 40,
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
                  Or maybe,{" "}
                </Text>
                <Pressable
                  onPress={() => {
                    stopMusic();
                    navigation.navigate("Login");
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
                    Log in
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
            <TouchableOpacity
              onPress={() => {
                setSndIcon(!sndIcon);
                toggleMusic();
              }}
              style={{
                position: "absolute",
                bottom: 100,
                right: 60,
                backgroundColor: colors.white_a,
                borderRadius: 15,
                padding: 3,
              }}
            >
              <Feather
                name={sndIcon ? "volume-2" : "volume-x"}
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
