
import React = require('react')
import { ScrollView, StatusBar, Text, View } from 'react-native'
import { CustomListItems } from '../components/CustomListItems'

export const HomeScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
       <ScrollView>
        <CustomListItems/>
       </ScrollView>
    </View>
  )
}
