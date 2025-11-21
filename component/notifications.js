// notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    throw new Error('Notification permission not granted');
  }

  // For Expo Push (recommended quick start)
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  // For direct FCM/APNs, use getDevicePushTokenAsync()
  // const token = (await Notifications.getDevicePushTokenAsync()).data;

  // Android channel (required for heads-up)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
  return token;
}