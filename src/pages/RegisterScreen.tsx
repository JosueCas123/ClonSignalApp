import React = require('react')
import { useLayoutEffect,useEffect, useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Text } from '@rneui/base'
import { KeyboardAvoidingView, StyleSheet, View, Keyboard, Alert } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';


interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({navigation}:Props) => {

  const {singUp, removeError, errorMessage} = useContext(AuthContext)

   const [nombre, setnombre] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [imageUrl, setImageUrl] = useState('')

   useLayoutEffect(()=> {
    navigation.setOptions({
        headerBackTitle:'asdsad'
    })
   },[navigation])


   
  useEffect(() => {
    if(errorMessage.length === 0) return;

    Alert.alert(
      'El gmail ya esta siendo ussado',
      errorMessage,
      [
        {
          text:'Ok',
          onPress: removeError
        }
      ]
    )
},[errorMessage])

   const register = () => {
      Keyboard.dismiss()

      singUp({email, password, nombre, imageUrl})
   }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text h3 style={{marginBottom:50}} > 
            Create a Singnal account
        </Text>
        <View style={styles.inputContainer}>
        <Input
            placeholder="full nombre"
            autoFocus 
            keyboardType='default'
            value={nombre}
            onChangeText={text => setnombre(text)}
          />
        
        <Input
            placeholder="Email"
            autoFocus 
            keyboardType='email-address'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        <Input
            placeholder="Password"
            autoFocus 
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        <Input
            placeholder="Profile Picture URL (optional)"
            autoFocus 
            secureTextEntry
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            onSubmitEditing={register}
        />
        </View>
        <Button
            containerStyle={styles.button}
            raised
            onPress={register}
            title='Register'
        />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    inputContainer:{  
        width:300
     },
     button:{
        width:200,
     }
    
});