import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { FontAwesome5 } from "@expo/vector-icons";
import Currency from "react-currency-formatter";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState();
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderWidth: isPressed ? 0 : 0.3,
          borderColor: "#ededed",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 22,
                letterSpacing: 1,
                marginBottom: 5,
              }}
            >
              {name}
            </Text>

            <Text
              numberOfLines={3}
              style={{ color: "grey", fontSize: 13, marginRight: 10 }}
            >
              {description}
            </Text>
            <Text style={{ color: "#85c997", marginTop: 10 }}>
              <Currency quantity={price} currency="INR" />
            </Text>
          </View>

          <Image
            source={{ uri: urlFor(image).url() }}
            style={{ height: 100, width: 100 }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            marginLeft: 15,
          }}
        >
          <TouchableOpacity>
            <FontAwesome5 name="minus-circle" size={30} color="grey" />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 23, alignSelf: "center", marginHorizontal: 12 }}
          >
            0
          </Text>
          <TouchableOpacity
          //   onPress={() => setQuantity(quantity++)}
          >
            <FontAwesome5 name="plus-circle" size={30} color="#85c997" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
