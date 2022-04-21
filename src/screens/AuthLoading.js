import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { auth } from '../../firebase';
export default function App({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log("user-----------------------------------------------------------------",user)
    setUser(user);
    if (initializing) setInitializing(false);
  }
auth.onAuthStateChanged
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (user) {
    console.log("user",user)
    console.log("!usera girdi")
    navigation.navigate("Auth")
  }else{
      console.log("user vara girdi")
    navigation.replace("Home")
  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator animating={true}  />
    </View>
  );
}