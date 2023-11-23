
import React = require('react')
import { ScrollView, StatusBar, Text, View } from 'react-native'
import { CustomListItems } from '../components/CustomListItems'
import { ChatContext } from '../context/chat/ChatContext'
import {useContext} from 'react';
import { AuthContext } from '../context/auth/AuthContext';

export const HomeScreen = () => {
  
  const {chatState} = useContext(ChatContext);
  const {user} = useContext(AuthContext)

  

  return (
    <View>
      <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
       <ScrollView>
        {

          chatState.usuarios
            .filter((usuario:any) => usuario.uid !== user?.uid )
            .map((usuario:any)=>(
                <CustomListItems key={usuario.uid} usuairoList={usuario} />
            ))
            
        }
       
            
     
        
       </ScrollView>
    </View>
  )
}
