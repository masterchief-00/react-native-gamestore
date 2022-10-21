import { View, Text, StyleSheet, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import WishList from "../screens/WishList";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../data/Colours";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const CustomTab = ({ children, onPress }) => (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 50,
        backgroundColor: colors.bg,
        borderWidth: 0.6,
        borderColor: colors.primary,
        height: 70,
        width: 70,
        top: -30,
      }}
    >
      {children}
    </Pressable>
  );
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { ...styles.tabStyle },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="User"
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {focused ? (
                <FontAwesome name="user" size={24} color={colors.yellow} />
              ) : (
                <Feather name="user" size={24} color={colors.primary} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {focused ? (
                <Ionicons name="md-home" size={24} color={colors.yellow} />
              ) : (
                <Feather name="home" size={24} color={colors.primary} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {focused ? (
                <MaterialCommunityIcons
                  name="clipboard-list"
                  size={24}
                  color={colors.yellow}
                />
              ) : (
                <Feather name="list" size={24} color={colors.primary} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: colors.bg,
    height: 45,
  },
});
