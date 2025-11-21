import React, { useEffect, useState, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Your Screens
import MembersDashboard from './Dashboard';
import MemberHistoryScreen from './MemberHistory';
import AddMemberScreen from './Addmember';
import LandingScreen from './LandingScreen';
import UserProfileScreen from './UserProfileScreen';
import Profile from '../component/Profile';

const Drawer = createDrawerNavigator();



export default function AppNavigator() {
  const navigation = useNavigation();


  // 🔙 Back Button
  const BackButton = () => (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="MembersDashboard"
        screenOptions={{
          headerShown: true,
          drawerPosition: 'left',
          drawerType: 'slide',
          overlayColor: 'rgba(0,0,0,0.3)',
          drawerStyle: {
            backgroundColor: '#FFF',
            width: 250,
          },
        }}
      >
        <Drawer.Screen
          name="MembersDashboard"
          component={MembersDashboard}
          options={{
            title: 'Home',
            headerRight: () => (
              <Profile
                title="Try Again"
                toNav="UserProfileScreen"
                img="https://i.pravatar.cc/150?img=8"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Dashboard"
          component={LandingScreen}
          options={{ title: 'Dashboard' }}
        />
        <Drawer.Screen
          name="AddMemberScreen"
          component={AddMemberScreen}
          options={{
            title: 'Add Member',
            headerRight: () => (
              <Profile
                title="Try Again"
                toNav="UserProfileScreen"
                img="https://i.pravatar.cc/150?img=8"
              />
            ),
          }}
        />

      <Drawer.Screen
          name="Logout"
          component={"LogOut"}
          options={{ title: 'Logout' }}
        />


      </Drawer.Navigator>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    
  },
});
