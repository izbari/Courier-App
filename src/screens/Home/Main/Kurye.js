import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Alert,
  LogBox,
  Platform,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { GOOGLE_MAP_KEY } from "../../../constants/googleMapKey";
import imagePath from "../../../constants/imagePath";
import MapViewDirections from "react-native-maps-directions";
//import Loader from "../../components/Loader";
import { navigate } from "../../../navigations/rootNavigation";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import Message from "../../../helper/helperFunction";
import { Distance, Time } from "../../../helper/time";
import {
  Dialog,
  Portal,
  RadioButton,
  Title,
  Headline,
  Caption,
  Subheading,
  IconButton,
  Paragraph,
} from "react-native-paper";
import AddressPickup from "../../../components/AddressPickup";
import CustomBtn from "../../../components/CustomBtn";
import Icon from "@expo/vector-icons/Ionicons";
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Kurye = ({ navigation, route }) => {
  const mapRef = useRef();
  const markerRef = useRef();
  const [info, setInfo] = useState({
    type: "",
    description: "",
    vehicleType: "",
    pickupCords: {},
    destinationCords: {},
    completed: false,
  });
  const [visible, setVisible] = React.useState({
    message: false,
    messageText: "",
    messageStatus: "",
    dialog: false,
  });

  const [state, setState] = useState({
    curLoc: {
      latitude: null,
      longitude: null,
    },
    pickupCords: {},
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });
  const showMessage = (text, status) => {
    setVisible({
      ...state,
      message: true,
      messageText: text,
      messageStatus: status,
    });
    setTimeout(() => {
      setVisible({
        ...visible,
        message: false,
        messageStatus: "error",
        messageText: null,
      });
    }, 3000);
  };
  
  const {
    curLoc,
    time,
    distance,
    pickupCords,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const checkValid = () => {
    if (Object.keys(info.pickupCords).length === 0) {
      showMessage("Lütfen başlangıç noktasını seçiniz.", "error");
      return false;
    } else if (Object.keys(info.destinationCords).length === 0) {
      showMessage("Lütfen varış noktasını seçiniz.", "error");

      return false;
    } else if (
      info.description === "" ||
      info.type === "" ||
      info.vehicleType === "" ||
      (info.type == "Diğer" && info.otherTypeInfo === "")
    ) {
      showMessage("Lütfen tüm alanları doldurun.", "error");
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      setVisible({ ...visible, dialog: false });
      setInfo({ ...info, completed: true });
      setState({ ...state, destinationCords: info.destinationCords,pickupCords: info.pickupCords });
    }
  };
  const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
    console.log("zip code==>>>", zipCode);
    console.log("city texts", cityText);
    setInfo({
      ...info,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  const fetchPickupCords = (lat, lng, zipCode, cityText) => {
    console.log("zip code==>>>", zipCode);
    console.log("city texts", cityText);
    setInfo({
      ...info,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  useEffect(() => {

    getLiveLocation();
    console.log("çalışyım----------------------");
  }, []);

  const getLiveLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    let { latitude, longitude, heading } = coords;
    //console.log("get live location after 4 second", heading);
    onCenter({ latitude, longitude });
    updateState({
      heading: heading,
      curLoc: { latitude, longitude },
      coordinate: new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });

    //setLocation(location.coords);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getLiveLocation();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleForm = () => {
    // navigate("ChooseLocation");
    setVisible({ ...visible, dialog: true });
    setInfo({ ...info, completed: false, pickupCords: {}, destinationCords: {} });

  };

  const fetchValue = ({ destinationCords, pickupCords }) => {
    console.log(curLoc);
    updateState({
      pickupCords: pickupCords,
      destinationCords: destinationCords,
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = (loc) => {
    if (loc.latitude && loc.longitude) {
      mapRef.current.animateToRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else {
      showMessage(
        "Paketinizin alınacağı adres ve gönderileceği adresi giriniz.",
        "error"
      );
    }
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {distance !== 0 && time !== 0 && info.completed && (
        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <Paragraph>Ortalama süre : {Time(time.toFixed(0))}dk </Paragraph>
          <Paragraph>Ortalama Mesafe: {Distance(distance.toFixed(0))}</Paragraph>
        </View>
      )}
      <Portal>
        <Message
          title={visible.messageText}
          status={visible.messageStatus}
          visible={visible.message}
        />
        <Dialog
          style={{
            flexGrow: 1,
            width: screen.width * 0.95,
            alignSelf: "center",
          }}
          visible={visible.dialog}
          dismissable={false}
        >
          <Dialog.Content>
            
            <ScrollView
            horizontal={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <IconButton
                icon="close"
                style={{ position: "absolute", top: -5, right: -5 }}
                color={"#a3a2a7"}
                size={20}
                onPress={() => {
                  Alert.alert("Uyarı","Bilgileriniz temizlenecek emin misiniz",    [
                    {
                      text: "Tamam",
                      style: "destructive",
                      onPress: () => {
                        setVisible({ ...visible, dialog: false });
                        setInfo({  type: "",
                        description: "",
                        vehicleType: "",
                        pickupCords: {},
                        destinationCords: {},
                        completed: false,});
                        setState({ ...state, destinationCords: {},pickupCords: {} });
                        
                       }
                    },
                    {
                      text: "İptal",
                      style: "cancel",
                    },
                  ],
                  {
                    cancelable: true,});
                  
                }}
              />

              <Title
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  marginVertical: 20,
                }}
              >
                İşlem Formu
              </Title>
             <ScrollView
                           contentContainerStyle={{flex: 1, width: '100%', height: '100%'}}

             keyboardShouldPersistTaps="always"
             horizontal
             >
             <AddressPickup
                placheholderText="📍 Kuryenin paketi teslim alacağı adres"
                fetchAddress={fetchPickupCords}
              />
             </ScrollView>
             <ScrollView
              contentContainerStyle={{flex: 1, width: '100%', height: '100%'}}
keyboardShouldPersistTaps="always"
             horizontal
             showsHorizontalScrollIndicator={false}
             >
              <AddressPickup
                placheholderText="📍 Paketin teslim edileceği adres"
                fetchAddress={fetchDestinationCords}
                showsHorizontalScrollIndicator={false}
              />
              </ScrollView>

              

              <RadioButton.Group

                onValueChange={(newValue) =>
                  setInfo({ ...info, vehicleType: newValue })
                }
                value={info.vehicleType}
              >
                <View                 style={{ marginVertical: 10 }}
><Caption>Paketin içeriğini seçiniz</Caption>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Motor" />
                  <Text>Motor</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Araba" />
                  <Text>Araba</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Kamyon" />
                  <Text>Kamyon</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Transit" />
                  <Text>Transit</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Diğer" />
                  <Text>Diğer</Text>
                </View>
                </View>
              </RadioButton.Group>
              {info.vehicleType == "Diğer" && (
                <TextInput
                  onChangeText={(value) =>
                    setInfo({ ...info, vehicleType: value })
                  }
                  value={info.vehicleType}
                  multiline
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 8,
                    borderRadius: 5,
                    marginVertical: 15,
                  }}
                  placeholder="Uygun aracın tipini giriniz"
                />
              )}


              <RadioButton.Group
                onValueChange={(newValue) =>
                  setInfo({ ...info, type: newValue })
                }
                value={info.type}
                >
                                  <View                 style={{ marginVertical: 10 }}>

                <Caption>Paketin içeriğini seçiniz</Caption>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Zarf/Mektup" />
                  <Text>Zarf/Mektup</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Koli" />
                  <Text>Koli</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Ev eşyası" />
                  <Text>Ev eşyası</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Yemek" />
                  <Text>Yemek</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Diğer" />
                  <Text>Diğer</Text>
                </View>
                </View>
              </RadioButton.Group>
              {info.type == "Diğer" && (
                <View style={{marginBottom:10}}>
                  <Caption>Paketin içeriğini seçiniz</Caption>

                  <TextInput
                    onChangeText={(value) =>
                      setInfo({ ...info, otherTypeInfo: value })
                    }
                    value={info.otherTypeInfo}
                    multiline
                    style={{
                      backgroundColor: "#f3f3f3",
                      padding: 8,
                      borderRadius: 5,
                      marginVertical: 5,
                    }}
                    placeholder="Göndereceğiniz ürün kategorisi"
                  />
                </View>
              )}
                              

              <Caption>Paketin içeriğini hakkında detaylı bilgi</Caption>
              <TextInput
                onChangeText={(value) =>
                  setInfo({ ...info, description: value })
                }
                value={info.description}
                multiline
                style={{
                  backgroundColor: "#f3f3f3",
                  padding: 8,
                  borderRadius: 5,
                  marginVertical: 5,
                }}
                placeholder="Koli gönderiyorum. İçinde kitaplar var..."
              />
           
              <CustomBtn
                btnText="Formu tamamla"
                onPress={onDone}
                btnStyle={{ marginTop: 24 }}
              />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={{ flex: 1 }}>
        <MapView ref={mapRef} style={StyleSheet.absoluteFill}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={imagePath.icCurLoc}
              style={{
                width: 40,
                height: 40,
                transform: [{ rotate: `${heading}deg` }],
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <Marker
              coordinate={destinationCords}
              image={imagePath.icGreenMarker}
            />
          )}
          {Object.keys(pickupCords).length > 0 && (
            <Marker coordinate={pickupCords}>
              <Image
                source={imagePath.icBike}
                style={{
                  width: 40,
                  height: 40,
                  transform: [{ rotate: `${heading}deg` }],
                }}
                resizeMode="contain"
              />
            </Marker>
          )}

          {Object.keys(destinationCords).length > 0 &&
            Object.keys(pickupCords).length > 0 && (
              <MapViewDirections
                origin={pickupCords}
                destination={destinationCords}
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={6}
                strokeColor="red"
                optimizeWaypoints={true}
                onStart={(params) => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`
                  );
                }}
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  //console.log("coordinates,", result.coordinates)
                  fetchTime(result.distance, result.duration),
                    //onCenter(result.coordinates[0])
                    mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      },
                      animated: true,
                    });
                }}
                onError={(errorMessage) => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}
        </MapView>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: info.completed ? 190 : 130,
            right: 15,
          }}
          onPress={() => onCenter(pickupCords)}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={imagePath.destination}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: info.completed ? 115 : 50,
            right: 0,
          }}
          onPress={() => onCenter(curLoc)}
        >
          <Image source={imagePath.greenIndicator} />
        </TouchableOpacity>
      </View>
      {info.completed &&
              <TouchableOpacity onPress={()=> navigate("Uygun Kurye")} style={[styles.inpuStyle,{bottom:70}]}>
        <Subheading style={{color:"#000"}}>Uygun Kuryeleri Listele</Subheading>
      </TouchableOpacity> }
      <TouchableOpacity onPress={handleForm} style={styles.inpuStyle}>
        <Subheading>Formu görmek{info.completed && " & düzenlemek"} için tıklayın</Subheading>
      </TouchableOpacity>
      {/* <Loader isLoading={!isLoading} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  inpuStyle: {
    position: "absolute",
    bottom: 10,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f3f3f3",
    elevation: 5,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginTop: 16,
  },
});

export default Kurye;
