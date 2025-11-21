import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { sendOtpAPI, verifyOtpAPI, resetOtpState } from "../redux/serviceSlice/otpSlice";
import { loginUserAPI } from '../redux/serviceSlice/authSlice';

export default function OTPLogin() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  //Login with  email & password
  // Toggle between Email login and OTP login
    
  const [useOtp, setUseOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 // const [loading, setLoading] = useState(false);
  
  const { otpSent, verified,  error } = useSelector((state) => state.otp);

  const { loading, token,error: authError } = useSelector( (state) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
    if (verified) { 
      //using password email 
      AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate("AppNavigator");
      
      // Alert.alert('Success', 'Phone number verified!', [
      //   { text: 'OK', onPress: () => setTimeout(() => navigation.replace('MembersDashboard'), 300) },
      // ]);
     
    }
  }, [error, verified]);

  useEffect(() => {
    const handleLogin = async () => {
    if (authError){ 
      Alert.alert('Error',authError);
    }
    if (token) {
      AsyncStorage.setItem('isLoggedIn', 'true');
           navigation.replace('AppNavigator');
    }
  } ;
  handleLogin();
 }, [authError, token]);

   // Email/Password Login 
   const loginWithEmail = async () => {
    console.log('Email:',email);
    console.log('Password:',password);
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    dispatch(loginUserAPI({ email, password}));

  };


  // Simulate sending OTP
  const sendOtp = () => {
    if (!phoneNumber.match(/^\+?\d{10,15}$/)) {
      Alert.alert('Invalid phone number', 'Please enter a valid phone number with country code');
      return;
    }
     dispatch(sendOtpAPI(phoneNumber));
     
  };

  // Simulate verifying OTP
  const verifyOtp = () => {
    if (otpCode.length !== 6) {
      Alert.alert('Invalid OTP', 'OTP should be 6 digits');
      return;
    }
    dispatch(verifyOtpAPI({ phoneNumber, otpCode }));
    AsyncStorage.setItem('isLoggedIn', 'true');
   // navigation.navigate("AppNavigator");
  };

  return (
    <View style={styles.container}>
       {/* <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => setUseOtp(!useOtp)}
      >
        <Text style={{ color: '#6366F1', textAlign: 'center' }}>
          {useOtp ? 'Use Email/password Login' : 'Use OTP Login'}
        </Text>
      </TouchableOpacity> */}

      {!useOtp ? (
        // -------- Email/Password Login Form --------
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={loginWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        // -------- OTP Login Form --------
        <>
      {!otpSent ? (
        <>
          <Text style={styles.label}>Enter Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+12345678901"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={sendOtp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            keyboardType="number-pad"
            value={otpCode}
            onChangeText={setOtpCode}
            maxLength={6}
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={verifyOtp}
            disabled={loading}
          
          >
            <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   setOtpSent(false);
            //   setOtpCode('');
            //   setPhoneNumber('');
            // }}

            onPress={() => {
              setPhoneNumber('');
              setOtpCode('');
              dispatch(resetOtpState());
            }}
            // onPress={()=>{




            //   AsyncStorage.setItem({isLoggedIn:true})
            //   navigation.navigate("MembersDashboard")}}
            style={{ marginTop: 15 }}
          >
            <Text style={{ color: '#6366F1', textAlign: 'center' }}>Change Number</Text>
          </TouchableOpacity>
        </>
      )}
  </>
      )}
</View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#F9FAFB',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
