import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Text, Button, TouchableRipple } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";
//main methods
function Signup(props) {
  //States ,effects, vars
  const [password, setPassword] = React.useState("");
  const [passwordAgain, setPasswordAgain] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [selection, setSelection] = React.useState("Bireysel");
  const [secret, setSecret] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [bottom, setBottom] = React.useState(true);
  const hideModal = () => {
    setVisible(false);
    setBottom(true);
  };
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [passwordOutlineColor, setPasswordOutlineColor] =
    React.useState("black");
  console.log("rerender");
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
        <Text style={styles.header}>Giriş Yap</Text>
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
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Telefon no"
          value={name}
          theme={{
            colors: {
              placeholder: "black",
              text: "black",
              primary: "black",
              underlineColor: "transparent",
              background: "white",
            },
          }}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          value={password}
          mode="outlined"
          onChangeText={(password) => {
            setPassword(password);
          }}
          secureTextEntry={secret}
          label="Şifre"
          style={styles.input}
          theme={{
            colors: {
              placeholder: "black",
              text: "black",
              primary: passwordOutlineColor,
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
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 320,
            height: 50,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginVertical: 30,
            backgroundColor: "black",
          }}
          mode="outlined"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Hesabınız yok mu ? </Text>
          <TouchableRipple
            rippleColor="transparent"
            onPress={() => props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "blue", marginLeft: 2 }}>Üye Ol</Text>
          </TouchableRipple>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableRipple
            style={{
              width: 120,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            rippleColor="gray"
            onPress={() => props.navigation.navigate("ForgetPassword")}
          >
            <Text
              style={{
                color: "blue",
                marginLeft: 2,
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              Şifremi Unuttum
            </Text>
          </TouchableRipple>
        </View>
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
