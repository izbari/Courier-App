import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Banner } from "react-native-paper";

const helperFunction = ({ title, status,visible }) => {
  return (
    <Banner
      contentStyle={{ backgroundColor: status == "error" ? "red" : "green" }}
      visible={visible}
      actions={[]}
    >
     <Text style={{ color: "white", fontSize: 18,fontWeight:'bold',}}>{title}</Text>
    </Banner>
  );
};

export default helperFunction;

const styles = StyleSheet.create({});
