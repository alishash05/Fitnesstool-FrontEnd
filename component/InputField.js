import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

const InputField = ({ placeholder, value, onChangeText, secureTextEntry = false }) => {
  return (
    <TextInput
      style={styles.input}        
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText} 
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#aaa"
    />
  );
};

export default InputField;
