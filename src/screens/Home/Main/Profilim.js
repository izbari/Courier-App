import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../../firebase";
import { navigate } from "../../../navigations/rootNavigation";
import Kurye from "./Kurye";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducers.currentUser);
  const CustomButton = ({ title, onPress, icon }) => (
    <View style={styles.buttonView}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "black" }}
        style={styles.loginButton}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={icon} size={22} color="black" />
          <Text style={styles.buttonText}>{"  " + title}</Text>
        </View>
        <Icon name="chevron-forward-outline" size={25} color="black" />
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          }}
          resizeMode="cover"
          style={styles.backgroundImg}
        >
          <Image
            style={styles.profileImg}
            source={{
              uri: user?.profileUrl
                ? user.profileUrl
                : "https://avatars.githubusercontent.com/u/73957984?v=4",
            }}
          />
        </ImageBackground>

        <Text style={styles.name}>{user.name + " " + user.lastName}</Text>

        {user.type == "Kurye" ? (
          <View style={styles.card}>
            <Text style={styles.favoritesTxt}>Sipariş Sayısı</Text>
            <Text style={styles.favoritesNo}>
              {user?.total ? user.total : 15}
            </Text>
          </View>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <View style={[styles.card, { width: "40%" }]}>
              <Text style={styles.favoritesTxt}>Sipariş Sayısı</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.favoritesNo}>
                  {user?.order ? user.order : 15}{" "}
                </Text>
                <Text style={{ fontSize: 17, }}>{user?.star ? "("+user.star+")" :"(8.5)"}</Text>
              </View>
            </View>
            <View style={[styles.card, { width: "40%" }]}>
              <Text style={styles.favoritesTxt}>Kazandığım Para</Text>
              <Text style={styles.favoritesNo}>
                {user?.total ? user.total : 2570 + " "}₺
              </Text>
            </View>
          </View>
        )}

        <CustomButton
          title="Bilgilerim"
          icon={"person"}
          onPress={() => {
            navigate("Bilgilerim", { user: { ...user } });
          }}
        />
        <CustomButton
          title="Geçmiş siparişlerim"
          icon="basket"
          onPress={() => {
            navigate("Siparişlerim", { progress: "Geçmiş" });
          }}
        />
        <CustomButton
          title={user.type != "Kurye" ? "Tercihlerim" : "Adreslerim"}
          icon={"compass"}
          onPress={() => {}}
        />
        <CustomButton
          title="Kayıtlı Kartlarım"
          icon={"card"}
          onPress={() => {}}
        />
        <CustomButton
          title="Çıkış yap"
          icon="exit"
          onPress={() => {
            auth.signOut();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  buttonView: {
    alignSelf: "stretch",
    elevation: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
  },
  loginButton: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: "sans-serif-light",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
    borderRadius: 8,
    padding: 10,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 5,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  container: {
    flex: 1,
  },
  backgroundImg: {
    width: "100%",
    height: 150,
  },
  profileImg: {
    alignSelf: "center",
    position: "absolute",
    bottom: -60,
    width: 120,
    height: 120,
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 40,
  },
  name: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 65,
    fontWeight: "bold",
    color: "black",
  },
  bio: {
    alignSelf: "center",
    textAlign: "center",
    padding: 5,
    paddingHorizontal: 50,
    fontSize: 14,

    color: "#7e7b8c",
  },
  follow: {
    fontSize: 12,
    color: "#7e7b8c",
  },
  followNo: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#7e7b8c",
  },
  settings: {
    position: "absolute",
    bottom: -125,
    left: "88%",
    width: 120,
    height: 120,
  },
  favoritesTxt: {
    fontSize: 15,
    color: "black",
    alignSelf: "center",
  },
  favoritesNo: {
    fontSize: 27,
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    width: "70%",
    alignSelf: "center",

    marginVertical: 20,
    elevation: 7,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
