import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { File, Paths } from 'expo-file-system';


// Import API
import { createMember, updateMember } from "../redux/serviceSlice/memberService";

export default function AddMemberScreen({ route, navigation }) {
  const editingMember = route.params?.member; // if member exists, we are editing

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setRole(editingMember.role);
      setAvatar(editingMember.avatar);
      setFeePaid(editingMember.feePaid);
      setMobile(editingMember.mobile);
    }
  }, [editingMember]);

  // Request camera permissions on mount
  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setEmail(editingMember.email);
      setPhone(editingMember.phone);
      setMembershipType(editingMember.membershipType);
      setStartDate(editingMember.startDate || '');
      setEndDate(editingMember.endDate || '');
    }
  }, [editingMember]);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Validation Error', 'Please fill in Name and Phone.');
      return;
    }

    const memberData = {
      name,
      email,
      phone,
      membershipType,
      startDate: startDate || null,
      endDate: endDate || null,
    };

    try {
      if (editingMember) {
        await updateMember(3, editingMember.id, memberData);
        Alert.alert("Success", "Member updated!");
      } else {
        await createMember(3, memberData);
        Alert.alert("Success", "Member created!");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to save member.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    {/* 🔙 Back Button */}
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>


      <Text style={styles.title}>{editingMember ? 'Edit Member' : 'Add New Member'}</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter member's name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Role</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter role (e.g. Expert)"
        value={role}
        onChangeText={setRole}
      />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        maxLength={15}
      />

      <Text style={styles.label}>Avatar</Text>
      <View style={styles.avatarPickerRow}>
      {avatar ? (
        <Image
  source={{ uri: avatar }}
  style={{ width: 72, height: 72, borderRadius: 36 }}
/>
) : (
  <View style={styles.avatarPlaceholder}>
    <Text style={{ color: '#9CA3AF' }}>No photo</Text>
  </View>
)}
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera} activeOpacity={0.7}>
  <Text style={styles.cameraButtonText}>Take Photo</Text>
</TouchableOpacity>
      </View>

      <View style={styles.feePaidRow}>
        <Text style={styles.label}>Fee Paid</Text>
        <Switch
          value={feePaid}
          onValueChange={setFeePaid}
          trackColor={{ false: '#ccc', true: '#22C55E' }}
          thumbColor={feePaid ? '#16A34A' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
        <Text style={styles.submitButtonText}>
          {editingMember ? 'Update Member' : 'Add Member'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F9FAFB', flexGrow: 1 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, color: '#111827', textAlign: 'center' },
  label: { fontSize: 15, color: '#374151', marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 18,
  },
  avatarPickerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  avatarPreview: { width: 72, height: 72, borderRadius: 36, marginRight: 14 },
  avatarPlaceholder: { width: 72, height: 72, borderRadius: 36, marginRight: 14, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  cameraButton: { backgroundColor: '#6366F1', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, shadowColor: '#6366F1', shadowOpacity: 0.4, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 5 },
  cameraButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  feePaidRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  submitButton: { backgroundColor: '#6366F1', paddingVertical: 14, borderRadius: 12, alignItems: 'center', shadowColor: '#6366F1', shadowOpacity: 0.5, shadowOffset: { width: 0, height: 6 }, shadowRadius: 10, elevation: 6 },
  submitButtonText: { color: '#FFF', fontWeight: '700', fontSize: 18 },
});
