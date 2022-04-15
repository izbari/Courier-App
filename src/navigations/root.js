import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./rootNavigation";
import AuthStackScreens from "./AuthStack";
import HomeTab from "./HomeTab";

function Root() {
  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };
  const isSignedIn = true;
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator options={options}>
        {!isSignedIn ? (
          <Stack.Screen
            name="Auth"
            component={AuthStackScreens}
            options={options}
          />
        ) : (
          <Stack.Screen name="Home" component={HomeTab} options={options} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;
