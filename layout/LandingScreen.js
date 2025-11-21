import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons'; // ✅ Expo users use this


const members1 = [
  { id: '1', name: 'Hidayat Shaih', role: 'Expert', avatar: 'https://i.pravatar.cc/150?img=1', feePaid: true },
  { id: '2', name: 'David Smith', role: 'Beginer', avatar: 'https://i.pravatar.cc/150?img=2', feePaid: false },
  { id: '3', name: 'Sophia Brown', role: 'Doing Good', avatar: 'https://i.pravatar.cc/150?img=3', feePaid: true },
  { id: '4', name: 'Michael Lee', role: 'NA', avatar: 'https://i.pravatar.cc/150?img=4', feePaid: false },
];

export default function LandingScreen({navigation}) {
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

  const roleCounts = members.reduce((acc, member) => {
    acc[member.feePaid] = (acc[member.feePaid] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(roleCounts).map((feePaid, index) => ({
    name: feePaid,
    population: roleCounts[feePaid],
    color: ['#6366F1', '#22C55E', '#F59E0B', '#EF4444'][index % 4],
    legendFontColor: '#333',
    legendFontSize: 13,
  }));

  const screenWidth = Dimensions.get('window').width;
  const renderMember = ({ item }) => (
    <TouchableOpacity style={styles.compactCard} activeOpacity={0.85}  >
      {/* Avatar */}
      <TouchableOpacity style={styles.compactAvatar} onPress={() => navigation.navigate('MemberHistoryScreen', { member: item })}>
      <Image source={{ uri: item.avatar }} style={styles.compactAvatar}   />
      </TouchableOpacity>
      {/* Info */}
      <View style={styles.compactInfo}>
        <Text style={styles.compactName}>{item.name}</Text>
        <Text style={styles.compactRole}>{item.role}</Text>
      </View>
   
      {/* Fee Status */}
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
    <ScrollView style={styles.container}>
      {/* 🧭 Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()} // ✅ opens right-side drawer
        >
          <Ionicons name="menu-outline" size={28} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Team Dashboard</Text>
        <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("AddMemberScreen")}>
          <Ionicons name="person-add-outline" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* 🔍 Search */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or role..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.chartCard}>
  <Text style={styles.chartTitle}>Fee Payment Status</Text>
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <PieChart
      data={chartData}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: () => '#111827',
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      center={[10, 0]}
      hasLegend={true}
      absolute
    />
    {/* 🕳 Create Donut Center */}
    <View
      style={{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>
        {members.filter((m) => m.feePaid).length}/{members.length}
      </Text>
      <Text style={{ fontSize: 12, color: '#6B7280' }}>Paid</Text>
    </View>
  </View>
</View>

      {/* 👥 Member List */}
      <Text style={styles.sectionTitle}>Team Members</Text>
      <FlatList
        data={filteredMembers}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  // Header
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
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

  // Search
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },

  // Chart Card
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: { fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 8 },

  // Section Title
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 },

  // Member Cards
  listContainer: { paddingBottom: 80 },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginRight: 14,
  },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 17, fontWeight: '700', color: '#111827' },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },
  roleText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },

  // Fee Button
  feeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  paidButton: {
    backgroundColor: '#22C55E',
  },
  unpaidButton: {
    backgroundColor: '#EF4444',
  },
  feeText: { color: '#FFF', fontWeight: '600', fontSize: 13, marginLeft: 4 },

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
  
  compactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  
  compactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  
  compactRole: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
  },
  
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  
});
