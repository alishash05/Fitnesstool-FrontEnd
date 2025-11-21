import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  
} from 'react-native';
import InputField from '../component/InputField';
import Button from '../component/Button';
import logoImg from '../assets/logo.png';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    experimental_backgroundImage: "url('light_grey_dots_background.jpg')",
  },
  container: {
  //borderWidth: 1,
  //  borderColor: '#2b6cb0',
    borderRadius: 5,
    padding: 28,
    shadowColor: '#212f3c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 7.08,
    shadowRadius: 24,
    backgroundColor: '#fff', 
    width: '100%',
    maxWidth: 360,
  },
  imgBox: {
    width: 100,
    height: 100,
    //borderWidth: 3,
    //borderColor: '#2b6cb0',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10, // Adds top gap for image
    alignSelf: 'center',
    resizeMode:'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
    color: '#742af9',
  },
  box: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
    color: '#1a202c',
    //backgroundColor:'pink',
  },
  buttonWrapper: {
    marginVertical: 5,
  },
});

const FirstLogin = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async response => {
        if (response.ok) {
          Alert.alert('Login Info', `Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        Alert.alert('Error', 'Please check your network');
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
      <Image
          style={styles.imgBox}
          source={logoImg} 
        />
        <Text style={styles.title} >FIT-NESS-FLOW</Text>
        <Text style={styles.box}>
          The easiest way to start with your amazing application.
        </Text>

        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={()=>navigation.navigate("Login")} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Sign In" onPress={handleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstLogin;
