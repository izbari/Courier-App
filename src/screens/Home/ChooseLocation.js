//import libraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

//reusable components
import AddressPickup from "../../components/AddressPickup";
import CustomBtn from "../../components/CustomBtn";
import { showError, showSuccess } from "../../helper/helperFunction";
import { navigate } from "../../navigations/rootNavigation";
import Message from "../../helper/helperFunction";
const ChooseLocation = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
    visible: false,
  });
  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {},
  });

  const showMessage = (message,status) => { 
    setMessage({message,status,visible:true});    
    setTimeout(() => {
        setMessage({...message,visible:false});    

    },3000)
   }
  const { pickupCords, destinationCords } = state;

  const checkValid = () => {
    if (Object.keys(pickupCords).length === 0) {
        showMessage({
            message: "Lütfen başlangıç noktasını seçiniz.",
            status: "error",
          });
      return false;
    } else if (Object.keys(destinationCords).length === 0) {
        showMessage({
            message: "Lütfen varış noktasını seçiniz.",
            status: "error",
          });
      Alert.alert("Please enter your destination location");
      return false;
    }
    return true;
  };

  const onDone = () => {
   
    const isValid = checkValid();
    if (isValid) {
      navigate("Kurye Çağır", {
        selectedLocation: { destinationCords, pickupCords },
      });
    }else{
        showMessage({
            message: "Lütfen seçtiğiniz adresleri doğru giriniz.",
            status: "error",
          });
    }
  };
  const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
    console.log("zip code==>>>", zipCode);
    console.log("city texts", cityText);
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  const fetchPickupCords = (lat, lng, zipCode, cityText) => {
    console.log("zip code==>>>", zipCode);
    console.log("city texts", cityText);
    setState({
      ...state,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  return (
    <View style={styles.container}>
      <View
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "white", flex: 1, padding: 24 }}
      >
        <View style={{ marginBottom: 16 }} />
        <AddressPickup
          placheholderText="Enter Origin Location"
          fetchAddress={fetchPickupCords}
        />
        <AddressPickup
          placheholderText="Enter Destination Location"
          fetchAddress={fetchDestinationCords}
        />
        <CustomBtn
          btnText="Done"
          onPress={onDone}
          btnStyle={{ marginTop: 24 }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ChooseLocation;
