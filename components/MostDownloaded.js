import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../data/Colours";
import GameCard from "./GameCard";
import { games } from "../data/Games";
import { useNavigation } from "@react-navigation/native";

const mostDownloadedGames = games.sort((a, b) => b.downloads - a.downloads);

export default function MostDownloaded({ data }) {
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
        Most downloaded
      </Text>
      <ScrollView horizontal>
        {data.map((game) => (
          <TouchableOpacity
            key={game.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Details", { game })}
          >
            <GameCard
              image={{ uri: game.image_wide }}
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
