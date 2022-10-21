import { View, Text } from "react-native";
import React from "react";
import { colors } from "../data/Colours";

export default function Type({ data }) {
  return (
    <View>
      <Text
        style={{
          color: colors.white,
          backgroundColor: colors.primary_x,
          borderRadius: 3,
          paddingHorizontal: 5,
          height: 20,
          opacity: 0.7
        }}
      >
        {data}
      </Text>
    </View>
  );
}
