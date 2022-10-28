import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
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
import { Feather, Entypo } from "@expo/vector-icons";

const bgImage = {
  uri: "https://www.xtrafondos.com/en/descargar.php?id=1766&vertical=1",
};
export default function LoginScreen({ navigation }) {
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [sound, setSound] = useState(null);
  const [sndIcon, setSndIcon] = useState(true);
  const [modalVisible, setmodalVisible] = useState(false);

  async function playSound() {
    if (sound === null) {
      console.log("Loading sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/bgaudio3.mp3")
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
      setSndIcon(true);
      playSound();
      setIndicatorVisibility(false);
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }} on>
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ padding: 15 }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 45,
                  width: 200,
                  textShadowColor: "black",
                  textShadowRadius: 8,
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

                    <TouchableOpacity
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => setmodalVisible(true)}
                    >
                      <Text
                        style={{
                          color: colors.white,
                          fontStyle: "italic",
                          fontSize: 10,
                          textTransform: "uppercase",
                        }}
                      >
                        Forgot your password?
                      </Text>
                    </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  setSndIcon(!sndIcon);
                  toggleMusic();
                }}
                style={{
                  position: "absolute",
                  bottom: 27,
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
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
              >
                <View
                  style={{
                    backgroundColor: colors.black_a,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      height: "10%",
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: colors.yellow_a,
                      backgroundColor: colors.black,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.yellow,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Yeah, you're screwed!
                    </Text>
                    <Text
                      style={{
                        color: colors.yellow,
                        fontWeight: "300",
                        fontSize: 12,
                      }}
                    >
                      But don't worry, we are still working on that feature!
                    </Text>
                    <View
                      style={{
                        position: "absolute",
                        top: -25,
                        right: 15,
                        backgroundColor: colors.black,
                        borderWidth: 1,
                        borderRadius: 7,
                        borderBottomWidth: 0,
                        borderColor: colors.yellow_a,
                      }}
                    >
                      <TouchableOpacity onPress={() => setmodalVisible(false)}>
                        <Entypo name="cross" size={30} color={colors.yellow} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
