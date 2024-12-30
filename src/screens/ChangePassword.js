import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Images} from '../assets/images';
import AppHeader from '../components/AppHeader';
// import Icon from 'react-native-vector-icons/Ionicons';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const ChangePasswordScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureEntry1, setSecureEntry1] = useState(true);
  const [secureEntry2, setSecureEntry2] = useState(true);
  const [secureEntry3, setSecureEntry3] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppHeader title={'Change Password'} />
        <ScrollView
          contentContainerStyle={{
            marginTop: (mobileW * 5) / 100,
            paddingHorizontal: (mobileW * 5) / 100,
            paddingBottom: (mobileW * 16) / 100,
          }}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              secureTextEntry={secureEntry1}
              onChangeText={setCurrentPassword}
              placeholderTextColor="#B8B8B8"
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setSecureEntry1(!secureEntry1)}>
              <Image source={Images.EyeIcon} style={styles.eyeIcon} />
              {/* <Icon  openEyeIcons
          name={secureEntry1 ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#B8B8B8"
        /> */}
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              secureTextEntry={secureEntry2}
              onChangeText={setNewPassword}
              placeholderTextColor="#B8B8B8"
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setSecureEntry2(!secureEntry2)}>
              <Image source={Images.EyeIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Re-Enter New Password"
              value={confirmPassword}
              secureTextEntry={secureEntry3}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#B8B8B8"
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setSecureEntry3(!secureEntry3)}>
              <Image source={Images.EyeIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddress')}
            style={styles.selectLocationButton}>
            <Text style={styles.selectionButtonTxt}>Save New Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    color: '#333',
    fontSize: 14,
    backgroundColor: '#fff',
    marginTop: (mobileW * 4) / 100,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 18,
  },
  button: {
    backgroundColor: '#9C27B0',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    backgroundColor: '#ffffff',
    paddingVertical: (mobileW * 8) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  backButton: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
  selectLocationButton: {
    backgroundColor: '#8D10B5',
    width: (mobileW * 90) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: (mobileH * 45) / 100,
  },
  selectionButtonTxt: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  eyeIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    marginTop: (mobileW * 3) / 100,
  },
});

export default ChangePasswordScreen;
