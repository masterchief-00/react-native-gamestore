import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../data/Colours";

const categories = [
  { name: "Explore", active: true },
  { name: "Arcade", active: false },
  { name: "Adventure", active: false },
  { name: "Action", active: false },
  { name: "Open world", active: false },
  { name: "Horror", active: false },
  { name: "Indie", active: false },
];

export default function QuickSearch() {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View
            key={index}
            style={
              category.active
                ? styles.category_selected
                : styles.category_normal
            }
          >
            <Text
              style={
                category.active ? styles.text_selected : styles.text_normal
              }
            >
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  category_normal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_a,
    padding: 5,
    width:80,
    borderRadius: 8,
    marginHorizontal: 3,
    marginTop: 20,
    marginRight: 5,
  },
  category_selected: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width:80,
    borderRadius: 20,
    borderBottomColor: colors.yellow,
    borderBottomWidth: 2,
    backgroundColor: colors.primary_a,
    marginHorizontal: 3,
    marginTop: 20,
    marginRight: 5,
  },
  text_selected: {
    color: colors.yellow,
    fontSize: 13,
  },
  text_normal: {
    color: colors.primary,
    fontSize: 13,
    opacity: 0.6,
  },
});
