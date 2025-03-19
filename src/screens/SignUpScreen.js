import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, CheckBox, Alert, ImageBackground, FlatList, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';
import { Images } from '../assets/images';
import InputField from '../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { GetBusinessType } from '../redux/action/GetBusinessTypeAction';
import { signupUserAction, signupUserRemoveAction } from '../redux/action/SignUpAction';
import ToastMessage from '../components/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const businessTypeData = useSelector((state) => state.getBusinessTypeData);
  const signUpData = useSelector((state) => state.signUpData);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [businessTypes, setBusinessTypes] = useState([])
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    color: ''
  });

  useEffect(() => {
    dispatch(GetBusinessType())
  }, [])

  
  useEffect(() => {
    if (signUpData?.response?.message == 'success') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'AddProfilePictureScreen',
            },
          ],
        })
      );
      AsyncStorage.setItem('token', signUpData?.response?.result?.business_id)
      dispatch(
        signupUserRemoveAction({})
      )
    }
  }, [signUpData])

  useEffect(() => {
    if (Array.isArray(businessTypeData?.response?.result)) {
      // console.log('businessTypeData ===>' , businessTypeData?.response?.result)
      const newArray = businessTypeData?.response?.result.map((item, index) => ({
        label: item?.name,
        value: item?.name
      }));
      setBusinessTypes(newArray)
    }
  }, [businessTypeData])

  const handleSelect = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const showToast = () => {
    setToastVisible(true);
  };

  const handleSignUp = async () => {

    const passwordRegex = /^(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~])(?=.*[A-Za-z0-9])[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]{8,25}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(selectedValue == null){
      showToast()
      setToastData({
        message: 'Please Select Business Type',
        color: Colors?.red
      })
    }else if (businessName == '') {
      showToast()
      setToastData({
        message: 'Enter User Name',
        color: Colors?.red
      })
    } else if(email == ''){
      showToast()
      setToastData({
        message: 'Please Entered Email',
        color: Colors?.red
      })
    } else if (email && !emailRegex.test(email)) {
      showToast()
      setToastData({
        message: 'Invalid email address',
        color: Colors?.red
      })
    }else if(password == ''){
      showToast()
      setToastData({
        message: 'Please Entered Password',
        color: Colors?.red
      })
    } else if (password && !passwordRegex.test(password)) {
      showToast()
      setToastData({
        message: 'Password must be 8-25 characters, include at least one special character, and no emojis.',
        color: Colors?.red
      })
    } else {

      const formData = new FormData();
      formData.append('type', selectedValue);
      formData.append('business_name', businessName);
      formData.append('email', email);
      formData.append('password', password);
      console.log('formData', formData)

      await dispatch(signupUserAction(formData));
    }
    // navigation.navigate('AddProfilePictureScreen')
    // Alert.alert('SignUp Successful');
  };

  const handleBusinessNameChange = (text) => {
    const filteredText = text
      .replace(/[^a-zA-Z]/g, ' ')
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/g, ''); // Removes emojis
    setBusinessName(filteredText);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };


  return (
    <View style={styles.container}>
      <ToastMessage
        visible={toastVisible}
        message={toastData.message}
        onClose={() => setToastVisible(false)}
        toastStyle={{
          backgroundColor: toastData.color
        }}
      />
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
              <Text style={styles.dropDownlabel}>{selectedValue != null ? selectedValue : 'Select Type'}</Text>
              <TouchableOpacity onPress={() => setDropdownOpen(!isDropdownOpen)}>
                <Image source={Images?.DownArrowIcon} style={[styles?.dropIcon]} />
              </TouchableOpacity>

            </View>

            {isDropdownOpen && (
              <View style={styles.optionsContainer}>
                <FlatList
                  data={businessTypes}
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
              onChangeText={handleBusinessNameChange}
            />
            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Email Address"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType='email-address'
            />
            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Password"
              isPassword={true}
              value={password}
              onChangeText={handlePasswordChange}
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

            <TouchableOpacity  disabled={!isChecked} onPress={handleSignUp} style={[styles.signUpButton, !isChecked && { backgroundColor: Colors?.OrGray }]}>
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
    width: '80%'
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
    color: '301E39',
    fontSize: 14,
  },
  dropIcon: {
    width: DimensionsConfig.screenHeight * 0.025,
    height: DimensionsConfig.screenHeight * 0.025
  }
});

export default SignUpScreen;
