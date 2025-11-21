import React, { useEffect, useState, useRef  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store';
import Login from './layout/Login';
import FirstLogin from './layout/FirstLogin';
import ConfirmationScreen from './layout/Confirmation';
import AppNavigator from './layout/AppNavigator';
import MemberProfileScreen from './layout/MemberProfileScreen';
import AddMemberScreen from './layout/Addmember';
import { deleteMember } from "./redux/serviceSlice/memberService";
import UserProfileScreen from './layout/UserProfileScreen';
// import { registerForPushNotificationsAsync } from "./component/notifications";
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
const Stack = createNativeStackNavigator();

// 👇 SHOW alerts while app is foregrounded (otherwise they’re silent)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // <-- important
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



// Create Android channel once (for heads-up banners)
async function ensureAndroidChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

// Ask permission + get Expo push token (for remote pushes)
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    throw new Error('Notification permission not granted');
  }

  await ensureAndroidChannel();

  // If your project is linked to Expo (EAS), this returns a usable token on real devices
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const App = () => {

 
  const [initialRoute, setInitialRoute] = useState(null); // null until we load
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Ask permission + log Expo Push Token (on real device)
    registerForPushNotificationsAsync()
      .then(t => console.log('Expo push token:', t))
      .catch(console.error);

    // Foreground received
    const sub1 = Notifications.addNotificationReceivedListener(n => {
      console.log('received (foreground):', n);
    });

    // User tapped a notification
    const sub2 = Notifications.addNotificationResponseReceivedListener(r => {
      console.log('response (tap):', r);
      // TODO: read r.notification.request.content.data and navigate if needed
    });

    return () => { sub1.remove(); sub2.remove(); };
  }, []);




  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // For testing, force a value once (you can remove this)
        
        await AsyncStorage.setItem('isLoggedIn', 'true');

        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('isLoggedIn:', isLoggedIn);
        if (isLoggedIn === 'true') {
          setInitialRoute('AppNavigator');
        } else {
          setInitialRoute('FirstLogin');
        }
      } catch (error) {
        console.log('Error checking login status:', error);
        setInitialRoute('FirstLogin');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();

    // 🔔 Local notification test (works in emulator + device)
    (async () => {
      await ensureAndroidChannel();
      // small delay avoids swallow-on-mount on some Android devices
      setInterval(() => {
        Notifications.scheduleNotificationAsync({
          content: { title: '25 member fee are pendding..', body: 'please click here.' },
          trigger: null, // fire immediately
        });
      }, 50000);
    })();
  
  }, []);

  


  if (loading || initialRoute === null) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="FirstLogin" component={FirstLogin} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="AppNavigator"
            component={AppNavigator}
            options={{
              headerShown: false,
              title: 'Back',
            }}
            
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{ headerShown: false }} // ✅ new profile screen
          />
           <Stack.Screen
            name="AddMemberScreen"
            component={AddMemberScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MemberProfileScreen"
            component={MemberProfileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
     
    </Provider>
  );
};

export default App;
