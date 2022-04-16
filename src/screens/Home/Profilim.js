import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import { logOut } from '../../actions';
import { useDispatch } from 'react-redux';
const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        }}
        resizeMode="cover"
        style={styles.backgroundImg}>
        <Image
          style={styles.profileImg}
          source={{
            uri: 'https://avatars.githubusercontent.com/u/73957984?v=4',
          }}
        />
        <Icon name='arrow-back' size={30} color='#fff' style={{position:'absolute',left:20,top:20}}/>
        {/* <TouchableOpacity style={styles.settings}>
          <Icon name="more" size={30} color="black" />
        </TouchableOpacity> */}
      </ImageBackground>

      <Text style={styles.name}>Zafer Barış</Text>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 5,
          marginHorizontal: 100,
        }}>
        <View>
          <TouchableOpacity>
            <Text style={styles.followNo}>10</Text>
            <Text style={styles.follow}>followers</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.followNo}>0</Text>
            <Text style={styles.follow}>followings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={styles.card}>
          <Text style={styles.favoritesTxt}>FAVORITE MOVIES</Text>
          <Text style={styles.favoritesNo}>{10}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.favoritesTxt}>WATCH LIST</Text>
          <Text style={styles.favoritesNo}>{10}</Text>
        </View>
      </View>

      <View style={styles.buttonView}>
              <Pressable
                onPress={() => {}}
                android_ripple={{color: 'black', borderless: true}}
                style={styles.loginButton}>
                <Text style={styles.buttonText}>Adreslerim</Text>
              </Pressable>
            </View>
      <View style={styles.buttonView}>
              <Pressable
                onPress={() => {}}
                android_ripple={{color: 'black', borderless: true}}
                style={styles.loginButton}>
                <Text style={styles.buttonText}>Ödeme Yöntemlerim</Text>
              </Pressable>
            </View>
  
      <View style={styles.buttonView}>
              <Pressable
                onPress={() => {dispatch(logOut())}}
                android_ripple={{color: 'black', borderless: true}}
                style={styles.loginButton}>
                <Text style={styles.buttonText}>Log Out</Text>
              </Pressable>
            </View>
    </SafeAreaProvider>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  buttonView: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 25,
    margin: 10,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-light',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin:5,
    borderRadius: 8,
    padding: 10,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  backgroundImg: {
    width: '100%',
    height: 150,
  },
  profileImg: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -60,
    width: 120,
    height: 120,
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 40,
  },
  name: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 65,
    fontWeight: 'bold',
    color: 'black',
  },
  bio: {
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    paddingHorizontal: 50,
    fontSize: 14,

    color: '#7e7b8c',
  },
  follow: {
    fontSize: 12,
    color: '#7e7b8c',
  },
  followNo: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#7e7b8c',
  },
  settings: {
    position: 'absolute',
    bottom: -125,
    left: '88%',
    width: 120,
    height: 120,
  },
  favoritesTxt: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
  },
  favoritesNo: {
    fontSize: 27,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    width: '45%',
    marginVertical: 10,
    elevation: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
