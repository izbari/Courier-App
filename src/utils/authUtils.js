import {Alert} from 'react-native';
export function register({user}){
    const isEmpty = !Object.values(user).some(x => (x !== null && x !== ''));
    if(isEmpty){
        return Alert.alert("Please fill all the fields");
    }
}