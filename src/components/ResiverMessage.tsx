import { Avatar } from '@rneui/base'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/auth/AuthContext'

export const ResiverMessage = ({msg}:any) => {
    console.log('DESDE ENVIAR',msg)
    const {user} = useContext(AuthContext)
  return (
   <View style={styles.reciverContainer}>
        <Avatar
            position='absolute'
            bottom={-15}
            right={-5}
            size={30}
            rounded
             
            source={{
                uri:user?.imageUrl
            }}
        />
        <Text style={styles.reciverText}>{msg?.mensaje}</Text>
   </View>
  )
}

const styles = StyleSheet.create({
    reciverContainer:{
        padding:15,
        backgroundColor:'#ececec',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    reciverText:{
        color:'black',
        fontWeight:'500',
        marginLeft:10,
    }
});