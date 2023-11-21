import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreeen } from '../pages/LoginScreeen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { AuthContext } from '../context/chat/AuthContext';
import { HomeScreen } from '../pages/HomeScreen';

const Stack = createStackNavigator();

const  globalScreenOption = {
  headerStyle:{backgroundColor:'#2c6bed',},
  headerTitleStyle:{color:'white'},
  headerTintColor:'white',
  statusBar:{backgroundColor:'#2c6bed'},
  headerTitleAlign: 'center' as any,
}
 
export const StackNavigation = () => {

  const {status} = useContext(AuthContext)
  return (
    <Stack.Navigator screenOptions={globalScreenOption}>

      {
        
        (status !== 'authenticated')
          ? 
          <>
            <Stack.Screen name="Login" component={LoginScreeen} />
            <Stack.Screen name="Register" component={RegisterScreen} /> 
          </>
          : <Stack.Screen name="home" component={HomeScreen} />

      }
   
    </Stack.Navigator>
  );
}