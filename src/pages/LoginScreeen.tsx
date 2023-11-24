
import React, {useContext, useEffect, useState} from 'react'
import { Button, Image } from "@rneui/base";
import { StatusBar, StyleSheet, Text, View, KeyboardAvoidingView, Alert, Keyboard } from "react-native"
import { Input } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth/AuthContext';




export const LoginScreeen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword]  = useState('')
  const {signIn, errorMessage, removeError} =  useContext(AuthContext)

  const navigation = useNavigation()

  useEffect(() => {
    if(errorMessage.length === 0) return;

    Alert.alert(
      'Login failed',
      errorMessage,
      [
        {
          text:'Ok',
          onPress: removeError
        }
      ]
    )


  },[errorMessage])

  const singIn = async() => {
   
    Keyboard.dismiss()
    
    signIn({email, password})


  }

  return (

    
    <KeyboardAvoidingView style={styles.container}>
        <StatusBar backgroundColor='#2c6bed'/>
        <Image
          source={{
            uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/2048px-Signal-Logo.svg.png'
          }}

          style={{width:150, height:150, borderRadius:20}}
          
        />

        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoFocus 
            value={email}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={singIn}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            autoFocus 
            value={password}
            onChangeText={text => setPassword(text)}
            onSubmitEditing={singIn}
          />
        </View>
        <Button 
          containerStyle={styles.button}
          title="Login" 
          onPress={singIn}
        />

        <Button 
          containerStyle={styles.button}
          title="Register" 
          
          type='outline'
          onPress={() => navigation.navigate('Register')}
        />
        
    </KeyboardAvoidingView>
  )
}
export const styles = StyleSheet.create({
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
    marginTop:10
  }

});