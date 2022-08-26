import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { selectRestaurant } from "../features/restaurantSlice";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View style={{ backgroundColor: "#00BBCC", flex: 1 }}>
      <SafeAreaView style={{ zIndex: 50 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 18,
            marginTop: 18,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Entypo name="cross" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "300", fontSize: 20 }}>
            Order Help
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginHorizontal: 25,
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 1,
            shadowColor: "black",
            shadowRadius: 5,
            shadowOpacity: 0.2,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, color: "#909191" }}>
              Estimated Arrival
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 30, marginBottom: 10 }}>
              44-55 Minutes
            </Text>
            <Progress.Bar size={30} indeterminate={true} color="#00BBCC" />
            <Text style={{ color: "#909191", fontSize: 12, marginTop: 10 }}>
              Your order at {restaurant.title} is being prepared
            </Text>
          </View>
          <Image
            style={{ height: 60, width: 60 }}
            source={{ uri: "https://links.papareact.com/fls" }}
          />
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ flex: 1, zIndex: 0, marginTop: -40 }}
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 100,
              backgroundColor: "#dbdbdb",
            }}
          />
          <View style={{ alignSelf: "center", marginLeft: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Sumit Kumar</Text>
            <Text style={{ fontWeight: "100" }}>Your Rider</Text>
          </View>
        </View>

        <Text
          style={{
            marginRight: 20,
            color: "#00CCBB",
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Call
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({});
