import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { FontAwesome5 } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, image, description, price }));
  };
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

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
          }}
        >
          <TouchableOpacity
            onPress={removeItemFromBasket}
            style={{ marginLeft: 12 }}
            disabled={!items.length}
          >
            <FontAwesome5
              name="minus-circle"
              size={30}
              color={items.length > 0 ? "#00BBCC" : "#dedede"}
            />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 23, alignSelf: "center", marginHorizontal: 12 }}
          >
            {items.length}
          </Text>
          <TouchableOpacity onPress={addItemToBasket}>
            <FontAwesome5 name="plus-circle" size={30} color="#00BBCC" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
