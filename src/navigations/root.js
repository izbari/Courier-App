import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./rootNavigation";
import AuthStackScreens from "./AuthStack";
import HomeTab from "./HomeTab";
import { useSelector } from "react-redux";
import { Provider } from "react-native-paper";
import UygunKurye from "../screens/Home/Others/UygunKurye";
import Ödeme from "../screens/Home/Others/Ödeme";
import Bilgilerim from "../screens/Home/Others/Bilgilerim";
import Adreslerim from "../screens/Home/Others/Adreslerim";

import AuthLoading from '../screens/AuthLoading'
import { auth } from "../../firebase";
function Root() {
  const isLoggedIn = useSelector((state) => state.authReducers.currentUser);
  console.log("qqqqqqqqqqqqqqqqqqqqqqq",isLoggedIn);
  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };
  

  return (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator options={options} initialRouteName="AutLoading" >
        
          <Stack.Screen name="AuthLoading" component={AuthLoading} options={options} />

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
            <Stack.Screen
                name="Adreslerim"
                component={Adreslerim}
                options={options}
              />
              <Stack.Screen
                name="Bilgilerim"
                component={Bilgilerim}
                options={options}
              />
          
            <Stack.Screen
              name="Auth"
              component={AuthStackScreens}
              options={options}
            />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Root;
