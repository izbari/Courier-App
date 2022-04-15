import * as React from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={{ padding: 20, marginLeft: 25 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="location-pin" size={28} color="black" />
          <Text>{"Çıkış Adresi\nHalil Fırat Paşa Şişli / İstanbul"}</Text>
        </View>
        <View
          style={{
            backgroundColor: "black",
            height: 30,
            width: 1,
            marginLeft: 13,
          }}
        ></View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="location-pin" size={28} color="black" />
          <Text>
            {"Teslimat Adresi\nSümer 24/4. Sokak Zeyinburnu/İstanbul"}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          <MaterialIcons name="shopping-bag" size={18} color="black" />
          <Text>{" Gönderi Tipi : Evrak "}</Text>
        </View>
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          <Ionicons name="time" size={18} color="black" />
          <Text>{"  55 dk "}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-around",
          paddingTop: 15,
        }}
      >
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={18}
            color="black"
          />
          <Text>{" Mesafe : 12.7 km "}</Text>
        </View>
        <View style={{ flexDirection: "row",justifyContent:'center' }}>
          <Ionicons name="cart" size={18} color="black" />
          <Text>{"  39.96 ₺ "}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: 320,
          height: 50,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginVertical: 20,
          backgroundColor: "black",
        }}
        mode="outlined"
        onPress={() => {
          
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Ödemeye Geç
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.1,
  },
});
