import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ toNav, img}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
              onPress={() => navigation.navigate(toNav)}
              style={{ marginRight: 15 }}
            >
              <Image
                source={{ uri: img }} // user's avatar {{img}}
                style={styles.profile}
              />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
profile:{
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ccc',
},
text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
