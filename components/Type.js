import { View, Text } from "react-native";
import React from "react";
import { colors } from "../data/Colours";

export default function Type({ data, opacity = 0.7, fs = 14, pt = 0 }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: colors.white,
          backgroundColor: colors.primary_x,
          borderRadius: 3,
          paddingHorizontal: 5,
          paddingTop: pt,
          height: 20,
          opacity: opacity,
          fontSize: fs,
        }}
      >
        {data}
      </Text>
    </View>
  );
}
