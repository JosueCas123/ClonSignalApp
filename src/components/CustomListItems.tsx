import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem, Text } from '@rneui/base'
import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types';
import { signalApi } from '../api/singnalApi';

interface Props {
    usuairoList:any
}

export const CustomListItems = ({usuairoList}:Props) => {

    
    const navigation = useNavigation()
    const {user, logOut} =  useContext(AuthContext)
    const {chatState, dispatch} = useContext(ChatContext)
    
    const menssge = chatState.mensajes
    console.log(menssge)
    const {uid}= usuairoList
    // Verificar si usuairoList.imageUrl es una cadena no vacía antes de usarla
  const imageUrl = usuairoList.imageUrl.trim() !== '' ? usuairoList.imageUrl : 'URL_POR_DEFECTO';
 
  const onClick = async() => {
    console.log(uid)
    dispatch({
        type:types.activarChat,
        payload: uid
    })
    //cargar los mensajes
    const resp = await signalApi.get(`/mensaje/${uid}`)
    console.log('RESPUESTA API',resp.data.mensajes)
    dispatch({
        type:types.cargarMensajes,
        payload: resp.data.mensajes
    })
    navigation.navigate('chat', {usuairoList} )
  }

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:'black',
            headerTintColor:"black",
            headerLeft:() => {
                return (
                    <View style={{marginLeft:20}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={logOut}>
                            <Avatar
                                rounded
                                source={{
                                    uri: user?.imageUrl
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                );
            },
            headerRight: () => (
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20
                
                }}>
                    <TouchableOpacity>
                    <Icon
                        name='camera-outline'
                        color='black'
                         size={25}
                     />

                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Icon
                        name='pencil-outline'
                        color='black'
                         size={25}
                     />

                    </TouchableOpacity>
                </View>
            )
        })
    },[])
    return (
        <TouchableOpacity
          onPress={onClick}
          activeOpacity={0.5}
          style={styles.touchable}

        >
          <ListItem>
            <Avatar
              rounded
              source={{
                uri: imageUrl,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: '800' }}>{usuairoList.nombre}</ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                Hola como estas 
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      );
    };
    
    const styles = StyleSheet.create({
      touchable: {
        overflow: 'hidden',
      },
      
    });
    