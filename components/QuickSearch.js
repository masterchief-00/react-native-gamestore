import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../data/Colours";
import { Ionicons, Entypo } from "@expo/vector-icons";
import DetailsButton from "./DetailsButton";
import { Formik } from "formik";
import axios from "axios";
import { API_URL } from "@env";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { CategoryActions } from "../redux/CategorySlice";

export default function QuickSearch() {
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector((state) => state.user.token);
  const isFocused = useIsFocused();
  const categoryList = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("explore");
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(CategoryActions.clearCategories());
      axios({
        method: "get",
        url: `${API_URL}/categories`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              CategoryActions.setCategories({
                list: response.data,
              })
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }, [isFocused]);
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
        {categoryList.map((category, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveCategory(category.name)}
            key={index}
            style={
              activeCategory === category.name
                ? styles.category_selected
                : styles.category_normal
            }
          >
            <Text
              style={
                activeCategory === category.name
                  ? styles.text_selected
                  : styles.text_normal
              }
            >
              {category.name}
            </Text>
          </TouchableOpacity>
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
              onSubmit={(values) => {
                setIndicatorVisibility(true);
                axios({
                  method: "post",
                  url: `${API_URL}/categories`,
                  data: {
                    name: values.category,
                  },
                  headers: { Authorization: `Bearer ${token}` },
                })
                  .then((response) => {
                    if (response.status === 200) {
                      dispatch(
                        CategoryActions.setCategories({
                          list: response.data.categories,
                        })
                      );
                      setIndicatorVisibility(false);
                      setModalVisible(false);
                    }
                  })
                  .catch((error) => {
                    setErrorModal(true);
                    setIndicatorVisibility(false);
                    console.log(error);
                  });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  {/* ------------------TITLE--------------- */}
                  <TextInput
                    placeholder="New Category"
                    onChangeText={handleChange("category")}
                    onBlur={handleBlur("category")}
                    value={values.category}
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
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {indicatorVisible && (
                      <ActivityIndicator
                        size="small"
                        color={colors.primary_variant_x}
                        style={{ marginTop: 10 }}
                      />
                    )}
                    <DetailsButton
                      text="Submit"
                      bg={colors.primary_variant_x}
                      color={colors.black}
                      width={100}
                      mt={10}
                      onPress={handleSubmit}
                      disabled={indicatorVisible}
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
          {errorModal && (
            <View
              style={{
                position: "absolute",
                width: "90%",
                top: 400,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.yellow_a,
                backgroundColor: colors.black,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.yellow,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Something went wrong!
              </Text>
              <Text
                style={{
                  color: colors.yellow,
                  fontWeight: "300",
                  fontSize: 12,
                }}
              >
                Make sure the information is valid and try again
              </Text>
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  right: 15,
                  backgroundColor: colors.black,
                  borderWidth: 1,
                  borderRadius: 7,
                  borderBottomWidth: 0,
                  borderColor: colors.yellow_a,
                }}
              >
                <TouchableOpacity onPress={() => setErrorModal(false)}>
                  <Entypo name="cross" size={30} color={colors.yellow} />
                </TouchableOpacity>
              </View>
            </View>
          )}
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
