import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem, Text } from '@rneui/base'
import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/chat/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const CustomListItems = () => {

   const {user, logOut} =  useContext(AuthContext)


    const navigation = useNavigation()

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
                                    uri: user!.imageUrl
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
   <ListItem>
        <Avatar
            rounded
            source={{
                uri: 'https://media.licdn.com/dms/image/D4E35AQGw882TWXDbRg/profile-framedphoto-shrink_400_400/0/1700486544823?e=1701147600&v=beta&t=raf3cVUbH4PJEyXQcJx2P_Ed8pWeSZf9vdEyQVTEq9g',
            }}
        />
        
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
               Youtube chat
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                this is test subtitle this is test subtitlethis is test subtitlethis is test subtitlethis is test subtitlethis is test subtitlethis is test subtitle
            </ListItem.Subtitle>
        
        </ListItem.Content>

   </ListItem>
  )
}


const styles = StyleSheet.create({
    
});