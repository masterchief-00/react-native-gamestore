import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { globalStyles } from "../data/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../data/Colours";
import { Feather, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

const bgImage = require("../assets/images/bg-user-2.jpg");

export default function UserProfile() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.imageHome}
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
              height: 700,
              width: 400,
              paddingHorizontal: 30,
              paddingTop: 80,
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Image
                  source={require("../assets/images/avatar.jpg")}
                  style={{ borderRadius: 50, height: 100, width: 100 }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 70,
                    left: 70,
                    zIndex: 3,
                  }}
                >
                  <Feather name="edit" size={20} color={colors.yellow} />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 40,
                    color: colors.white,
                    textShadowColor: colors.black,
                    textShadowRadius: 13,
                  }}
                >
                  John Doe
                </Text>
                <Text
                  style={{
                    color: colors.white_a,
                    fontStyle: "italic",
                    fontSize: 13,
                  }}
                >
                  Joined 12/04/2017
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="mail" size={18} color={colors.yellow} />
                  <Text
                    style={{
                      color: colors.white_a,
                      fontWeight: "400",
                      marginLeft: 5,
                    }}
                  >
                    doe@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="location-pin" size={18} color={colors.yellow} />
                  <Text
                    style={{
                      color: colors.white_a,
                      fontWeight: "400",
                      marginLeft: 5,
                    }}
                  >
                    Kigali,Rwanda
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign name="like1" size={35} color={colors.yellow} />
                <Text style={{ color: colors.yellow,fontWeight:'bold',fontSize:20, marginLeft: 5 }}>
                  Likes
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="post-add"
                  size={35}
                  color={colors.yellow}
                />
                <Text style={{ color: colors.yellow,fontWeight:'bold',fontSize:20, marginLeft: 5 }}>
                  Wishlist
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: "bold",
                }}
              >
                About me
              </Text>
              <Text
                style={{ color: colors.white, fontSize: 20, fontWeight: "300" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
                a, atque voluptates reiciendis impedit ea id cum tempore, omnis
                similique sunt, blanditiis deleniti asperiores eaque! Aliquid
                sapiente expedita autem ipsam?
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
}
