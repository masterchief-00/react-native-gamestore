import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import GameCard_elite from "./GameCard_elite";
import { gameActions } from "../redux/GameSlice";
import { colors } from "../data/Colours";

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
      <Text
        style={{
          color: colors.white,
          fontWeight: "bold",
          fontSize: 26,
          marginBottom: 20,
        }}
      >
        Search results
      </Text>
      {gameResults.length < 1 && (
        <Text
          style={{
            color: colors.primary_variant_x,
            fontWeight: "200",
            fontSize: 20,
            marginBottom: 20,
            alignSelf: "center",
            borderStyle: "dashed",
            borderColor: colors.primary_variant_x,
            borderWidth: 1,
            padding: 5,
          }}
        >
          No results found
        </Text>
      )}
      {gameResults.map((game) => (
        <GameCard_elite key={game.newId} data={game} cardOpen={true} />
      ))}
    </ScrollView>
  );
}
