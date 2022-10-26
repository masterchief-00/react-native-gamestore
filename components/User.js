import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import { useNavigation } from "@react-navigation/native";

export default function User() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Image
        source={require("../assets/images/avatar.jpg")}
        style={{ borderRadius: 50, height: 40, width: 40 }}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={{ flexDirection: "row-reverse", alignItems: "center" }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
            color: colors.yellow,
            marginHorizontal: 9,
          }}
        >
          LOG OUT
        </Text>
        <AntDesign name="logout" size={20} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
