import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../data/Colours";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import DetailsButton from "./DetailsButton";
import NumericInput from "react-native-numeric-input";

export default function AddGame() {
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
        visible={true}
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
              padding: 10,
              alignItems: "center",
              backgroundColor: colors.bg,
              borderTopLeftRadius: 80,
              borderWidth: 0.7,
              borderBottomWidth: 0,
              borderColor: colors.primary_x,
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
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
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
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
                      }}
                    />
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
                    <DetailsButton
                      onPress={handleSubmit}
                      bg={colors.primary_variant_x}
                      color={colors.black}
                      width={100}
                      text="Submit"
                    />
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
