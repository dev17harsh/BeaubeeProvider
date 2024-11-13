import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, CheckBox, Alert, ImageBackground, FlatList, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';
import { Images } from '../assets/images';
import InputField from '../components/InputField';

const SignUpScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleSignUp = () => {
    // if (!isChecked) {
    //   Alert.alert('Please accept Terms and Conditions');
    //   return;
    // }
    navigation.navigate('AddProfilePictureScreen')
    // Alert.alert('SignUp Successful');
  };

  const items = [
    { label: 'Type 1', value: 'Type 1' },
    { label: 'Type 2', value: 'Type 2' },
    { label: 'Type 3', value: 'Type 3' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={Images?.ScreenBackground} style={styles.ImageView} />
      <View style={{
        flex: 1,
        position: 'absolute',
      }}>
        <View style={{
          height: DimensionsConfig.screenHeight * 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center'
        }}>
          <Image source={Images.logoWhite} style={styles.logo} />
        </View>
        <View style={[styles.formContainer, { flex: 1 }]}>
          <ScrollView
          nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingHorizontal: 25,
              paddingBottom: DimensionsConfig.screenHeight * 0.1,
            }}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.dropDowncontainer} >
              <Text style={styles.dropDownlabel}>Select Type</Text>
              <TouchableOpacity onPress={() => setDropdownOpen(!isDropdownOpen)}>
                <Image source={Images?.DownArrowIcon} style={[styles?.dropIcon]} />
              </TouchableOpacity>

            </View>

            {isDropdownOpen && (
              <View style={styles.optionsContainer}>
                <FlatList
                  data={items}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />
            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Password"
              isPassword={true}
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles?.spacingBtwInput} />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => {
                setChecked(!isChecked)
              }}>
                <Image source={isChecked ? Images?.Checked : Images?.Unchecked} style={styles?.checkedStyl} />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>I agree to <Text style={styles.link}>Terms and Conditions</Text></Text>
            </View>

            <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or</Text>

            <TouchableOpacity style={styles.googleButton}>
              <Image source={Images?.GoogleIcon} style={styles.googlelogo} />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageView: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    position: 'relative',
    top: -DimensionsConfig.screenHeight * 0.12
  },
  backgroundImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: DimensionsConfig.logoWidth,
    height: DimensionsConfig.logoHeight,
    resizeMode: 'contain',
    // marginBottom: 20,
  },
  formContainer: {
    backgroundColor: Colors.white,
    width: DimensionsConfig.screenWidth,
    height: DimensionsConfig.screenHeight * 0.82,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  spacingBtwInput: {
    marginVertical: DimensionsConfig?.screenHeight * 0.012
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: Colors.DarkPurple,
  },
  inputContainer: {
    backgroundColor: Colors.inputBackground,
    height: DimensionsConfig.inputHeight,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: Colors.gray,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    height: DimensionsConfig.inputHeight,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  checkboxText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 10,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600'
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    height: DimensionsConfig.buttonHeight,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: Colors.gray,
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray,
    height: DimensionsConfig.buttonHeight,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  googlelogo: {
    height: DimensionsConfig.screenHeight * 0.035,
    width: DimensionsConfig.screenHeight * 0.035,
    resizeMode: 'contain',
  },
  checkedStyl: {
    height: DimensionsConfig.screenHeight * 0.025,
    width: DimensionsConfig.screenHeight * 0.025,
    resizeMode: 'contain',
  },
  googleButtonText: {
    color: Colors.gray,
    fontSize: 16,
    marginLeft: 10,
  },
  loginText: {
    marginTop: 25,
    color: Colors.gray,
  },
  dropDowncontainer: {
    height: DimensionsConfig.inputHeight,
    width: DimensionsConfig.inputWidth,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Make space for the eye icon
  },
  dropDownlabel: {
    color: Colors.gray,
    fontSize: 14,
    // marginBottom: 4,
  },
  dropDownInput: {
    color: Colors.gray,
    fontSize: 14,
    paddingVertical: 8,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
  optionsContainer: {
    width: DimensionsConfig.inputWidth,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    maxHeight: DimensionsConfig.screenHeight * 0.5, // Limit height if there are many items
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE6F1',
  },
  optionText: {
    color: '#4A4A4A',
    fontSize: 16,
  },
  dropIcon: {
    width: DimensionsConfig.screenHeight * 0.025,
    height: DimensionsConfig.screenHeight * 0.025
  }
});

export default SignUpScreen;
