import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "./rootNavigation";
import { useSelector } from "react-redux";
import Kurye from "../screens/Home/Main/Kurye";
import Profilim from "../screens/Home/Main/Profilim";
import Siparişlerim from "../screens/Home/Main/Siparişlerim";
import Icon from "@expo/vector-icons/Fontisto";
const Tab = createBottomTabNavigator();

export default function App() {
  const user = useSelector((state) => state.authReducers.currentUser);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Kurye Çağır") {
            iconName = "motorcycle";
          } else if (route.name === "Siparişlerim") {
            iconName = "nav-icon-list-a";
          } else {
            iconName = "person";
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={route.name === "Siparişlerim" ? size - 5 : size}
              color={color}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          paddingTop: 5,
        },
        tabBarItemStyle: {
          padding: 5,
          paddingBottom: 3,
        },
        tabBarStyle: {
          height: 55,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {user?.type !== "Kurye" && <Tab.Screen
        name="Kurye Çağır"
        component={Kurye}
        screenOptions={{ headerShown: "false" }}
      />}
      <Tab.Screen
        name="Siparişlerim"
        component={Siparişlerim}
        screenOptions={{ headerShown: "false" }}
      />
      <Tab.Screen
        name="Profilim"
        component={Profilim}
        screenOptions={{ headerShown: "false" }}
      />
    </Tab.Navigator>
  );
}
