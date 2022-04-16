import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";
import { auth } from "../../../firebase";
//main methods
function Signup(props) {
  //States ,effects, vars
  const [bireysel, setBireysel] = useState({
    type: "bireysel",
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordAgain: "",
    phone: "",
    tc: "",
  });

  const [kurumsal, setKurumsal] = useState({
    type: "kurumsal",
    companyName: "",
    taxOrTcNo: "",
    email: "",
    password: "",
    passwordAgain: "",
    phone: "",
    tc: "",
  });
  const [restoran, setRestoran] = useState({
    type: "restoran",
    restaurantName: "",
    taxOrTcNo: "",
    email: "",
    password: "",
    passwordAgain: "",
    phone: "",
    tc: "",
  });

  const [kurye, setKurye] = useState({
    type: "restoran",
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordAgain: "",
    phone: "",
    tc: "",
    idCardUrl: "",
    drivingCardUrl: "",
  });

  const [progress, setProgress] = useState(0);
  const [selection, setSelection] = useState("Bireysel");
  const [secret, setSecret] = useState(false);

  
  const SelectionButton = ({ title }) => {
    const isSelected = selection == title;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelection(title);
          setProgress(0);
        }}
        style={[
          styles.selectionBt,
          {
            backgroundColor: isSelected && "black",
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
        marginVertical: 30,
      }}
    >
      <SelectionButton title={"Bireysel"} />
      <SelectionButton title={"Kurumsal"} />
      <SelectionButton title={"Restoran"} />
      <SelectionButton title={"Kurye"} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: 50 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          padding: 10,
        }}
      >
        <Icon
          name="chevron-back-outline"
          size={34}
          color="black"
          style={{ position: "absolute", left: 5 }}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.header}>Yeni Üyelik Oluştur</Text>
      </View>

      <ButtonContainer />
      <View
        style={{
          backgroundColor: "#ededed",
          padding: 20,
          marginHorizontal: 15,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.7,
          shadowRadius: 6.27,

          elevation: 5,
        }}
      >
        {progress == 0 && (selection == "Bireysel" || selection == "Kurye") && (
          <View>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Ad"
              value={selection == "Bireysel" ? bireysel.name : kurye.name}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(name) => {
                selection == "Kurye"
                  ? setKurye({ ...kurye, name: name })
                  : setBireysel({ ...bireysel, name: name });
              }}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Soyad"
              value={
                selection == "Bireysel" ? bireysel.lastName : kurye.lastName
              }
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(lastName) => {
                selection == "Kurye"
                  ? setKurye({ ...kurye, lastName: lastName })
                  : setBireysel({ ...bireysel, lastName: lastName });
              }}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Tc Kimlik No"
              value={selection == "Bireysel" ? bireysel.tc : kurye.tc}
              keyboardType="numeric"
              maxLength={11}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(tc) => {
                selection == "Kurye"
                  ? setKurye({ ...kurye, tc: tc })
                  : setBireysel({ ...bireysel, tc: tc });
              }}
            />
          </View>
        )}

        {progress == 0 && (selection == "Kurumsal" || selection == "Restoran") && (
          <View>
            <TextInput
              style={styles.input}
              mode="outlined"
              label={selection == "Restoran" ? "Restoran Adı" : "Firma Adı"}
              value={
                selection == "Restoran"
                  ? restoran.restaurantName
                  : kurumsal.companyName
              }
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(name) => {
                selection == "Restoran"
                  ? setRestoran({ ...restoran, restaurantName: name })
                  : setKurumsal({ ...kurumsal, companyName: name });
              }}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Vergi No veya TC. Kimlik No"
              value={
                selection == "Restoran"
                  ? restoran.taxOrTcNo
                  : kurumsal.taxOrTcNo
              }
              keyboardType="numeric"
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(tc_tax) => {
                selection == "Restoran"
                  ? setRestoran({ ...restoran, taxOrTcNo: tc_tax })
                  : setKurumsal({ ...kurumsal, taxOrTcNo: tc_tax });
              }}
            />
          </View>
        )}

        {progress == 1 && (
          <View>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Telefon Numarası"
              value={() => {
                switch (selection) {
                  case "Bireysel":
                    return bireysel.phone;
                  case "Kurye":
                    return kurye.phone;
                  case "Kurumsal":
                    return kurumsal.phone;
                  case "Restoran":
                    return restoran.phone;
                }
              }}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(phone) => {
                switch (selection) {
                  case "Bireysel":
                    setBireysel({ ...bireysel, phone: phone });
                    break;
                  case "Kurye":
                    setKurye({ ...kurye, phone: phone });
                    break;
                  case "Kurumsal":
                    setKurumsal({ ...kurumsal, phone: phone });
                    break;
                  case "Restoran":
                    setRestoran({ ...restoran, phone: phone });
                    break;
                }
              }}
            />
          </View>
        )}
        {progress == 2 && (
          <View>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="E-Posta"
              value={() => {
                switch (selection) {
                  case "Bireysel":
                    return bireysel.email;
                  case "Kurye":
                    return kurye.email;
                  case "Kurumsal":
                    return kurumsal.email;
                  case "Restoran":
                    return restoran.email;
                }
              }}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "white",
                },
              }}
              onChangeText={(email) => {
                switch (selection) {
                  case "Bireysel":
                    setBireysel({ ...bireysel, email: email });
                    break;
                  case "Kurye":
                    setKurye({ ...kurye, email: email });
                    break;
                  case "Kurumsal":
                    setKurumsal({ ...kurumsal, email: email });
                    break;
                  case "Restoran":
                    setRestoran({ ...restoran, email: email });
                    break;
                }
              }}
            />
            <TextInput
              value={() => {
                switch (selection) {
                  case "Bireysel":
                    return bireysel.password;
                  case "Kurye":
                    return kurye.password;
                  case "Kurumsal":
                    return kurumsal.password;
                  case "Restoran":
                    return restoran.password;
                }
              }}
              mode="outlined"
              onChangeText={(password) => {
                switch (selection) {
                  case "Bireysel":
                    setBireysel({ ...bireysel, password: password });
                    break;
                  case "Kurye":
                    setKurye({ ...kurye, password: password });
                    break;
                  case "Kurumsal":
                    setKurumsal({ ...kurumsal, password: password });
                    break;
                  case "Restoran":
                    setRestoran({ ...restoran, password: password });
                    break;
                }
              }}
              secureTextEntry={secret}
              label="Password"
              style={styles.input}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: 'black',
                  underlineColor: "transparent",
                  background: "#003489",
                },
              }}
              right={
                <TextInput.Icon
                  forceTextInputFocus={false}
                  onPress={() => setSecret(!secret)}
                  name={secret ? "eye-off" : "eye"}
                  color="grey"
                  style={{ marginTop: 15 }}
                />
              }
            />

            <TextInput
              style={styles.input}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "#003489",
                },
              }}
              mode="outlined"
              secureTextEntry={true}
              label="Password again"
              onChangeText={(passwordAgain) => {
                switch (selection) {
                  case "Bireysel":
                    setBireysel({ ...bireysel, passwordAgain: passwordAgain });
                    break;
                  case "Kurye":
                    setKurye({ ...kurye, passwordAgain: passwordAgain });
                    break;
                  case "Kurumsal":
                    setKurumsal({ ...kurumsal, passwordAgain: passwordAgain });
                    break;
                  case "Restoran":
                    setRestoran({ ...restoran, passwordAgain: passwordAgain });
                    break;
                }
              }}            />
          </View>
        )}
        {progress == 3 && selection == "Kurye" && (
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                justifyContent: "center",
                marginBottom: 10,
                alignItems: "center",
                padding: 10,
                width: "95%",
              }}
            >
              <Text style={[styles.header, { fontSize: 15 }]}>
                Kimlik Fotoğrafını Yükleyiniz
              </Text>
              <TouchableOpacity
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 10,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                }}
              >
                <Icon name="add-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                width: "95%",
              }}
            >
              <Text style={[styles.header, { fontSize: 15 }]}>
                Ehliyet Fotoğrafını Yükleyiniz
              </Text>
              <TouchableOpacity
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 10,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                }}
              >
                <Icon name="add-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 50,
            width: 320,
            height: 50,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: "black",
          }}
          mode="outlined"
          onPress={() => {
            if (progress == 2 && selection != "Kurye") {
              //props.navigation.navigate("Home");
              switch (selection) {
                case "Bireysel":
                console.log(bireysel)
                auth.createUserWithEmailAndPassword(bireysel.email, bireysel.password).then(a=>{"a",a}).catch(b=>{console.log("b",b)})
                break;
                case "Kurumsal":
                  console.log(kurumsal)
                  props.onRegister(kurumsal);

                  break;
                case "Restoran":
                  console.log(restoran)
                  props.onRegister(restoran);

                  break;
              }
            } else if (progress == 3 && selection == "Kurye") {
              //props.navigation.navigate("Home");
              props.onRegister(kurye);
            } else {
              setProgress(progress + 1);
            }
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {progress == 3
              ? "Üye Ol"
              : progress == 2 && selection != "Kurye"
              ? "Üye Ol"
              : "Devam Et"}
          </Text>
          <Icon
            name={"arrow-forward-outline"}
            color="white"
            size={20}
            style={{ position: "absolute", right: 20 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
