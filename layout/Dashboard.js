import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SubscriptionCountdown from "../component/SubscriptionCountdown";
const members1 = [
  { id: '1', name: 'Hidayat Shaikh', role: 'Expert', avatar: 'https://i.pravatar.cc/150?img=1', feePaid: true, subscriptionDate: '2025-10-15' },
  { id: '2', name: 'Vijay Gawade', role: 'Beginner', avatar: 'https://i.pravatar.cc/150?img=2', feePaid: false, subscriptionDate: '2025-09-30' },
  { id: '3', name: 'Peter Parker', role: 'Doing Good', avatar: 'https://i.pravatar.cc/150?img=3', feePaid: true, subscriptionDate: '2025-10-20' },
  { id: '4', name: 'Raja Loanwala', role: 'NA', avatar: 'https://i.pravatar.cc/150?img=4', feePaid: false, subscriptionDate: '2025-09-10' },
];

export default function MembersDashboard({ navigation }) {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState(members1);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeePaid = (id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, feePaid: !m.feePaid } : m))
    );
  };



 


  const renderMember = ({ item }) => (
    <TouchableOpacity
      style={styles.compactCard}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('MemberProfileScreen', { member: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.compactAvatar} />
      <View style={styles.compactInfo}>
        <Text style={styles.compactName}>{item.name}</Text>
        <Text style={styles.compactRole}>{item.role}</Text>
        {/* 🕒 Countdown */}
      <SubscriptionCountdown 
        subscriptionDate={item.subscriptionDate} 
        active={item.feePaid} 
      />
      </View>
      <TouchableOpacity
        style={[
          styles.statusBadge,
          { backgroundColor: item.feePaid ? '#D1FAE5' : '#FEE2E2' },
        ]}
        onPress={() => toggleFeePaid(item.id)}
      >
        <Ionicons
          name={item.feePaid ? 'checkmark-circle' : 'alert-circle-outline'}
          size={18}
          color={item.feePaid ? '#16A34A' : '#DC2626'}
        />
        <Text
          style={[
            styles.statusText,
            { color: item.feePaid ? '#16A34A' : '#DC2626' },
          ]}
        >
          {item.feePaid ? 'Paid' : 'Unpaid'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>

      {/* 🔍 Search */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#9CA3AF"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or role..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>



      {/* 👥 Member List */}
      <Text style={styles.sectionTitle}>Members</Text>
      <FlatList
        data={filteredMembers}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
     {/* 🧭 Floating Add Button */}
     <TouchableOpacity
     style={styles.fabButton}
     onPress={() => navigation.navigate('AddMemberScreen')}
   >
     <Ionicons name="add" size={30} color="#FFF" />
   </TouchableOpacity>
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  menuButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  addButtonText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#111827' },
  
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 },
  listContainer: { paddingBottom: 80 },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  compactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  compactInfo: { flex: 1 },
  compactName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  compactRole: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
  },
  statusText: { fontSize: 13, fontWeight: '600' },
  fabButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#6366F1',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    zIndex: 100, // ensures it's always above other elements
  },
});
