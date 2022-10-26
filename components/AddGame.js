import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import DetailsButton from "./DetailsButton";
import NumericInput from "react-native-numeric-input";
import * as ImagePicker from "expo-image-picker";

export default function AddGame() {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Open world", value: "open-world" },
    { label: "Action", value: "action" },
    { label: "Adventure", value: "adventure" },
    { label: "Horror", value: "horror" },
    { label: "Racing", value: "racing" },
  ]);

  const [imageWide, setImageWide] = useState(null);
  const [imageTall, setImageTall] = useState(null);

  let pickImage = async (type) => {
    let result = {};
    if (type === "wide") {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
      });
      if (!result.cancelled) {
        setImageWide(result.uri);
      }
    } else if (type === "tall") {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 16],
      });
      if (!result.cancelled) {
        setImageTall(result.uri);
      }
    }

    console.log(result.uri);
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
        onPress={() => setModalVisible(true)}
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
                  category: "",
                  rating: 0,
                }}
                onSubmit={(values) => console.log(values)}
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
                    {/* ------------------CATEBORY--------------- */}
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      dropDownDirection="TOP"
                      theme="DARK"
                      itemSeparator={true}
                      placeholder="Game category"
                      containerStyle={{
                        borderBottomWidth: 1,
                        borderColor: colors.primary_variant_x,
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: colors.bg,
                      }}
                      selectedItemLabelStyle={{
                        color: colors.primary_variant_x,
                        fontWeight: "bold",
                      }}
                      itemSeparatorStyle={{
                        backgroundColor: colors.primary_a,
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: colors.bg,
                        borderBottomWidth: 0,
                        borderWidth: 0.9,
                        borderColor: colors.primary_x,
                      }}
                      textStyle={{
                        color: colors.primary,
                      }}
                      style={{
                        width: 250,
                        backgroundColor: colors.bg_variant,
                        marginTop: 10,
                        borderRadius: 0,
                        borderWidth: 0,
                      }}
                    />
                    <ScrollView
                      contentContainerStyle={{ alignItems: "center" }}
                      showsVerticalScrollIndicator={false}
                    >
                      {/* ------------------DESCRIPTION--------------- */}

                      <TextInput
                        placeholder="Description"
                        placeholderTextColor={colors.primary}
                        multiline
                        style={{
                          color: colors.primary_variant_x,
                          fontSize: 15,
                          marginVertical: 15,
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
                      {/* ------------------RATING--------------- */}
                      <NumericInput
                        value={rating}
                        type="plus-minus"
                        minValue={1}
                        maxValue={5}
                        step={0.5}
                        totalHeight={40}
                        valueType="real"
                        onChange={(val) => setRating({ val })}
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
                      <View style={{ height: 100 }}></View>
                    </ScrollView>

                    {/**--------------------------------------------------------------------**/}
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
