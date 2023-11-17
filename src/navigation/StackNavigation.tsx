import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreeen } from '../pages/LoginScreeen';
import { RegisterScreen } from '../pages/RegisterScreen';

const Stack = createStackNavigator();

const  globalScreenOption = {
  headerStyle:{backgroundColor:'#2c6bed',},
  headerTitleStyle:{color:'white'},
  headerTintColor:'white',
  statusBar:{backgroundColor:'#2c6bed'},
  headerTitleAlign: 'center' as any,
}
 
export const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={globalScreenOption}>
      <Stack.Screen name="Login" component={LoginScreeen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}