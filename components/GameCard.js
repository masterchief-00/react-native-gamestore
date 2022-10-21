import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import Rating from "./Rating";
import Type from "./Type";

export default function GameCard({ image, name, downloads, type, rating }) {
  return (
    <View
      style={{
        overflow: "hidden",
        padding: 5,
        marginRight: 7,
      }}
    >
      <Image
        source={image}
        resizeMode="stretch"
        style={{
          height: 150,
          borderRadius: 8,
          aspectRatio: 2,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Feather name="download" size={20} color={colors.white_a} />
          <Text
            style={{
              color: colors.white_a,
              marginHorizontal: 5,
            }}
          >
            {downloads.toLocaleString()}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          marginTop: 8,
          paddingHorizontal: 5,
        }}
      >
        <Type data={type} />
        <Rating rate={rating} />
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <MaterialIcons name="favorite-border" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
