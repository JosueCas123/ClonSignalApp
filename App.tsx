import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import { HomeScreen } from './src/pages/HomeScreen'
import { StackNavigation } from './src/navigation/StackNavigation';
import { AuthProvider } from './src/context/auth/AuthContext';
import React = require('react');
import { SocketProvider } from './src/context/SocketContext';
import { ChatProvider } from './src/context/chat/ChatContext';

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
          <ChatProvider>
            <SocketProvider>
              <StackNavigation/>
            </SocketProvider>
          </ChatProvider>
        </AppState>
    </NavigationContainer>
  )
}

export default App