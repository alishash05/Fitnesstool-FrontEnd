import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SubscriptionCountdown from "../component/SubscriptionCountdown";

export default function MemberProfileScreen({ route, navigation }) {
  const { member } = route.params; //  data from previous screen
  const [fullMember, setFullMember] = useState(null); //  data from backend
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchMemberData();
    generateLastSixMonths();
  }, []);

  // Fetch full member data from backend
  const fetchMemberData = async () => {
    try {
      const response = await fetch(`http://192.168.1.11:8080/api/v1/1/members/${member.id}`);
      const data = await response.json();

      setFullMember({
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        avatar: data.avatar,
        role: data.role,
        membershipType: data.membershipType,
        subscriptionDate: data.subscriptionDate,
        feePaid: data.feePaid,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    } catch (error) {
      console.error('Failed to fetch member:', error);
      Alert.alert('Error', 'Failed to load member data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('AddMemberScreen', { member: fullMember });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Member',
      'Are you sure you want to delete this member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const generateLastSixMonths = () => {
    const today = new Date();
    const months = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const paid = Math.random() > 0.5; // DB data
      months.push({
        id: i.toString(),
        label: `${monthName} ${year}`,
        date: date.toDateString(),
        paid,
      });
    }
    setHistory(months);
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyInfo}>
        <Text style={styles.monthLabel}>{item.label}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: item.paid ? '#DCFCE7' : '#FEE2E2' },
        ]}
      >
        <Ionicons
          name={item.paid ? 'checkmark-circle' : 'alert-circle-outline'}
          size={18}
          color={item.paid ? '#16A34A' : '#DC2626'}
        />
        <Text
          style={[
            styles.statusText,
            { color: item.paid ? '#16A34A' : '#DC2626' },
          ]}
        >
          {item.paid ? 'Paid' : 'Unpaid'}
        </Text>
      </View>
    </View>
  );

  if (loading || !fullMember) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#6366F1', '#818CF8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("AppNavigator")} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: fullMember.avatar || 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{fullMember.name}</Text>
        <Text style={styles.role}>{fullMember.role}</Text>
        <SubscriptionCountdown 
          subscriptionDate={fullMember.subscriptionDate} 
          active={fullMember.feePaid} 
        />
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={22} color="#6366F1" />
          <Text style={styles.infoText}>{fullMember.mobile}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome name="envelope" size={22} color="#6366F1" />
          <Text style={styles.infoText}>{fullMember.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome name="id-badge" size={22} color="#6366F1" />
          <Text style={styles.infoText}>{fullMember.membershipType}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={22} color="#6366F1" />
          <Text style={styles.infoText}>Start: {fullMember.startDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={22} color="#6366F1" />
          <Text style={styles.infoText}>End: {fullMember.endDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome name="money" size={22} color={fullMember.feePaid ? '#16A34A' : '#EF4444'} />
          <Text style={[styles.infoText, { color: fullMember.feePaid ? '#16A34A' : '#EF4444' }]}>
            {fullMember.feePaid ? 'Fee Paid' : 'Fee Pending'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <Text style={styles.actionText}>Edit Member</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' }]} onPress={handleDelete}>
          <Text style={styles.actionText}>Delete Member</Text>
        </TouchableOpacity>
      </View>

      {/* History List */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Last 6 Months History</Text>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { height: 140, paddingHorizontal: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { marginRight: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  avatarContainer: { alignItems: 'center', marginTop: -50 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#fff', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: '700', color: '#111827' },
  role: { fontSize: 16, color: '#6366F1', marginTop: 2 },
  infoCard: { backgroundColor: '#fff', margin: 20, borderRadius: 15, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  infoText: { fontSize: 17, marginLeft: 12, color: '#374151', fontWeight: '500' },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  actionButton: { backgroundColor: '#6366F1', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, shadowColor: '#6366F1', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4 },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  historyContainer: { backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  historyItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  historyInfo: {},
  monthLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
  dateText: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10, gap: 5 },
  statusText: { fontSize: 13, fontWeight: '600' },
});
