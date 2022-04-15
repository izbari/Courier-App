import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/Auth/Welcome";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import ForgetPassword from "../screens/Auth/ForgetPassword";

const AuthStack = createNativeStackNavigator();

export default function AuthStackScreens() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
      <AuthStack.Screen name="Welcome" component={Welcome}  />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
}
