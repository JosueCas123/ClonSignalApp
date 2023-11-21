import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import { HomeScreen } from './src/pages/HomeScreen'
import { StackNavigation } from './src/navigation/StackNavigation';
import { AuthProvider } from './src/context/chat/AuthContext';
import React = require('react');

const AppState = ({children}:any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigation/>
      </AppState>
    </NavigationContainer>
  )
}

export default App