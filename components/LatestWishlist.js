import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../data/Colours";
import GameCard from "./GameCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";


export default function LatestWishlist() {
  const allGames = useSelector((state) => state.game.userGames);
  const wishlistGames = allGames.filter((game) => game.isOnWishlist === 1);

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
        Latest on your Wishlist
      </Text>
      <ScrollView horizontal>
        {wishlistGames.map((game) => (
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
              gameID={game.id}
              isOnWishlist={game.isOnWishlist ? true : false}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
