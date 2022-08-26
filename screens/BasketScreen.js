import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { Octicons } from "@expo/vector-icons";
import { selectRestaurant } from "../features/restaurantSlice";
import Currency from "react-currency-formatter";

import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const items = useSelector(selectBasketItems);
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  // console.log(groupedItemsInBasket);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        <View
          style={{
            padding: 20,
            backgroundColor: "white",
            borderBottomWidth: "0.3",
            borderBottomColor: "#00BBCC",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 20 }}>Basket</Text>
            <Text>{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, right: 15 }}
          >
            <Octicons name="x-circle-fill" size={35} color="#00BBCC" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: "white",
            marginVertical: 20,
          }}
        >
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={{
              height: 50,
              width: 50,
              backgroundColor: "#dbdbdb",
              borderRadius: 100,
              marginLeft: 10,
            }}
          />
          <Text style={{ flex: 1, marginLeft: 20, color: "#909191" }}>
            Deliver in 50-75 mins
          </Text>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Text style={{ color: "#00BBCC", letterSpacing: 1 }}> Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator="false">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "white",
                borderBottomWidth: 0.3,
                borderBottomColor: "#dbdbdb",
              }}
            >
              <Text style={{ padding: 8, color: "#00BBCC" }}>
                {items.length + " "} x{" "}
              </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={{ height: 50, width: 50 }}
              />
              <Text style={{ flex: 1, marginLeft: 15 }}>{items[0]?.name}</Text>

              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  marginRight: 5,
                  color: "#909191",
                }}
              >
                <Currency
                  quantity={items[0]?.price * items.length}
                  currency="INR"
                />
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text style={{ color: "#00BBCC" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={{ padding: 12, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text style={{ color: "#909191" }}>Subtotal</Text>
            <Text style={{ color: "#909191" }}>
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text style={{ color: "#909191" }}>Delivery fee</Text>
            <Text style={{ color: "#909191" }}>
              <Currency quantity={40} currency="INR" />
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Order Total</Text>
            <Text style={{ fontWeight: "600" }}>
              {" "}
              <Currency quantity={basketTotal + 40} currency="INR" />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            style={{
              padding: 18,
              backgroundColor: "#00BBCC",
              alignItems: "center",
              marginHorizontal: 30,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({});
