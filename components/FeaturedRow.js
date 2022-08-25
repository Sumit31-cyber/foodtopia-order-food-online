import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            ...,
          }
        },
      }[0]`,
        { id: id }
      )
      .then((data) => {
        setRestaurantData(data?.restaurants);
      });
  }, []);

  // console.log(restaurantData);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
          paddingHorizontal: 15,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18 }}>{title}</Text>
        <Entypo name="chevron-small-right" size={24} color="#00BBCC" />
      </View>
      <Text style={{ fontWeight: "200", fontSize: 12, paddingHorizontal: 15 }}>
        {description}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator="false"
        contentContainerStyle={{
          marginRight: 15,
        }}
        style={{ padding: 15 }}
      >
        {/* RestaurantCard */}
        {restaurantData?.map((restaurant) => (
          <RestaurantCard
            id={restaurant._id}
            key={restaurant._id}
            imageUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type.title}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({});
