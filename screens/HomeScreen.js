import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const navigation = useNavigation();

  const [featuredCatagories, setFeaturedCatagories] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{
            ...,
            restaurants[]->{
              ...,
              dishes[]->
            },
          }`
      )
      .then((data) => {
        setFeaturedCatagories(data);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // console.log(featuredCatagories);

  return (
    <SafeAreaView className="pt-4 bg-white">
      {/* Header */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-50 p-4 rounded-full"
        ></Image>
        <View className="flex-1 ">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <Entypo name="chevron-small-down" size={24} color="#00BBCC" />
          </Text>
        </View>
        <AntDesign name="user" size={30} color="#00BBCC" />
      </View>

      {/* Search */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.search}>
          <AntDesign
            name="search1"
            size={24}
            color="#b3b3b3"
            style={{ alignSelf: "center", marginHorizontal: 10 }}
          />
          <TextInput
            placeholder="Search"
            keyboardType="default"
            style={{ paddingRight: 50 }}
          ></TextInput>
        </View>
        <Feather
          name="sliders"
          size={28}
          color="#00BBCC"
          style={{ alignSelf: "center", marginRight: 10 }}
        />
      </View>
      {/* Body */}

      <ScrollView
        showsVerticalScrollIndicator="false"
        style={{ backgroundColor: "#f5f5f5", marginBottom: 120 }}
      >
        {/* Categorie */}
        <Categories />

        {/* FeaturedProduct */}

        {featuredCatagories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.sort_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  search: {
    height: 45,
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#e6e6e6",
    alignContent: "center",
    flexDirection: "row",
    borderRadius: 12,
  },
});
