import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { globalStyles } from "../data/GlobalStyles";
import { colors } from "../data/Colours";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import GameCard_elite from "../components/GameCard_elite";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const bgImage = require("../assets/images/home-bg-1.jpg");

export default function WishList() {
  const userData = useSelector((state) => state.user.userData);
  const userImage = userData.image;
  const allGames = useSelector((state) => state.game.userGames);
  const wishlistGames = allGames.filter((game) => game.isOnWishlist === 1);

  const navigation = useNavigation();

  const avatar =
    userImage !== null
      ? { uri: userImage }
      : require("../assets/images/avatar.jpg");

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.imageWishlist}
      >
        <View
          style={{
            marginLeft: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              name="clipboard-list"
              size={56}
              color={colors.white}
            />
            <View>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 25,
                  marginLeft: 10,
                }}
              >
                Wishlist
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "200",
                  fontStyle: "italic",
                  fontSize: 12,
                  marginLeft: 10,
                }}
              >
                {userData.wishlist > 1
                  ? `${userData.wishlist} items`
                  : `${userData.wishlist} item`}{" "}
                on the list
              </Text>
            </View>
          </View>

          <View style={{ marginRight: 30, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("User")}
              activeOpacity={0.8}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={avatar}
                style={{ borderRadius: 50, height: 40, width: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <FontAwesome
              name="angle-double-down"
              size={24}
              color={colors.white}
              style={{ marginTop: 10 }}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", flex: 1, marginTop: 10 }}>
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 5, overflow: "hidden" }}
            >
              {wishlistGames.map((game) => (
                <GameCard_elite key={game.id} data={game} cardOpen={false} />
              ))}

              {/* <View style={{ height:  }} /> */}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
