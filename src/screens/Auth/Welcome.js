import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { database } from "../../../firebase";
import React, { useEffect } from "react";
const { height } = Dimensions.get("window");


const Welcome = (props) => {

  const uri =
    "https://images.unsplash.com/photo-1543499459-d1460946bdc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaXZlcnklMjBtYW58ZW58MHx8MHx8&w=1000&q=80";
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri }}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 40,
              marginTop: height / 8,
            }}
          >
            HOŞGELDİNİZ
          </Text>
          <View>
            <TouchableOpacity
              mode="outlined"
              style={{
                alignItems: "center",
                elevation: 10,
                height: 50,
                width: "95%",
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginVertical: 10,
                borderColor: "white",
                borderWidth: 2,
                shadowColor: "#000",
              }}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "95%",
                elevation: 10,
                height: 50,
                shadowColor: "#000",
                alignItems: "center",

                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginVertical: 10,
                backgroundColor: "black",
              }}
              mode="outlined"
              onPress={() => props.navigation.navigate("SignUp")}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Üye Ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
