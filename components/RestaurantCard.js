import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurant", {
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
      }
      style={{
        backgroundColor: "white",
        marginRight: 14,
        shadowColor: "black",
        shadowRadius: 5,
        shadowOpacity: 0.2,
      }}
    >
      <Image
        source={{ uri: urlFor(imageUrl).url() }}
        style={{ height: 180, width: 250 }}
        resizeMode="cover"
      />
      <View style={{ padding: 12 }}>
        <Text>{title}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="star" size={24} color="#85c997" />
          <Text style={{ color: "green", opacity: "0.5" }}>
            {"   "}
            {rating}
            <Text style={{ color: "black" }}> • {genre} </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <Ionicons
            name="location-outline"
            size={24}
            color="grey"
            opacity={0.5}
          />
          <Text style={{ color: "grey", opacity: "0.7" }}>
            {"   "}
            Nearby • {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({});
