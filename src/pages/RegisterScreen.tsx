import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Text } from '@rneui/base'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({navigation}:Props) => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [imageURL, setImageURL] = useState('')

   useLayoutEffect(()=> {
    navigation.setOptions({
        headerBackTitle:'asdsad'
    })
   },[navigation])

   const register = () => {

   }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text h3 style={{marginBottom:50}} > 
            Create a Singnal account
        </Text>
        <View style={styles.inputContainer}>
        <Input
            placeholder="full name"
            autoFocus 
            keyboardType='default'
            value={name}
            onChangeText={text => setName(text)}
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
            value={imageURL}
            onChangeText={text => setImageURL(text)}
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