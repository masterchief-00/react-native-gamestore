import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../data/Colours";
import GameCard from "./GameCard";
import { games } from "../data/Games";
import { useNavigation } from "@react-navigation/native";

const newGames = games.slice(5, 9);

export default function NewGames() {
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
        New games
      </Text>
      <ScrollView horizontal>
        {newGames.map((game) => (
          <TouchableOpacity
            key={game.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Details", {game})}
          >
            <GameCard
              image={game.image}
              name={game.name}
              downloads={game.downloads}
              type={game.type}
              rating={game.rating}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
