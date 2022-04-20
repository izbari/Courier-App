import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { TextInput, Text, Button, TouchableRipple,Avatar,Headline, Title, Subheading } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
//main methods
import Icon from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import images from '../../constants/imagePath'
import { navigate } from "../../navigations/rootNavigation";
function Signup(props) {
  const [selection, setSelection] = React.useState("Aktif");
  const Card = () => { 
    return (
      <TouchableOpacity
      activeOpacity={0.5}
        style={{
          backgroundColor: "#ededed",
          marginHorizontal: 15,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.7,
          shadowRadius: 6.27,
          justifyContent:'center',
          elevation: 5,
          marginBottom:30,

        }}>

        <View style={{ flexDirection: "row",
    justifyContent:'space-between'}}>
       <>
       <Avatar.Image 
             style={{marginLeft:10,marginTop:15}}
             size={70} source={images.courier} />
            
      <View
        style={{
            flex:1,
            alignItems:'flex-start',
            paddingLeft:15,
            paddingVertical:10,
        }}
      >
        <Text style={{fontSize:16,fontWeight:'bold'}}>Zafer Barış</Text>
        <Text style={{fontSize:14}}>Sipariş sayısı: 15</Text>
       <View style={{ flexDirection: "row",alignItems:'center' }}>
          <Ionicons name="star" size={18} color="#ff9838" />
          <Text  style={{fontSize:14}}>{"  7.2"}</Text>
        </View>
        <View style={{ flexDirection: "row",alignItems:'center', }}>
          <Ionicons name="car" size={18} color="black" />
          <Text  style={{fontSize:14}}>{"  Motor "}</Text>
        </View>
      </View>
      </>
      <View style={styles.buttonView}>
              <Pressable
                onPress={() => {navigate("Ödeme")}}
                android_ripple={{color: 'black',}}
                style={styles.loginButton}>
                <Text style={styles.buttonText}>Seç</Text>
              </Pressable>
            </View>
        </View>
       


    
      </TouchableOpacity>
    )
   }
//   const SelectionButton = ({ title }) => {
//     const isSelected = selection == title;
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           setSelection(title);
//         }}
//         style={[
//           styles.selectionBt,
//           {
//             backgroundColor: isSelected && "black",
//             alignItems: "center",
//             justifyContent: "center",
//           },
//         ]}
//       >
//         <Text style={[styles.textBt, { color: isSelected && "white" }]}>
//           {title}
//         </Text>
//       </TouchableOpacity>
//     );
//   };
//   const ButtonContainer = () => (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",
//         marginVertical: 20,
//       }}
//     >
//       <SelectionButton title={"Aktif"} />
//       <SelectionButton title={"Yolda"} />
//       <SelectionButton title={"Geçmiş"} />
//     </View>
//   );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
        <Text style={styles.header}>Uygun Kuryeler</Text>
      </View>

     <Card />
     <Card />

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    buttonText: {
        color: 'white'
        ,fontWeight:'bold',
        fontSize: 14,
        fontFamily: 'sans-serif-light',
      },
  header: {
      marginBottom:30,
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonView: {
    alignSelf: 'stretch',

    justifyContent: 'center',
    elevation: 25,
    margin: 10,
  },
  loginButton: {
    height: 50,
    width:60,
    borderRadius: 10,
    backgroundColor: '#00cc00',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Signup;
