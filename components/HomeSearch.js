import { View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "../data/Colours";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { gameActions } from "../redux/GameSlice";
import axios from "axios";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";

export default function HomeSearch() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 330,
          height: 40,
          padding: 5,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: colors.primary_a,
          borderRadius: 30,
          borderWidth: 0.6,
          borderColor: colors.primary_x,
          overflow: "hidden",
        }}
      >
        <AntDesign
          name="search1"
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
        <Formik
          initialValues={{
            query: null,
          }}
          onSubmit={async (values) => {
            console.log(values);
            await axios({
              method: "get",
              url: `${API_URL}/search/${values.query}`,
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((response) => {
                if (response.status === 200) {
                  if (response.data.results !== null) {
                    dispatch(gameActions.clearGames("SEARCH"));
                    dispatch(
                      gameActions.setHomeSearchResults({
                        list: response.data.results,
                      })
                    );
                    dispatch(gameActions.setActiveCategory("search"));
                    dispatch(
                      gameActions.attachCategoryName__homeSearch({
                        list: response.data.categories,
                      })
                    );
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
            <View
              style={{
                marginLeft: 0,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="Search games"
                onChangeText={handleChange("query")}
                onBlur={handleBlur("query")}
                value={values.query}
                returnKeyType="search"
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={handleSubmit}
                style={{
                  width: "80%",
                  color: colors.white,
                }}
                placeholderTextColor={colors.white_a}
              />
              <TouchableOpacity onPress={resetForm}>
                <MaterialIcons
                  name="clear"
                  size={20}
                  color={colors.white}
                  style={{
                    marginLeft: 1,
                    borderLeftWidth: 1,
                    borderColor: colors.white_a,
                    padding: 3,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
