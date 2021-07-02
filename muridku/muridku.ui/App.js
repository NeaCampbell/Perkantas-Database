/* eslint-disable prettier/prettier */
//https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Reducers dependencies
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/ReduxContainer';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './screen/SplashScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ActivationScreen from './screen/ActivationScreen';
import UserScreen from './screen/UserScreen';
import ViewAllKTBScreen from './screen/ViewAllKTBScreen';
import AddKTBHistoryScreen from './screen/AddKTBHistoryScreen';
import ViewDataKTBScreen from './screen/ViewDataKTBScreen';
import EntryDataAKKScreen from './screen/EntryDataAKKScreen';
import UpdateDataUserScreen from './screen/UpdateDataUserScreen';
import EntryDataUserScreen from './screen/EntryDataUserScreen';
import UpdatePasswordScreen from './screen/UpdatePasswordScreen';
// import DrawerNavigationRoutes from './screen/DrawerNavigationRoutes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen to wait for loading app data */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{headerShown: false}}
            />
            {/* Login Screen */}
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              // Hiding header for Login Screen
              options={{headerShown: false}}
            />
            {/* Register Screen */}
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              // Hiding header for Register Screen
              options={{headerShown: false}}
            />
            {/* Acttivation Screen */}
            <Stack.Screen
              name="ActivationScreen"
              component={ActivationScreen}
              // Hiding header for Login Screen
              options={{headerShown: false}}
            />
            {/* User Screen */}
            <Stack.Screen
              name="UserScreen"
              component={UserScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* View All KTB Screen */}
            <Stack.Screen
              name="ViewAllKTBScreen"
              component={ViewAllKTBScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* View Data KTB Screen */}
            <Stack.Screen
              name="ViewDataKTBScreen"
              component={ViewDataKTBScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* Entry Data AKK Screen */}
            <Stack.Screen
              name="EntryDataAKKScreen"
              component={EntryDataAKKScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* Menu Add KTB History Screen */}
            <Stack.Screen
              name="AddKTBHistoryScreen"
              component={AddKTBHistoryScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* Entry Data User Screen */}
            <Stack.Screen
              name="UpdateDataUserScreen"
              component={UpdateDataUserScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* Entry Data User Screen */}
            <Stack.Screen
              name="EntryDataUserScreen"
              component={EntryDataUserScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* Update Password Screen */}
            <Stack.Screen
              name="UpdatePasswordScreen"
              component={UpdatePasswordScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
