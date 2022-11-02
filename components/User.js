import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import { useSelector } from "react-redux";

export default function User() {
  const token = useSelector((state) => state.user.token);
  const userName = useSelector((state) => state.user.userData.name);
  const navigation = useNavigation();
  const [indicatorVisible, setIndicatorVisibility] = useState(false);

  const handleLogout = async () => {
    setIndicatorVisibility(true);
    
    await axios({
      method: "post",
      url: `${API_URL}/users/logout`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        setIndicatorVisibility(false);
        console.log(error);
      });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("User")}
        activeOpacity={0.8}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={require("../assets/images/avatar.jpg")}
          style={{ borderRadius: 50, height: 40, width: 40 }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {userName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={indicatorVisible}
        style={{ flexDirection: "row-reverse", alignItems: "center" }}
        onPress={handleLogout}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
            color: !indicatorVisible ? colors.yellow : colors.yellow_a,
            marginHorizontal: 9,
          }}
        >
          LOG OUT
        </Text>
        <AntDesign
          name="logout"
          size={20}
          color={!indicatorVisible ? colors.yellow : colors.yellow_a}
        />
        {indicatorVisible && (
          <ActivityIndicator
            size="small"
            color={colors.primary_variant_x}
            style={{ marginRight: 10 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
