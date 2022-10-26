import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../data/Colours";
import { Ionicons } from "@expo/vector-icons";
import DetailsButton from "./DetailsButton";
import { Formik } from "formik";

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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.category_add}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.text_selected}>
            <Ionicons
              name="ios-add-circle-outline"
              size={24}
              color={colors.primary}
            />
          </Text>
        </TouchableOpacity>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.black_a,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: colors.bg,
              width: 330,
              minHeight: "20%",
              borderColor: colors.bg_variant,
              borderTopWidth: 0,
              borderWidth: 0.9,
              borderBottomRightRadius: 55,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
                fontSize: 20,
                textTransform: "uppercase",
              }}
            >
              ADD NEW CATEGORY
            </Text>
            <Formik
              initialValues={{
                category: "",
              }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  {/* ------------------TITLE--------------- */}
                  <TextInput
                    placeholder="New Category"
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    placeholderTextColor={colors.primary}
                    style={{
                      color: colors.primary_variant_x,
                      textAlign: "center",
                      backgroundColor: colors.bg_variant,
                      fontSize: 15,
                      width: 250,
                      height: 40,
                      borderBottomWidth: 1.5,
                      borderColor: colors.primary_variant_x,
                    }}
                  />
                  <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <DetailsButton
                      text="Submit"
                      bg={colors.primary_variant_x}
                      color={colors.black}
                      width={100}
                      mt={10}
                      onPress={() => setModalVisible(false)}
                    />
                    <DetailsButton
                      text="Close"
                      bg={colors.yellow}
                      color={colors.black}
                      width={100}
                      mt={10}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              )}
            </Formik>
            <View
              style={{
                width: "30%",
                height: 5,
                backgroundColor: colors.primary_variant_x,
                marginTop: 15,
                borderRadius: 15,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  category_add: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_a,
    padding: 2,
    borderRadius: 20,
    marginHorizontal: 3,
    marginTop: 20,
    marginRight: 5,
  },
  category_normal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_a,
    padding: 5,
    width: 80,
    borderRadius: 8,
    marginHorizontal: 3,
    marginTop: 20,
    marginRight: 5,
  },
  category_selected: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
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
