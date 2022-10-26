import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../data/Colours";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../data/GlobalStyles";

const bgImage = require("../assets/images/greet-1.jpg");

export default function Greetings({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="transparent" style="light" />
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.image}
      >
        <View style={styles.subContainer}>
          <Ionicons name="ios-game-controller" size={40} color={colors.white} />
          <Text style={styles.greetingsText}>
            Play by your rules, let's gooo!
          </Text>

          <CustomButton
            bg={colors.primary_x}
            color={colors.white}
            width={300}
            text="Explore"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    width: "70%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
  },
  greetingsText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});
