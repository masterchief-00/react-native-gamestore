import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { colors } from "../data/Colours";
import Rating from "./Rating";
import Type from "./Type";

export default function GameCard_elite({ data, cardOpen }) {
  const [cardFold, setCardFold] = useState(cardOpen);

  return (
    <View
      style={{
        marginTop: 1,
        height: cardFold === true ? 178 : 80,
        overflow: "hidden",
      }}
    >
      {!cardFold && (
        <View
          style={{
            position: "absolute",
            backgroundColor: colors.black_a,
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <Image
        source={data.image}
        resizeMode="stretch"
        style={{
          height: 175,
          borderRadius: 8,
          aspectRatio: 2,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: cardFold ? 10 : 28,
          left: 10,
          zIndex: 5,
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: cardFold ? 23 : 28,
            textShadowColor: colors.black,
            textShadowRadius: 15,
          }}
        >
          {data.name}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          top: cardFold ? 10 : 50,
          left: 10,
          zIndex: 5,
        }}
      >
        <View
          style={{
            backgroundColor: colors.black_a,
            borderRadius: 10,
            paddingBottom: 5,
            paddingHorizontal: 4,
            marginRight: 5,
          }}
        >
          <Rating
            showPeople={false}
            size={cardFold ? 13 : 9}
            rate={data.rating}
          />
        </View>
        <Type
          opacity={0.9}
          data={data.type}
          pt={cardFold ? 0 : 2}
          fs={cardFold ? 14 : 11}
        />
      </View>

      {cardFold && (
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: colors.bg_variant,
            borderRadius: 10,
            padding: 5,
            zIndex: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Feather name="download" size={10} color={colors.white} />
            <Text
              style={{
                color: colors.white,
                marginHorizontal: 5,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {data.downloads.toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setCardFold(!cardFold)}
        activeOpacity={0.4}
        style={{
          position: "absolute",
          bottom: cardFold ? 10 : 25,
          right: 10,
          backgroundColor: colors.black_a,
          borderRadius: 10,
          padding: 5,
          zIndex: 5,
        }}
      >
        <MaterialIcons
          name={cardFold ? "unfold-less" : "unfold-more"}
          size={cardFold ? 24 : 20}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}
