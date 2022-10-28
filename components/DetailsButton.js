import { Text, TouchableOpacity } from "react-native";

import React from "react";
import { colors } from "../data/Colours";

export default function DetailsButton({
  text,
  bg,
  color,
  width,
  onPress,
  mt = 30,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.primary_a : bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        marginTop: mt,
        width: width,
      }}
      onPress={onPress}
    >
      <Text style={{ color: color, fontWeight: "bold", fontSize: 15 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
