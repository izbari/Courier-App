import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "react-native-paper";
import Icon from '@expo/vector-icons/Ionicons'
const Bilgilerim = ({ route,navigation }) => {
  const { name, lastName, email, phone, tc ,type } = route.params?.user;
  const [info, setInfo] = useState(route.params?.user);
  
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS == "ios" ? 42 : 30 }}
    >
       <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          marginBottom:10
        }}
      >
        <Icon
          name="chevron-back-outline"
          size={34}
          color="black"
          style={{ position: "absolute", left: 5 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={{  color: "#000",
          fontSize: 24,
          fontWeight: "bold",}}>Bilgilerim</Text>
      </View>
     

      <ScrollView>
        <Title style={styles.subtitle}>Kullanıcı tipi</Title>
        <TextInput
          onChangeText={(value) => setInfo({ ...info, type: value })}
          value={(""+type).toUpperCase()}
          editable={false}
          multiline
          style={styles.input}
          placeholder="Kullanıcı Tipi"
        />
        <Title style={styles.subtitle}>Ad</Title>
        <TextInput
          onChangeText={(value) => setInfo({ ...info, name: value })}
          value={name}
          multiline
          style={styles.input}
          placeholder="İsminizi giriniz"
        />
        <Title style={styles.subtitle}>Soyad</Title>
        <TextInput
          onChangeText={(value) => setInfo({ ...info, lastName: value })}
          value={lastName}
          multiline
          style={styles.input}
          placeholder="Soy isiminizi giriniz"
        />
        <Title style={styles.subtitle}>E-posta</Title>
        <TextInput
          onChangeText={(value) => setInfo({ ...info, email: value })}
          value={email}
          editable={false}

          multiline
          style={styles.input}
          placeholder="E-mail"
        />
        
        <Title
          style={styles.subtitle}
        >
          Telefon Numarası
        </Title>
        <TextInput
          onChangeText={(value) => setInfo({ ...info, phone: value })}
          value={phone}
          multiline
          maxLength={10}
          
          style={styles.input}
          placeholder="Örn. 0123456789"
        />
        <Title style={styles.subtitle}>Tc numarası</Title>
        <TextInput
          onChangeText={(value) => setInfo({ ...info, tc: value })}
          value={tc}
          multiline
          maxLength={11}
          editable={false}

          style={styles.input}
          placeholder="Örn. 12345678910"
        />
         <TouchableOpacity
         activeOpacity={0.8}
              style={{
                backgroundColor:'black',
                alignItems: "center",
                elevation: 5,
                height: 50,
                width: "95%",
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginVertical: 10,
                shadowColor: "#000",
              }}
              onPress={() => {null}}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Değiştir
              </Text>
            </TouchableOpacity>
     
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bilgilerim;

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    backgroundColor: "#dadada",
    padding: 8,
    borderRadius: 5,
    marginVertical: 15,
    marginTop: 0,
    width: "90%",
  },
  subtitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 25,
  },
});
