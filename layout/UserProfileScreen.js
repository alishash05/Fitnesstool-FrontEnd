import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function UserProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* 🖼 Cover Banner */}
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=800&q=80' }}
          style={styles.bannerImage}
        />
      </View>

      {/* 👤 Profile Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
          style={styles.avatar}
        />
      </View>

      {/* 📝 User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Administrator</Text>

        <View style={styles.contactInfo}>
          <Ionicons name="mail-outline" size={18} color="#6B7280" />
          <Text style={styles.contactText}>john.doe@example.com</Text>
        </View>

        <View style={styles.contactInfo}>
          <Ionicons name="call-outline" size={18} color="#6B7280" />
          <Text style={styles.contactText}>+1 234 567 890</Text>
        </View>

        {/* ✏️ Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* 📊 Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Payments</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
  banner: {
    height: 180,
    backgroundColor: '#6366F1',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 6,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginTop: 16,
    gap: 6,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
