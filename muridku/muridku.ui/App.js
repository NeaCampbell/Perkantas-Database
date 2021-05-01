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
import UserScreen from './screen/UserScreen';
import ViewAllKTBScreen from './screen/ViewAllKTBScreen';
import EditKTBScreen from './screen/EditKTBScreen';
import MenuBurgerScreen from './screen/MenuBurgerScreen';
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
            {/* Edit KTB Screen */}
            <Stack.Screen
              name="EditKTBScreen"
              component={EditKTBScreen}
              // Hiding header for User Screen
              options={{headerShown: false}}
            />
            {/* Menu Burger Screen */}
            <Stack.Screen
              name="MenuBurgerScreen"
              component={MenuBurgerScreen}
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