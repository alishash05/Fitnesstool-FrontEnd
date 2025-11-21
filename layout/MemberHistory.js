// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { getMemberById, getMemberHistory } from '../serviceSlice/memberService';


// export default function MemberHistoryScreen({ route, navigation }) {
//   const { gymId, memberId } = route.params;
//   const [member, setMember] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMemberData();
//   }, []);

//   const fetchMemberData = async () => {
//     try {
//       const memberData = await getMemberById(gymId, memberId);
//       setMember(memberData);

//       // Fetch history from backend
//       const historyData = await getMemberHistory(gymId, memberId);
//       setHistory(historyData);
//     } catch (error) {
//       console.log('Failed to fetch member data', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.historyItem}>
//       <View style={styles.historyInfo}>
//         <Text style={styles.monthLabel}>{item.month} {item.year}</Text>
//         <Text style={styles.dateText}>{item.date || ''}</Text>
//       </View>

//       <View
//         style={[
//           styles.statusBadge,
//           { backgroundColor: item.paid ? '#DCFCE7' : '#FEE2E2' },
//         ]}
//       >
//         <Ionicons
//           name={item.paid ? 'checkmark-circle' : 'alert-circle-outline'}
//           size={18}
//           color={item.paid ? '#16A34A' : '#DC2626'}
//         />
//         <Text
//           style={[
//             styles.statusText,
//             { color: item.paid ? '#16A34A' : '#DC2626' },
//           ]}
//         >
//           {item.paid ? 'Paid' : 'Unpaid'}
//         </Text>
//       </View>
//     </View>
//   );

//   if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
//   if (!member) return <Text style={styles.loadingText}>Member not found</Text>;

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={28} color="#fff" />
//       </TouchableOpacity>

//       <View style={styles.memberHeader}>
//         <Image
//           source={{ uri: member.avatar || 'https://via.placeholder.com/100' }}
//           style={styles.avatar}
//         />
//         <Text style={styles.name}>{member.name}</Text>
//         <Text style={styles.role}>{member.membershipType}</Text>
//       </View>

//       <View style={styles.historyContainer}>
//         <Text style={styles.sectionTitle}>Last 6 Months History</Text>
//         <FlatList
//           data={history}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 10,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     padding: 6,
//     borderRadius: 20,
//   },
//   memberHeader: { alignItems: 'center', marginBottom: 20 },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#E5E7EB',
//     marginBottom: 10,
//   },
//   name: { fontSize: 22, fontWeight: '700', color: '#111827' },
//   role: { fontSize: 15, color: '#6B7280' },
//   historyContainer: {
//     backgroundColor: '#FFF',
//     marginHorizontal: 20,
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   historyItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   historyInfo: {},
//   monthLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
//   dateText: { fontSize: 13, color: '#6B7280', marginTop: 2 },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 20,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     gap: 5,
//   },
//   statusText: { fontSize: 13, fontWeight: '600' },
//   loadingText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MemberHistoryScreen({ route, navigation }) {
  

 
  const { member } = route.params
  const [history, setHistory] = useState([]);

  useEffect(() => {
    generateLastSixMonths();
  }, []);

  const generateLastSixMonths = () => {
    const today = new Date();
    const months = [];

    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();

      // ⚡ You can replace this with actual DB data later
      const paid = Math.random() > 0.5;

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

  return (
    <ScrollView style={styles.container}>
    {/* 🔙 Back Button */}
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={28} color="#fff" />
    </TouchableOpacity>
    <View style={styles.container}>
      {/* 🧍‍♂️ Member Header */}
      <View style={styles.memberHeader}>
        <Image source={{ uri: member.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.role}</Text>
      </View>

      {/* 📅 History List */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Last 6 Months History</Text>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
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
  memberHeader: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  name: { fontSize: 22, fontWeight: '700', color: '#111827' },
  role: { fontSize: 15, color: '#6B7280' },
  historyContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  historyInfo: {},
  monthLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
  dateText: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 5,
  },
  statusText: { fontSize: 13, fontWeight: '600' },
});