import { Avatar } from '@rneui/base'
import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';

export const SendMessage = ({msg}:any) => {

    const {user} = useContext(AuthContext)
  return (
    <View style={styles.senderContainer}>
        <Avatar
            
            position='absolute'
            bottom={-15}
            left={-5}
            size={30}
            rounded
            source={{
                uri:user?.imageUrl
            }}
        />
        <Text style={styles.senderText}>{msg?.mensajes}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    senderContainer:{
        padding:15,
        backgroundColor:'#2b68e6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15,
    }
});