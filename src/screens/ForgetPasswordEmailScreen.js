import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DimensionsConfig } from '../theme/dimensions'
import { Colors } from '../theme/colors'
import { Images } from '../assets/images'
import InputField from '../components/InputField'
import ToastMessage from '../components/ToastMessage'
import { useDispatch, useSelector } from 'react-redux'
import { ForgetEmailAction, ForgetEmailDataClean } from '../redux/action/ForgetEmailAction'
import OTPInput from '../components/OTPInput'
import { CheckOTPAction, CheckOTPDataClean } from '../redux/action/CheckOTPAction'

const ForgetPasswordEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const forgetEmailData = useSelector((state) => state.forgetEmailData);
  const checkOTPData = useSelector((state) => state.checkOTPData);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    color: ''
  });
  const [OtpViewVisible, setOtpViewVisible] = useState(false);
  const [userDetailData, setUserDetailData] = useState({});


  useEffect(() => {
    if (forgetEmailData?.response?.message == 'success') {
      console.log('forgetEmailData?.response', forgetEmailData?.response)
      setOtpViewVisible(true)
      setUserDetailData(forgetEmailData?.response?.result)
      dispatch(ForgetEmailDataClean())
    } else if (forgetEmailData?.response?.message == 'unsuccess') {
      showToast()
      setToastData({
        message: forgetEmailData?.response?.result,
        color: Colors?.red
      })
      dispatch(ForgetEmailDataClean())
    }
  }, [forgetEmailData])

  useEffect(() => {
    if (checkOTPData?.response?.message == 'success') {
      console.log('checkOTPData?.response', checkOTPData?.response)
      // setOtpViewVisible(false)
      setUserDetailData(checkOTPData?.response?.result)
      navigation.navigate('ResetPasswordScreen' , {userDetail : checkOTPData?.response?.result})
      dispatch(CheckOTPDataClean())
    } else if (checkOTPData?.response?.message == 'unsuccess') {
      showToast()
      setToastData({
        message: checkOTPData?.response?.result,
        color: Colors?.red
      })
      dispatch(CheckOTPDataClean())
    }
  }, [checkOTPData])

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const showToast = () => {
    setToastVisible(true);
  };

  const handleVerifyOtp = async () => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email == '') {
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
    } else {
      const params = {
        email: email
      }

      await dispatch(ForgetEmailAction(params));
    }
  };

  const handleOtpChange = (otp) => {
    console.log("Entered OTP:", otp , otp.length); // Handle the OTP value here
    if(otp.length >= 6){
      setOtp(otp)
    }
  };

  const handleOtpVerify = async () =>{
   if(otp.split('').length < 6){
    showToast()
    setToastData({
      message: 'Please Enter Otp',
      color: Colors?.red
    })
   }
    else {
      console.log('userDetailData.business_id', userDetailData.business_id)
      const params = {
        business_id : userDetailData.business_id ,
        otp: otp
      }

      await dispatch(CheckOTPAction(params));
    }
  }

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
      <SafeAreaView style={{
        flex: 1,
        position: 'absolute',
      }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Image source={Images?.BackIcon} tintColor={Colors.white} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={{
          height: DimensionsConfig.screenHeight * 0.6,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center'
        }}>
          <Image source={Images.logoWhite} style={styles.logo} />
        </View>
        <View style={[styles.formContainer]}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingHorizontal: 25,
              paddingBottom: DimensionsConfig.screenHeight * 0.1,
            }}>
            <Text style={styles.header}>{OtpViewVisible ? "Enter OTP" : "Forgot Password?"}</Text>

            <Text style={styles.subheader}>{OtpViewVisible ? "Enter OTP for verify email and update your new password." : "Enter you email and we’ll send you instructions on how to reset your password."}</Text>

            <View style={styles?.spacingBtwInput} />
            {OtpViewVisible ? (
              <OTPInput length={6} onChange={handleOtpChange} />
            ) : (
              <InputField
                placeholder="Email Address"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType='email-address'
              />)}
            <View style={styles?.spacingBtwInput} />
            {OtpViewVisible ? (


              <TouchableOpacity disabled={otp.length > 6} onPress={handleOtpVerify} style={[styles.signUpButton]}>
                <Text style={styles.signUpButtonText}>Submit</Text>
              </TouchableOpacity>
            ) : (

              <TouchableOpacity onPress={handleVerifyOtp} style={[styles.signUpButton]}>
                <Text style={styles.signUpButtonText}>Verify Email</Text>
              </TouchableOpacity>)}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default ForgetPasswordEmailScreen

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
    top: DimensionsConfig.screenHeight * 0.24
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
    height: DimensionsConfig.screenHeight * 0.4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  spacingBtwInput: {
    marginVertical: DimensionsConfig?.screenHeight * 0.012
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    color: Colors.DarkPurple,
  },
  subheader: {
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 15,
    color: Colors.DarkPurple,
    textAlign: 'center'
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
  },
  backIcon: {
    width: (DimensionsConfig.screenWidth * 4.5) / 100,
    height: (DimensionsConfig.screenWidth * 4.5) / 100,
    position: 'absolute',
    top: DimensionsConfig.screenHeight * 0.015,
    left: DimensionsConfig.screenHeight * 0.015
  },
})