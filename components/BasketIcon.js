import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length == 0) return null;
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            padding: 15,
            zIndex: 50,
            backgroundColor: "#00BBCC",
            borderRadius: 10,
            bottom: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                backgroundColor: "#0096a3",
                padding: 8,
                fontWeight: "bold",
              }}
            >
              {items.length}
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                letterSpacing: 1,
                fontSize: 18,
              }}
            >
              View Basket
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                padding: 8,
                fontWeight: "800",
              }}
            >
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({});
