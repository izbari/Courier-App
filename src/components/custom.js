import { StyleSheet, Button, View } from 'react-native'
import React from 'react'
import { navigate } from '../navigations/rootNavigation'
const custom = (props) => {
  return (
    <View>
      <Button title='detailse git' onPress={()=>{navigate('Home')}} >custom</Button>
    </View>
  )
}

export default custom

const styles = StyleSheet.create({})