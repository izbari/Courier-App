import * as React from "react";
import {
  
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput, Text, Button, TouchableRipple } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { logInStart } from "../../actions";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import Pin from '../../components/smsPin';
//main methods
function Signup(props) {
  //States ,effects, vars// Firebase references
const app = getApp();
const auth = getAuth();

// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

  const dispatch = useDispatch();
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [selection, setSelection] = React.useState("Bireysel");
  const [secret, setSecret] = React.useState(false);
  const [progress,setProgress] = React.useState(0);
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState('');
console.log(verificationCode)
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;
 
  console.log("rerender",selection,);
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
    <ScrollView
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

        {progress == 1 && <Pin  setProgress={setProgress} verificationId={verificationId} verificationCode={verificationCode} setVerificationCode={setVerificationCode}/>}
     {progress == 0 && <>
      <ButtonContainer />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        title='Prove you are human!'
        cancelLabel='Close'
      />
    

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
          placeholder="+90 ___ ___ ___"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
          value={phone}
          theme={{
            colors: {
              placeholder: "black",
              text: "black",
              primary: "black",
              underlineColor: "transparent",
              background: "white",
            },
          }}
          onChangeText={setPhone}
        />
       <FirebaseRecaptchaBanner
  textStyle={{ fontSize: 13, opacity: 1,paddingHorizontal:10,paddingVertical:10, }}
  linkStyle={{ fontWeight: 'bold' }}
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
            marginVertical: 10,
            backgroundColor: "black",
          }}
          mode="outlined"
          onPress={async() => {
             // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phone,
              recaptchaVerifier.current,
              60000,
            );
            setVerificationId(verificationId);
            setProgress(1);
            // showMessage({
            //   text: 'Verification code has been sent to your phone.',
            // });
          } catch (err) {
            showMessage("Geçersiz bir telefon mumarası girdiniz.");
            setTimeout(() => {showMessage("")},10000)
           console.log(err.message)
            // showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
           //dispatch(logInStart({  phone, password} ));
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Kodu Yolla
          </Text>
        </TouchableOpacity>
        {message ? <Text style={{alignSelf:'center',color:'red'}}>{message}</Text>:null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop:10
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

        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
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
        </View> */}
      </View>
      </>}
    </ScrollView>
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
