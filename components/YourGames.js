import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../data/Colours";
import GameCard from "./GameCard";
import { games } from "../data/Games";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../redux/GameSlice";
import { API_URL } from "@env";
import { CategoryActions } from "../redux/CategorySlice";

const newGames = games.slice(5, 9);

export default function YourGames() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const userData = useSelector((state) => state.user.userData);
  const userGames = useSelector((state) => state.game.userGames);
  const token = useSelector((state) => state.user.token);

  const fetchGames = async () => {
    await axios({
      method: "get",
      url: `${API_URL}/games/${userData.email}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(gameActions.setUserGames({ list: response.data.games }));
          dispatch(gameActions.attachCategoryName({ list: categories }));
        }
      })
      .catch((error) => console.log(error));
  };
  const getCategoryName = (id) => {
    let foundCategory = categories[id].name;
    console.log(foundCategory);
    return foundCategory;
  };
  useEffect(() => {
    if (isFocused) {
      fetchGames();
    }
  }, [isFocused]);
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
        Your games
      </Text>
      <ScrollView horizontal>
        {userGames.map((game) => (
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
