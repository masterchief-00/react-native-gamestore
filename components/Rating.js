import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../data/Colours";

export default function Rating({ rate,size=15 }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 8,
          marginHorizontal: 3,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome
          name={rate >= 1 ? "star" : rate >= 0.5 ? "star-half-empty" : "star-o"}
          size={size}
          color="yellow"
        />
        <FontAwesome
          name={rate >= 2 ? "star" : rate >= 1.5 ? "star-half-empty" : "star-o"}
          size={size}
          color="yellow"
        />
        <FontAwesome
          name={rate >= 3 ? "star" : rate >= 2.5 ? "star-half-empty" : "star-o"}
          size={size}
          color="yellow"
        />
        <FontAwesome
          name={rate >= 4 ? "star" : rate >= 3.5 ? "star-half-empty" : "star-o"}
          size={size}
          color="yellow"
        />
        <FontAwesome
          name={rate >= 5 ? "star" : rate >= 4.5 ? "star-half-empty" : "star-o"}
          size={size}
          color="yellow"
        />
      </View>
      <Text style={{ color: colors.white_a, fontSize: 9 }}>(3,445,234)</Text>
    </View>
  );
}
