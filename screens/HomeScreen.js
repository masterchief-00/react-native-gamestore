import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
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
import { useSelector } from "react-redux";
import YourGames from "../components/YourGames";

const bgImage = require("../assets/images/home-bg-1.jpg");

export default function HomeScreen({ navigation }) {
  const userData = useSelector((state) => state.user.userData);
  const userHasGames = userData.games > 0;
  
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
          <ScrollView style={{ marginTop: 15 }}>
            <NewGames />
            <TopGames />
            <MostDownloaded />
            {userHasGames && <YourGames />}
            <LatestWishlist />
          </ScrollView>
          <AddGame />
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
