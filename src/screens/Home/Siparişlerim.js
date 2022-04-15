import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Text, Button, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
//main methods
import Icon from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
function Signup(props) {
  const [selection, setSelection] = React.useState("Aktif");
  const Card = () => { 
    return (
      <TouchableOpacity
      activeOpacity={0.5}
        style={{
          backgroundColor: "#ededed",
          padding: 20,
          marginBottom:15,
          marginHorizontal: 15,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.7,
          shadowRadius: 6.27,
          justifyContent:'center',
          elevation: 5,
        }}>
       <View style={{ paddingRight: 15,  }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="location-pin" size={28} color="black" />
          <Text>{"Çıkış Adresi : Halil Fırat Paşa Şişli / İstanbul"}</Text>
        </View>
        <View
          style={{
            backgroundColor: "black",
            height: 30,
            width: 1,
            marginLeft: 13,
          }}
        ></View>
        <View style={{ flexDirection: "row"}}>
          <Icon name="location-pin" size={28} color="black" />
          <Text>
            {"Teslimat Adresi : Sümer 24/4. Sokak Zeyinburnu/İstanbul"}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          padding: 5,
          marginTop:10,
          justifyContent: "space-between",
        }}
      >
        <Text>1564874641741564</Text>
       <View style={{ flexDirection: "row" }}>
          <Ionicons name="cart" size={18} color="black" />
          <Text>{"  39.96 ₺ "}</Text>
        </View>
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          <Ionicons name="time" size={18} color="black" />
          <Text>{"  55 dk "}</Text>
        </View>
      </View>
    
    
      </TouchableOpacity>
    )
   }
  const SelectionButton = ({ title }) => {
    const isSelected = selection == title;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelection(title);
        }}
        style={[
          styles.selectionBt,
          {
            backgroundColor: isSelected && "black",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={[styles.textBt, { color: isSelected && "white" }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  const ButtonContainer = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20,
      }}
    >
      <SelectionButton title={"Aktif"} />
      <SelectionButton title={"Yolda"} />
      <SelectionButton title={"Geçmiş"} />
    </View>
  );

  return (
    <SafeAreaView
      behavior="padding"
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
        <Text style={styles.header}>Siparişlerim</Text>
      </View>

      <ButtonContainer />
     <Card />
     {selection =='Geçmiş' && <Card />}
    {selection =='Yolda' && <Card />}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerStyle: { backgroundColor: "white", flex: 1, margin: 15 },
  mainContainer: { flex: 1, backgroundColor: "#000" },
  lottieContainer: {
    flex: 5,
    width: "85%",
    height: "50%",
    alignSelf: "center",
  },
  inputContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  selectionBt: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    width: "27%",
    borderColor: "gray",
    margin: 10,
    padding: 10,
  },

  buttonContainer: { margin: 10, marginBottom: 20 },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    width: 290,
    height: 38,
    backgroundColor: "#FF6EA1",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderColor: "white",
    borderRadius: 10,
    borderColor: "white",
    width: 320,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    margin: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  header: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "90%",
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  textBt: {},
});

export default Signup;
