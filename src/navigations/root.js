import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./rootNavigation";
import AuthStackScreens from "./AuthStack";
import HomeTab from "./HomeTab";
import { useSelector } from "react-redux";
import { Provider } from "react-native-paper";
import UygunKurye from "../screens/Home/UygunKurye";
import Ödeme from "../screens/Home/Ödeme";
function Root() {
  const isLoggedIn = useSelector((state) => state.authReducers.currentUser);
  console.log(isLoggedIn);
  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };
  return (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator options={options}>
          {!isLoggedIn ? (
            <>
            <Stack.Screen name="Home" component={HomeTab} options={options} />
            
              <Stack.Screen
                name="Uygun Kurye"
                component={UygunKurye}
                options={options}
              />
              
              <Stack.Screen
                name="Ödeme"
                component={Ödeme}
                options={options}
              />
            </>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthStackScreens}
              options={options}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Root;
