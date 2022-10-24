import { View, Text, ScrollView, ImageBackground } from "react-native";
import React from "react";
import { globalStyles } from "../data/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../data/Colours";
import Rating from "../components/Rating";
import DetailsButton from "../components/DetailsButton";
import { useNavigation } from "@react-navigation/native";

export default function GameDetails({ route }) {
  const navigation = useNavigation();
  const game = route.params.game;
  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={game.image_tall}
        resizeMode="cover"
        style={globalStyles.image}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={{
              height: 600,
              width: 400,
              paddingHorizontal: 30,
              paddingTop: 80,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                    fontSize: 65,
                    textShadowColor: "black",
                    textShadowRadius: 8,
                  }}
                >
                  {game.name}
                </Text>
                <View>
                  <Text
                    style={{
                      color: colors.white,
                      backgroundColor: colors.primary_x,
                      padding: 8,
                      borderRadius: 20,
                      width: 90,
                      textAlign: "center",
                    }}
                  >
                    {game.type}
                  </Text>
                  <Rating rate={game.rating} />
                </View>
                <View style={{ paddingTop: 10 }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontWeight: "bold",
                      fontSize: 30,
                      marginTop: 10,
                    }}
                  >
                    Description
                  </Text>
                  <Text
                    style={{
                      color: colors.white,
                      lineHeight: 25,
                      fontSize: 18,
                      fontWeight: "200",
                    }}
                  >
                    {game.description}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-around",
                    marginBottom: 20,
                  }}
                >
                  <DetailsButton
                    color={colors.white}
                    bg={colors.primary_x}
                    width={130}
                    text="Add to wishlist"
                  />
                  <DetailsButton
                    color={colors.black}
                    bg={colors.yellow}
                    width={130}
                    text="Back home"
                    onPress={() => navigation.navigate("Home")}
                  />
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
}
