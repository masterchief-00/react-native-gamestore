import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import { Formik } from "formik";
import DetailsButton from "./DetailsButton";
import NumericInput from "react-native-numeric-input";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@env";

export default function AddGame() {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [activeCategory, setActiveCategory] = useState({});
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const token = useSelector((state) => state.user.token);

  const [imageWide, setImageWide] = useState(null);
  const [imageTall, setImageTall] = useState(null);
  const [fileWide, setFileWide] = useState(null);
  const [fileTall, setFileTall] = useState(null);

  const categories = useSelector((state) => state.category.categories);
  const categoryList = categories.filter(
    (category) => category.name !== "explore"
  );
  let pickImage = async (type) => {
    let result = {};
    if (type === "wide") {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
      });
      // result.
      if (!result.cancelled) {
        setImageWide(result.uri);
        setFileWide(result);
      }
    } else if (type === "tall") {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 16],
      });

      if (!result.cancelled) {
        setImageTall(result.uri);
        setFileTall(result);
      }
    }

    console.log(result.uri);
  };

  const handleNewGame = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          right: 15,
          backgroundColor: colors.yellow,
          borderRadius: 30,
          padding: 15,
          shadowColor: colors.primary_variant,
          shadowOpacity: 0.8,
          shadowRadius: 15,
          elevation: 3,
        }}
        onPress={() => handleNewGame()}
      >
        <Ionicons
          name="ios-game-controller"
          size={30}
          color={colors.black}
          style={{ fontWeight: "900" }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: colors.black_a,
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 350,
              maxHeight: "90%",
              padding: 10,
              alignItems: "center",
              backgroundColor: colors.bg,
              borderTopLeftRadius: 80,
              borderWidth: 0.7,
              borderBottomWidth: 0,
              borderColor: colors.primary_x,
            }}
          >
            <View
              style={{
                width: "30%",
                height: 5,
                backgroundColor: colors.primary_variant_x,
                marginTop: 15,
                borderRadius: 15,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Ionicons
                name="ios-game-controller"
                size={30}
                color={colors.white}
                style={{ fontWeight: "900" }}
              />
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 20,
                  textTransform: "uppercase",
                }}
              >
                New Game
              </Text>
            </View>
            <View>
              <Formik
                initialValues={{
                  title: "",
                  downloads: 0,
                  rating: rating,
                  description: "",
                  category_id: activeCategory,
                  // image_w: imageWide,
                  // image_t: imageTall,
                }}
                onSubmit={(values) => {}}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={{ alignItems: "center", marginTop: 20 }}>
                    {/* ------------------TITLE--------------- */}
                    <TextInput
                      placeholder="Title"
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
                    {/* ------------------DOWNLOADS--------------- */}
                    <TextInput
                      placeholder="Downloads"
                      onChangeText={handleChange("downloads")}
                      onBlur={handleBlur("downloads")}
                      value={values.downloads}
                      placeholderTextColor={colors.primary}
                      keyboardType="numeric"
                      style={{
                        color: colors.primary_variant_x,
                        textAlign: "center",
                        backgroundColor: colors.bg_variant,
                        fontSize: 15,
                        width: 250,
                        height: 40,
                        borderBottomWidth: 1.5,
                        borderColor: colors.primary_variant_x,
                        marginTop: 10,
                      }}
                    />
                    <ScrollView
                      contentContainerStyle={{ alignItems: "center" }}
                      showsVerticalScrollIndicator={false}
                    >
                      {/* ------------------DESCRIPTION--------------- */}

                      <TextInput
                        onChangeText={handleChange("description")}
                        onBlur={handleBlur("description")}
                        value={values.description}
                        placeholder="Description"
                        placeholderTextColor={colors.primary}
                        multiline
                        style={{
                          color: colors.primary_variant_x,
                          fontSize: 15,
                          marginTop: 10,
                          padding: 10,
                          borderWidth: 0.4,
                          width: 250,
                          borderRadius: 3,
                          backgroundColor: colors.bg_variant,
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          borderColor: colors.primary_variant_x,
                        }}
                      />
                      {/* ------------------CATEGORY--------------- */}
                      <View
                        style={{
                          flexDirection: "row",
                          width: 265,
                          flexWrap: "wrap",
                          marginTop: 10,
                        }}
                      >
                        {categoryList.map((category, index) => (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setActiveCategory(category.id)}
                            key={index}
                            style={
                              activeCategory === category.id
                                ? styles.category_selected
                                : styles.category_normal
                            }
                          >
                            <Text
                              style={
                                activeCategory === category.id
                                  ? styles.text_selected
                                  : styles.text_normal
                              }
                            >
                              {category.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      {/* ------------------RATING--------------- */}
                      <NumericInput
                        value={rating}
                        type="plus-minus"
                        minValue={1}
                        maxValue={5}
                        step={0.5}
                        totalHeight={40}
                        valueType="real"
                        onChange={(val) => setRating(val)}
                        textColor={colors.primary}
                        containerStyle={{
                          marginTop: 10,
                          borderColor: colors.primary,
                          borderRadius: 3,
                        }}
                        separatorWidth={0.3}
                        iconStyle={{ color: colors.primary }}
                        leftButtonBackgroundColor={colors.bg}
                        rightButtonBackgroundColor={colors.bg}
                      />
                      {/*-----------------WIDE IMAGE UPLOAD---------------------*/}
                      <View style={{ alignItems: "center" }}>
                        <View style={{ marginTop: 10, alignItems: "center" }}>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 15,
                              borderStyle: "dashed",
                              borderWidth: 1,
                              borderColor: colors.primary_variant_x,
                              padding: 10,
                            }}
                            onPress={() => pickImage("wide")}
                          >
                            <Ionicons
                              name="images-outline"
                              size={24}
                              color={colors.white}
                            />
                            <Text
                              style={{
                                color: colors.white,
                                fontWeight: "bold",
                                fontSize: 15,
                                textTransform: "uppercase",
                                paddingHorizontal: 5,
                              }}
                            >
                              Select a wide image
                            </Text>
                          </TouchableOpacity>
                          {imageWide && (
                            <View style={{ marginTop: 15 }}>
                              <Image
                                source={{ uri: imageWide }}
                                resizeMode="stretch"
                                style={{
                                  height: 100,
                                  // width: 100,
                                  borderRadius: 5,
                                  aspectRatio: 16 / 9,
                                }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                      {/*-----------------TALL IMAGE UPLOAD--------------*/}
                      <View style={{ alignItems: "center" }}>
                        <View style={{ marginTop: 10, alignItems: "center" }}>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 15,
                              borderStyle: "dashed",
                              borderWidth: 1,
                              borderColor: colors.primary_variant_x,
                              padding: 10,
                            }}
                            onPress={() => pickImage("tall")}
                          >
                            <Ionicons
                              name="images-outline"
                              size={24}
                              color={colors.white}
                            />
                            <Text
                              style={{
                                color: colors.white,
                                fontWeight: "bold",
                                fontSize: 15,
                                textTransform: "uppercase",
                                paddingHorizontal: 5,
                              }}
                            >
                              Select a tall image
                            </Text>
                          </TouchableOpacity>
                          {imageTall && (
                            <View style={{ marginTop: 15 }}>
                              <Image
                                source={{ uri: imageTall }}
                                resizeMode="stretch"
                                style={{
                                  height: 100,
                                  // width: 100,
                                  borderRadius: 5,
                                  aspectRatio: 9 / 16,
                                }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", marginVertical: 10 }}
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
                      <View style={{ height: 100 }}></View>
                    </ScrollView>

                    {/**--------------------------------------------------------------------**/}
                  </View>
                )}
              </Formik>
            </View>
          </View>
          {errorModal && (
            <View
              style={{
                position: "absolute",
                width: "90%",
                top: 50,
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
  category_normal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_a,
    padding: 3,
    width: 80,
    borderRadius: 8,
    marginHorizontal: 3,
    marginTop: 8,
    marginRight: 5,
  },
  category_selected: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    width: 80,
    borderRadius: 20,
    borderBottomColor: colors.yellow,
    borderBottomWidth: 2,
    backgroundColor: colors.primary_a,
    marginHorizontal: 3,
    marginTop: 8,
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
