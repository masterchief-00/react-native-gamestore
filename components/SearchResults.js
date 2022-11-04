import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import GameCard_elite from "./GameCard_elite";
import { gameActions } from "../redux/GameSlice";

export default function SearchResults({ query }) {
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.user.token);
  const gameResults = useSelector((state) => state.game.categorySearchGames);
  const categoryList = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const fetchResults = async () => {
    if (query !== "explore") {
      await axios({
        method: "get",
        url: `${API_URL}/games/search/${query}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.category_search_result);
            dispatch(
              gameActions.setSearchResults({
                list: response.data.category_search_result,
              })
            );
            dispatch(
              gameActions.attachCategoryName__categorySearch({
                list: categoryList,
              })
            );
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(gameActions.clearGames("SEARCH"));
      fetchResults();
    }
  }, [isFocused, query]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
      <Text style={{ color: "white" }}>{query}</Text>
      {gameResults.map((game) => (
        <GameCard_elite key={game.newId} data={game} cardOpen={false} />
      ))}
    </ScrollView>
  );
}
