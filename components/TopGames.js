import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../data/Colours";
import GameCard from "./GameCard";
import { games } from "../data/Games";
import { useNavigation } from "@react-navigation/native";

const topGames = games.filter((game) => game.rating >= 4);

export default function TopGames({data}) {
    const navigation=useNavigation()
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
              image={{uri:game.image_wide}}
              name={game.title}
              downloads={game.downloads}
              type={game.category_name}
              rating={game.rating}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
