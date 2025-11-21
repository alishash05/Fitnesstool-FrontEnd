import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or react-native-vector-icons/Ionicons

export default function ConfirmationScreen({ 
  navigation,
  route 
}) {
  // Expect route.params with { title, message, onConfirmText, onConfirmAction }
  const {
    title = 'Success!',
    message = 'Operation completed successfully.',
    onConfirmText = 'OK',
    onConfirmAction,
  } = route.params || {};

  const handleConfirm = () => {
    if (onConfirmAction && typeof onConfirmAction === 'function') {
      onConfirmAction();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={100} color="#22C55E" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirm} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{onConfirmText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },
});
