import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../data/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../data/Colours";
import { games } from "../data/Games";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import Rating from "../components/Rating";

const bgImage = {
  uri: "https://wallpaperaccess.com/full/5872517.jpg",
};

export default function WishList() {
  const wishlistGames = games;
  // useEffect(() => {
  //   console.log(wishlistGames.length);
  // });
  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.image}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            height: 500,
            width: 400,
            paddingHorizontal: 30,
            paddingTop: 40,
            flex: 1,
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <View style={{ alignItems:'center' }}>
              <FontAwesome5
                name="clipboard-list"
                size={56}
                color={colors.white}
              />

              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 15,
                  padding: 5,
                }}
              >
                Wishlist
              </Text>
            </View>

            <View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 10 }}
              >
                {wishlistGames.map((game) => (
                  <View
                    key={game.id}
                    style={{
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      width: 320,
                      marginBottom: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor: colors.bg,
                      borderWidth: 1,
                      borderColor: colors.primary,
                    }}
                  >
                    <Image
                      source={game.image}
                      resizeMode="stretch"
                      style={{
                        height: 70,
                        borderRadius: 8,
                        aspectRatio: 2,
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: "bold",
                          fontSize: 17,
                        }}
                      >
                        {game.name}
                      </Text>
                      <Text
                        style={{
                          color: colors.primary,
                          textTransform: "uppercase",
                          fontSize: 8,
                        }}
                      >
                        {game.type}
                      </Text>
                      <Text style={{ color: colors.yellow, fontSize: 10 }}>
                        <Feather
                          name="download"
                          size={10}
                          color={colors.yellow}
                        />
                        {game.downloads}
                      </Text>
                      <Rating rate={game.rating} size={10} />
                    </View>
                    <TouchableOpacity
                      style={{ position: "absolute", left: 280, top: 60 }}
                    >
                      <Feather name="trash-2" size={20} color={colors.yellow} />
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={{ height: 120 }} />
              </ScrollView>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
