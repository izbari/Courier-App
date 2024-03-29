import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber
} from "firebase/auth";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const auth = getAuth();
const CELL_SIZE = 40;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = "#fff";
const NOT_EMPTY_CELL_BG_COLOR = "#000";
const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const source = require("../assets/images/pin.png");

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 500,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const AnimatedExample = ({
  verificationId,
  verificationCode,
  setVerificationCode,
  setProgress
}) => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [timer,setTimer] = useState(60);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer <= 0) return
      else  setTimer(timer-1)
    }, 1000)
    return () => clearInterval(timerId);
  }, [timer])
  console.log(timer)
  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
            
      <Text style={styles.title}>Sms Onaylama</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>Sms'e gelen kodu giriniz{"\n"}</Text>

      <CodeField
        ref={ref}
        {...props}
        value={verificationCode}
        onChangeText={setVerificationCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <TouchableOpacity
        onPress={async () => {
          try {
            signInWithPhoneNumber
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
           
            await signInWithCredential(auth, credential).then((a) => {
              console.log("a", a.user);
            });
            setTimer(0)
            console.log("success");
          } catch (err) {
              console.log(err.code)
            err.code === "auth/invalid-verification-code" && setVerificationCode("")
            setMessage(err);
          }
        }}
        disabled={verificationCode.length !== 6}
        style={[
          styles.nextButton,
          { backgroundColor: verificationCode.length < 6 ? "gray" : "#3557b7" },
        ]}
      >
        <Text style={styles.nextButtonText}>Verify</Text>
      </TouchableOpacity>
     <View style={{justifyContent:'center',alignItems:'center'}}>
     <Text style={{color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",}}>{timer}</Text>

     {(message.length !== 0 &&
      message.code === "auth/invalid-verification-code") && (
        <Text style={{ color: "red" }}>Geçersiz kod, Tekrar Deneyin</Text>
      ) }
      {(message.length !== 0 &&
      message.code === "auth/code-expired" || timer == 0) && <Text 
      onPress={() => {setProgress(0); 
    setVerificationCode("");}}
      style={{ color: "red" }}>Kodun Süresi bitti, Tekrar gönder</Text>}
     </View>
    </SafeAreaView>
  );
};

export default AnimatedExample;
const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 5,
  },

  // =======================

  root: {
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
    padding: 20,
  },
  title: {
    paddingTop: 30,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 40,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 30,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});
