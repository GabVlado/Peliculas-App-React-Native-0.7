import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigtaion/Navigation';


export const App = () => {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    )
}


export default App;
