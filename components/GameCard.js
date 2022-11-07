import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import Rating from "./Rating";
import Type from "./Type";
import axios from "axios";
import { API_URL } from "@env";
import { useSelector } from "react-redux";

export default function GameCard({
  image,
  name,
  downloads,
  type,
  rating,
  gameID,
  isOnWishlist,
}) {
  const [favorite, setFavorite] = useState(isOnWishlist);
  const token = useSelector((state) => state.user.token);

  const handleAddFavorite = async () => {
    if (!favorite) {
      await axios({
        method: "post",
        url: `${API_URL}/wishlist`,
        data: {
          game_id: gameID,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.message);
            setFavorite(!favorite);
          }
        })
        .catch((error) => console.log(error.response.data));
    } else {
      await axios({
        method: "delete",
        url: `${API_URL}/wishlist/${gameID}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.message);
            setFavorite(!favorite);
          }
        })
        .catch((error) => console.log(error.response.data));
    }
  };

  return (
    <View
      style={{
        overflow: "hidden",
        padding: 5,
        marginRight: 7,
      }}
    >
      <Image
        source={image}
        resizeMode="stretch"
        style={{
          height: 150,
          borderRadius: 8,
          aspectRatio: 2,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Feather name="download" size={20} color={colors.white_a} />
          <Text
            style={{
              color: colors.white_a,
              marginHorizontal: 5,
            }}
          >
            {downloads.toLocaleString()}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          marginTop: 8,
          paddingHorizontal: 5,
        }}
      >
        <Type data={type} />
        <Rating rate={rating} />
      </View>
      <TouchableOpacity
        onPress={handleAddFavorite}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <MaterialIcons
          name={favorite == 1 ? "favorite" : "favorite-border"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
