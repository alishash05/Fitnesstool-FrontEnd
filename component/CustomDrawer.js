import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawer({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=10' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Admin</Text>
      </View>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('AddMemberScreen')}
      >
        <Ionicons name="person-add-outline" size={20} color="#374151" />
        <Text style={styles.itemText}>Add Member</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
       // onPress={() => navigation.navigate('MembersDashboard')}
      >
        <Ionicons name="home-outline" size={20} color="#374151" />
        <Text style={styles.itemText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => alert('Logging out...')}
      >
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={[styles.itemText, { color: '#DC2626' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '700', color: '#111827' },
  role: { color: '#6B7280', fontSize: 14 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  itemText: { fontSize: 16, color: '#111827', fontWeight: '500' },
});
