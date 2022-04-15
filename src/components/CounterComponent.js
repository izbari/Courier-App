import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
const CounterComponent = (props) => {
  console.log("props", props);
  return (
    <View style={styles.container}>
      <Text>{props.times}</Text>
      <Button
        title="increase"
        onPress={() => {
          props.onIncrease(3);
        }}
      />
      <Button
        title="decrease"
        onPress={() => {
          props.onDecrement(3);
        }}
      />
    </View>
  );
};

export default CounterComponent;

const styles = StyleSheet.create({
  container: {flex:1,justifyContent:'center',alignItems:'center'},
});
