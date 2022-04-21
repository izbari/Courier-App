import React from "react";
import { StyleSheet, View, Text ,TouchableOpacity,Dimensions} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { navigate } from "../../../navigations/rootNavigation";
const { width } = Dimensions.get("window");

export default function Ödeme() {
 
  const [state, setState] = React.useState(false);
  const onChange = (formData) =>{
    let status=true;
    Object.values(formData.status).forEach((value) => {
      value != "valid" && (status = false);
    })
    setState(status)
    }
  const onFocus =  (field) => console.log("focusing", field); 
  const s = StyleSheet.create({
    header: {
      marginBottom: 20,
      color: "#000",
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
    },
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      marginTop: 60,
     
    },
    cardContainer: {
      height:550,
      backgroundColor: "#ededed",
      padding: 20,
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
    },
    label: {
      color: "black",
      fontSize: 12,
      
    },
    input: {
      fontSize: 16,
      color: "black",
    },
    button:{
      marginTop:15,
      width: width*.75,
      height: 50,
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: !state ? "gray" : "black",
    }
  });
  return (
    <View style={s.container}>
      <Text style={s.header}>Ödeme</Text>
      <View style={s.cardContainer}>
      <CreditCardInput
        autoFocus
        requiresName
        requiresCVC
        labelStyle={s.label}
        inputStyle={s.input}
        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onFocus={onFocus}
        onChange={onChange}
        
      />
      <TouchableOpacity
      disabled={!state}
          activeOpacity={0.7}
          style={s.button}
          // APi den gelen doğrulama sağlanırsa 
          // loading çıkarıp siparişlerim aktif sekmesine gidecek..
          // siparişlerim sayfasında aktif sayfasına düşecek olan siparişin durumunu görüntüleyeceğiz.
          // Kurye almaya gelince kullanıcıya bildirim gider ve sipariş artık yolda sekmesine düşer.
          // sonra ise sipariş yolda konumuna geçer.
          // sipariş yolda seknesindeki siparişe basınca haritada kuryeyi izleyebilmelidir.
          // clientin kuryeyi yola cıktığında izleyebilmesi için kurye anlık konumu firebase'e yollayacaktır.
          // anlık kurye datasını okuyarak kuryeyi izlememiz gerekecek.
          // KURYE ödeme alınca bildirim gider ve kuryenin aktif sipariş sayfasına düşer.
          // kurye siparişi almaya gider alınca aldım der uygulamaya kullanıcıya bildirim gider.
          // kurye siparişi teslim edince kullanıcıya tekrar edildi diye bildirim gider.
          // kuryenin eski siparişlerim bölümüne düşer artık sipariş.
          // client tarafında da geçmiş siparişlerim sekmesine düşer.
          // ilgili data bilgisi firestoreda tutulur.
          onPress={()=> navigate("Siparişlerim")}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Ödemeyi Onayla
          </Text>
        </TouchableOpacity>
      
      </View>
      
    </View>
  );
  
}

