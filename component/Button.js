import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#742af9',
    paddingVertical: 10,
    paddingHorizontal: 16,     
    borderRadius: 2,
    alignItems: 'center',
    alignSelf: 'center',      
    marginTop: 10,
    width: '98%',    
    shadowOpacity: 7.08,          
  },
  
  
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Button;
