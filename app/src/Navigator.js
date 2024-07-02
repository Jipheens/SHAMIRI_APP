import React , { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Register from './screens/Register';
import OTP from './screens/OTP';
import Home from './screens/home/Home';
import Cart from './screens/Cart';
import Orders from './screens/Orders';
import Account from './screens/account/Account';
import Notifications from './screens/notification/Notifications';

import { AuthContext } from './AuthContext';

const Stack = createStackNavigator();

const Navigator = () => {
  const { user, login } = useContext(AuthContext);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 2000);
  }, []);

  if (isSplashScreenVisible) {
    return <SplashScreen />;
  } else {
    return (
      <AuthContext.Provider value={{ user, login }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, 
            }}
          >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Notifications" component={Notifications} />


          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

export default Navigator;