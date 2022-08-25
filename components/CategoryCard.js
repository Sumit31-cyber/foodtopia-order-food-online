import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoryCard = ({ imageUrl, title }) => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 10, position: "relative" }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ height: 90, width: 90, borderRadius: 8 }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
