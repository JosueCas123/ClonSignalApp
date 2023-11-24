import { StackScreenProps } from '@react-navigation/stack';
import { Avatar } from '@rneui/base';

import React, { useContext, useLayoutEffect, useState } from 'react';

import { View, Text, StatusBar, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { text } from 'stream/consumers';
import { SocketContext } from '../context/SocketContext';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../context/auth/AuthContext';
import { ResiverMessage } from '../components/ResiverMessage';
import { SendMessage } from '../components/SendMessage';

interface Props extends StackScreenProps<any, any>{}

export const ChatScreen = ({navigation, route}:Props) => {

  const [input, setImput] = useState('')
  const {socket} = useContext(SocketContext)
  const {chatState} = useContext(ChatContext)
  const {user} = useContext(AuthContext)

  const mensaje = chatState.mensajes
  const userState = chatState.usuarios



  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign:'left',
      headerTitle:() => (
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Avatar
            rounded
            source={{
              uri:route.params?.usuairoList.imageUrl
            }}
          />
          <View>
            <Text style={{color:'white', marginLeft:10, fontWeight:'700'}}>{route.params?.usuairoList.nombre}</Text>

            <Text style={{marginLeft:10}} >
              {
                (userState[0].online )
                  ? <Text style={{fontSize:12, color:'white', }}>Ultima vez hace 1 hora</Text>
                  : <Text style={{fontSize:12, color:'white', }}>En linea</Text>
              }
:             
            </Text>
          </View>
        </View>
      ),
     headerRight:() => (
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        width:80,
        marginRight:20,
        backgroundColor:'#2c6bed'
      }}>
        <TouchableOpacity style={{}}>
          <Icon
            name='videocam-outline'
            color='white'
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name='call-outline'
            color='white'
            size={25}
          />
        </TouchableOpacity>
      </View>
     )
    })
  },[])

  const sendMessage = () => {
    console.log('mensaje enviado')
    if(input.trim().length === 0) return

    socket.emit('message-personal',{
      de:user?.uid,
      para:chatState.chatActivo,
      mensaje:input 
    })

    Keyboard.dismiss()
    setImput('')
  }

  return (
    <View style={{
      flex:1, backgroundColor:"white"
    }}>
       <StatusBar backgroundColor='#2c6bed' barStyle='light-content'/>
       <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex:1}}
          keyboardVerticalOffset={90}   
        >
          <>
          {/* <TouchableWithoutFeedback></TouchableWithoutFeedback> */}
            <ScrollView contentContainerStyle={{paddingTop:15}}>{/* chat goes here */}
              { 
                  mensaje.map((msg:any) => (
                    (msg.para === user?.uid)
                    ? <SendMessage key={msg._id} msg={msg}  />
                    : <ResiverMessage key={msg._id} msg={msg} />
                      
                  ))
              }
            </ScrollView>
            <View style={styles.footer}>
              <TextInput 
                 placeholder='Signal Message'
                 placeholderTextColor='black'
                 value={input}
                 onChangeText={text => setImput(text)} 
                 style={styles.textImput}
                 onSubmitEditing={sendMessage}
               />
               <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}
               >
                <Icon
                  name='send'
                  color='#2b68e6'
                  size={25}
                />
               </TouchableOpacity>
            </View>
          </>
       </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
      container:{
        flex:1
      },
      footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,
        marginBottom:10
      },
      textImput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#ECECEC',
        borderWidth:1,
        padding:10,
        color:'grey',
        borderRadius:30
      }
});