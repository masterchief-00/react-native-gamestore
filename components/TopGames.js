import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../data/Colours";
import GameCard from "./GameCard";
import { useNavigation } from "@react-navigation/native";

export default function TopGames({ data }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 10,
        height: 300,
      }}
    >
      <Text
        style={{
          color: colors.white,
          fontWeight: "bold",
          fontSize: 26,
          marginBottom: 20,
        }}
      >
        Top rated games
      </Text>
      <ScrollView horizontal>
        {data.map((game) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={game.id}
            onPress={() => navigation.navigate("Details", { game })}
          >
            <GameCard
              key={game.id}
              image={{ uri: game.image_wide }}
              name={game.title}
              downloads={game.downloads}
              type={game.category_name}
              rating={game.rating}
              gameID={game.id}
              isOnWishlist={game.isOnWishlist===1 ? true : false}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
