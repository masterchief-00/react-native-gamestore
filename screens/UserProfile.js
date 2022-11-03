import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../data/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../data/Colours";
import { Feather, Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import DetailsButton from "../components/DetailsButton";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@env";
import { UserActions } from "../redux/UserSlice";
import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";

const bgImage = {
  uri: "https://i.pinimg.com/originals/fb/0d/4e/fb0d4e4bebc7b221aa3c03091766d4e2.jpg",
};

export default function UserProfile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState({});
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);

  const avatar =
    userData.avatar !== null
      ? { uri: userData.image }
      : require("../assets/images/avatar.jpg");

  let pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 2],
    });

    console.log(result.uri);

    if (!result.cancelled) {
      const dummyManipulationResult = await manipulateAsync(result.uri);

      setImage(dummyManipulationResult.uri);
    }
  };

  const handleProfileImage = async () => {
    setIndicatorVisibility(true);
    setErrorModal(false);

    console.log("uploading avatar now");

    await FileSystem.uploadAsync(
      `${API_URL}/users/avatar/${userData.email}?_method=PUT`,
      image,
      {
        fieldName: "image",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          let serverData = JSON.parse(response.body);
          dispatch(
            UserActions.setUserData({
              name: serverData.user.name,
              email: serverData.user.email,
              about: serverData.user.about,
              location: serverData.user.location,
              joinDate: serverData.joinDate,
              wishlist: serverData.wishlist,
              games: serverData.games,
              image: serverData.user.image,
            })
          );
          dispatch(UserActions.setToken(serverData.token));
          setIndicatorVisibility(false);
          setModalVisible(false);
        }
      })
      .catch((error) => {
        setIndicatorVisibility(false);
        setErrorModal(true);
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={globalStyles.imageHome}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={{
              height: 700,
              width: 400,
              paddingHorizontal: 30,
              paddingTop: 80,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={avatar}
                  style={{ borderRadius: 50, height: 100, width: 100 }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 70,
                    left: 70,
                    zIndex: 3,
                  }}
                  onPress={() => {
                    setSelectedEdit("image");
                    setModalVisible(true);
                  }}
                >
                  <Feather
                    name="edit"
                    size={20}
                    color={colors.primary_variant_x}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 40,
                      color: colors.white,
                      textShadowColor: colors.black,
                      textShadowRadius: 13,
                      textTransform: "capitalize",
                    }}
                  >
                    {userData.name}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      zIndex: 3,
                    }}
                    onPress={() => {
                      setSelectedEdit("name");
                      setModalVisible(true);
                    }}
                  >
                    <Feather
                      name="edit"
                      size={20}
                      color={colors.primary_variant_x}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontStyle: "italic",
                      fontSize: 13,
                    }}
                  >
                    Joined {userData.joinDate}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Entypo
                      name="mail"
                      size={18}
                      color={colors.primary_variant_x}
                    />
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "400",
                        marginLeft: 5,
                      }}
                    >
                      {userData.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Entypo
                      name="location-pin"
                      size={18}
                      color={colors.primary_variant_x}
                    />
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "400",
                        marginLeft: 5,
                      }}
                    >
                      {userData.location}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 20,
                backgroundColor: colors.primary_a,
                borderColor: colors.primary,
                // borderWidth: 0.8,
                borderTopWidth: 0.8,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                width: 300,
                padding: 5,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "300", fontSize: 25 }}
                >
                  {userData.games}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // opacity: 0.9,
                  }}
                >
                  <Ionicons
                    name="game-controller"
                    size={15}
                    color={colors.primary_variant_x}
                  />
                  <Text
                    style={{
                      color: colors.primary_variant_x,
                      fontWeight: "300",
                      fontSize: 15,
                      marginLeft: 5,
                    }}
                  >
                    Games
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "300", fontSize: 25 }}
                >
                  {userData.wishlist}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // opacity: 0.7,
                  }}
                >
                  <MaterialIcons
                    name="post-add"
                    size={15}
                    color={colors.primary_variant_x}
                  />
                  <Text
                    style={{
                      color: colors.primary_variant_x,
                      fontWeight: "300",
                      fontSize: 15,
                      marginLeft: 5,
                    }}
                  >
                    Wishlist
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                // marginTop: 20,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 25,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 15,
                }}
              >
                ABOUT
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 15,
                  fontWeight: "300",
                  textAlign: "center",
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: colors.primary_a,
                  borderTopWidth: 0.8,
                  borderTopColor: colors.primary,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                }}
              >
                {userData.about !== ""
                  ? userData.about
                  : "Write something about yourself, currently nothing is set"}
              </Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 15,
                  left: 205,
                  zIndex: 3,
                }}
                onPress={() => {
                  setSelectedEdit("about");
                  setModalVisible(true);
                }}
              >
                <Feather
                  name="edit"
                  size={20}
                  color={colors.primary_variant_x}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <CustomButton
                onPress={() => navigation.navigate("Signup")}
                bg={colors.yellow}
                color={colors.black}
                bdcolor={colors.yellow}
                width={200}
                mt={20}
                text="Delete account"
                // onPress={() => navigation.navigate("BottomTabs")}
              />
            </View>
          </LinearGradient>
        </View>
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
              flex: 1,
              backgroundColor: colors.black_a,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.bg,
                paddingBottom: 20,
                width: "97%",
                // height: "50%",
                alignItems: "center",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderWidth: 0.5,
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
              <View style={{ alignItems: "center" }}>
                {selectedEdit === "image" && (
                  <View style={{ marginTop: 20, alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "bold",
                        fontSize: 20,
                        textTransform: "uppercase",
                      }}
                    >
                      New profile Image
                    </Text>
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
                      onPress={pickImage}
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
                        Select image
                      </Text>
                    </TouchableOpacity>
                    {image && (
                      <View style={{ marginTop: 15 }}>
                        <Image
                          source={{ uri: image }}
                          resizeMode="contain"
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 5,
                          }}
                        />
                      </View>
                    )}
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
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
                        onPress={handleProfileImage}
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
                {selectedEdit === "name" && (
                  <View style={{ marginTop: 15, alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "bold",
                        fontSize: 20,
                        textTransform: "uppercase",
                      }}
                    >
                      Update personal details
                    </Text>

                    <Formik
                      initialValues={{
                        name: userData.name,
                        location: userData.location,
                      }}
                      onSubmit={(values) => {
                        setIndicatorVisibility(true);
                        axios({
                          method: "put",
                          url: `${API_URL}/users/${userData.email}`,
                          data: {
                            name: values.name,
                            location: values.location,
                            about: userData.about,
                          },
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((response) => {
                            if (response.status === 200) {
                              console.log(response.data);
                              dispatch(
                                UserActions.setUserData({
                                  name: response.data.user.name,
                                  email: response.data.user.email,
                                  about: response.data.user.about,
                                  location: response.data.user.location,
                                  joinDate: response.data.joinDate,
                                  wishlist: response.data.wishlist,
                                  games: response.data.games,
                                  image: response.data.user.image,
                                })
                              );
                              dispatch(
                                UserActions.setToken(response.data.token)
                              );
                              setModalVisible(false);
                              setIndicatorVisibility(false);
                            }
                          })
                          .catch((error) => {
                            setIndicatorVisibility(false);
                            setErrorModal(true);
                            console.log(error);
                            Keyboard.dismiss();
                          });
                      }}
                    >
                      {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                          {/* ------------------NAME & LOCATION--------------- */}
                          <TextInput
                            placeholder="New user name"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            placeholderTextColor={colors.primary}
                            style={{
                              color: colors.primary_variant_x,
                              textAlign: "center",
                              backgroundColor: colors.bg_variant,
                              fontSize: 15,
                              width: 250,
                              height: 40,
                              borderBottomWidth: 1.5,
                              marginTop: 8,
                              borderColor: colors.primary_variant_x,
                            }}
                          />
                          <TextInput
                            placeholder="New location"
                            onChangeText={handleChange("location")}
                            onBlur={handleBlur("location")}
                            value={values.location}
                            placeholderTextColor={colors.primary}
                            style={{
                              color: colors.primary_variant_x,
                              textAlign: "center",
                              backgroundColor: colors.bg_variant,
                              fontSize: 15,
                              width: 250,
                              height: 40,
                              borderBottomWidth: 1.5,
                              marginTop: 8,
                              borderColor: colors.primary_variant_x,
                            }}
                          />
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
                        </View>
                      )}
                    </Formik>
                  </View>
                )}
                {selectedEdit === "about" && (
                  <View style={{ marginTop: 15, alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "bold",
                        fontSize: 20,
                        textTransform: "uppercase",
                      }}
                    >
                      Update about
                    </Text>

                    <Formik
                      initialValues={{
                        about: "",
                      }}
                      onSubmit={(values) => {
                        setIndicatorVisibility(true);
                        axios({
                          method: "put",
                          url: `${API_URL}/users/${userData.email}`,
                          data: {
                            about: values.about,
                            name: userData.name,
                            location: userData.location,
                          },
                          headers: { Authorization: `Bearer ${token}` },
                        })
                          .then((response) => {
                            if (response.status === 200) {
                              dispatch(
                                UserActions.setUserData({
                                  name: response.data.user.name,
                                  about: response.data.user.about,
                                  email: response.data.user.email,
                                  location: response.data.user.location,
                                  joinDate: response.data.joinDate,
                                  wishlist: response.data.wishlist,
                                  games: response.data.games,
                                  image: response.data.user.image,
                                })
                              );
                              dispatch(
                                UserActions.setToken(response.data.token)
                              );
                              setIndicatorVisibility(false);
                              setModalVisible(false);
                            }
                          })
                          .catch((error) => {
                            setIndicatorVisibility(false);
                            setErrorModal(true);
                            console.log(error);
                            Keyboard.dismiss();
                          });
                      }}
                    >
                      {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                          {/* ------------------ABOUT--------------- */}
                          <TextInput
                            placeholder="Your new about"
                            placeholderTextColor={colors.white_a}
                            onChangeText={handleChange("about")}
                            onBlur={handleBlur("about")}
                            value={values.about}
                            multiline
                            style={{
                              color: colors.primary_variant_x,
                              fontSize: 15,
                              marginVertical: 15,
                              padding: 10,
                              borderWidth: 0.4,
                              width: 200,
                              borderRadius: 3,
                              backgroundColor: colors.primary_a,
                              borderColor: colors.primary_variant_x,
                            }}
                          />
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
                        </View>
                      )}
                    </Formik>
                  </View>
                )}
              </View>
              {errorModal && (
                <View
                  style={{
                    position: "absolute",
                    width: "90%",
                    top: -300,
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
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
