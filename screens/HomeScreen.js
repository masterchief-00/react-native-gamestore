import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../data/GlobalStyles";
import HomeSearch from "../components/HomeSearch";
import User from "../components/User";
import NewGames from "../components/NewGames";
import TopGames from "../components/TopGames";
import MostDownloaded from "../components/MostDownloaded";
import QuickSearch from "../components/QuickSearch";
import AddGame from "../components/AddGame";
import LatestWishlist from "../components/LatestWishlist";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import YourGames from "../components/YourGames";
import axios from "axios";
import { API_URL } from "@env";
import { gameActions } from "../redux/GameSlice";
import { useIsFocused } from "@react-navigation/native";

const bgImage = require("../assets/images/home-bg-1.jpg");

export default function HomeScreen({ navigation }) {
  const userData = useSelector((state) => state.user.userData);
  const categories = useSelector((state) => state.category.categories);
  const newGames = useSelector((state) => state.game.newGames);
  const topGames = useSelector((state) => state.game.topGames);
  const mostDownloaded = useSelector((state) => state.game.mostDownloaded);

  const token = useSelector((state) => state.user.token);
  const activeCategory = useSelector((state) => state.game.activeCategory);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const userHasGames = userData.games > 0;

  const fetchAllGames = async () => {
    axios({
      method: "get",
      url: `${API_URL}/games`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          /** setting all games to states */
          dispatch(gameActions.setNewGame({ list: response.data.new_games }));
          dispatch(gameActions.setTopGame({ list: response.data.top_games }));
          dispatch(
            gameActions.setMostDownloaded({
              list: response.data.most_downloaded,
            })
          );

          /** attaching category names */
          dispatch(
            gameActions.attachCategoryName__most({
              list: response.data.categories,
            })
          );
          dispatch(
            gameActions.attachCategoryName__new({
              list: response.data.categories,
            })
          );
          dispatch(
            gameActions.attachCategoryName__top({
              list: response.data.categories,
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isFocused) {
      fetchAllGames();
    }
  }, [isFocused]);

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.imageHome}
      >
        <View style={styles.subContainer}>
          <User />
          <HomeSearch />
          <QuickSearch />
          {activeCategory !== "explore" && (
            <ScrollView style={{ marginTop: 15 }}>
              <Text style={{ color: "white" }}>{activeCategory}</Text>
            </ScrollView>
          )}
          {activeCategory === "explore" && (
            <ScrollView style={{ marginTop: 15 }}>
              {newGames.length > 0 && <NewGames data={newGames} />}
              {topGames.length > 0 && <TopGames data={topGames} />}
              {mostDownloaded.length > 0 && (
                <MostDownloaded data={mostDownloaded} />
              )}
              {userHasGames && <YourGames />}
              <LatestWishlist />
            </ScrollView>
          )}
          {activeCategory === "explore" && <AddGame />}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingTop: 40,
  },
});
