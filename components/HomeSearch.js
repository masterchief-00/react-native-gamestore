import { View, Text, TextInput } from "react-native";
import React from "react";
import { colors } from "../data/Colours";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function HomeSearch() {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 330,
          height: 40,
          padding: 5,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: colors.primary_a,
          borderRadius: 30,
          borderWidth: 0.6,
          borderColor: colors.primary_x,
          overflow: "hidden",
        }}
      >
        <AntDesign
          name="search1"
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
        <TextInput
          placeholder="Search games"
          style={{
            width: "70%",
            borderRadius: 50,
            color: colors.white,
          }}
          placeholderTextColor={colors.white_a}
        />
        <MaterialIcons
          name="clear"
          size={20}
          color={colors.white}
          style={{
            marginLeft: 1,
            borderLeftWidth: 1,
            borderColor: colors.white_a,
            padding: 3,
          }}
        />
      </View>
    </View>
  );
}
