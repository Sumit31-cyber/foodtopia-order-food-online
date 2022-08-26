import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { Ionicons, AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imageUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  //   console.log(route);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imageUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator="false">
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: urlFor(imageUrl).url() }}
            style={{ height: 230, width: "100%" }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderRadius: 100,
              backgroundColor: "white",
              opacity: 0.6,
              width: 45,
              height: 30,
              position: "absolute",
              top: 40,
              left: 25,
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>

        {/* BODY */}
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              paddingTop: 15,
              paddingRight: 10,
              paddingLeft: 10,
              paddingBottom: 8,
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 28 }}>{title}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <Ionicons name="star" size={24} color="#85c997" />
              <Text style={{ color: "green", opacity: "0.5" }}>
                {"   "}
                {rating}
                <Text style={{ color: "black" }}> • {genre} </Text>
              </Text>
              <Entypo
                name="location-pin"
                size={24}
                color="grey"
                opacity={0.5}
              />
              <Text style={{ color: "grey", opacity: "0.7" }}>
                {" "}
                Nearby • {address}
              </Text>
            </View>

            <Text style={{ color: "grey" }}>{short_description}</Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 10,
              alignItems: "center",
              borderTopWidth: 1,
              padding: 10,
              justifyContent: "space-between",
              borderTopColor: "#ededed",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name="question" size={24} color="grey" opacity="0.1" />
              <Text style={{ fontWeight: "500" }}>
                {"   "}Have a food allergy?
              </Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="#85c997" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 27,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          Menu
        </Text>
        <View style={{ paddingBottom: 125 }}>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.sort_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
      <BasketIcon />
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
