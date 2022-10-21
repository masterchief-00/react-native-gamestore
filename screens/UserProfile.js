import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { globalStyles } from "../data/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../data/Colours";

const bgImage = require("../assets/images/bg-user-2.jpg");

export default function UserProfile() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.imageHome}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={{
              height: 700,
              width: 400,
              paddingHorizontal: 30,
              paddingTop: 80,
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Image
                source={require("../assets/images/avatar.jpg")}
                style={{ borderRadius: 50, height: 100, width: 100 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 40,
                  color: colors.white,
                  textShadowColor: colors.black,
                  textShadowRadius: 13,
                }}
              >
                John Doe
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
}
