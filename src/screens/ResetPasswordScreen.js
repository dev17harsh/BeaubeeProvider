import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DimensionsConfig } from '../theme/dimensions'
import { Colors } from '../theme/colors'
import { Images } from '../assets/images'
import InputField from '../components/InputField'
import ToastMessage from '../components/ToastMessage'
import { useDispatch, useSelector } from 'react-redux'
import { CheckOTPAction, CheckOTPDataClean } from '../redux/action/CheckOTPAction'
import { UpdatePasswordAction, UpdatePasswordDataClean } from '../redux/action/UpdatePasswordAction'
import { CommonActions } from '@react-navigation/native'

const ResetPasswordScreen = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const updatePasswordData = useSelector((state) => state.updatePasswordData);
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    color: ''
  });



  useEffect(() => {
    if (updatePasswordData?.response?.message == 'success') {
      console.log('checkOTPData?.response', updatePasswordData?.response)
      // setOtpViewVisible(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Login',
            },
          ],
        })
      );
      dispatch(UpdatePasswordDataClean())
    } else if (updatePasswordData?.response?.message == 'unsuccess') {
      showToast()
      setToastData({
        message: updatePasswordData?.response?.result,
        color: Colors?.red
      })
      dispatch(UpdatePasswordDataClean())
    }
  }, [updatePasswordData])


  const showToast = () => {
    setToastVisible(true);
  };


  const handleOtpVerify = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~])(?=.*[A-Za-z0-9])[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]{8,25}$/;
    console.log('password' , password , cPassword)
    if (password == '' || cPassword == '') {
      showToast()
      setToastData({
        message: 'Please Entered Password',
        color: Colors?.red
      })
    } else if (password != cPassword) {
      showToast()
      setToastData({
        message: 'Please Entered Correct Password',
        color: Colors?.red
      })
    } else if (password && !passwordRegex.test(password)) {
      showToast()
      setToastData({
        message: 'Password must be 8-25 characters, include at least one special character, and no emojis.',
        color: Colors?.red
      })
    } else {
      console.log('userDetailData.business_id', props?.route?.params?.userDetail.business_id)
      const params = {
        business_id: props?.route?.params?.userDetail.business_id,
        password: password
      }

      await dispatch(UpdatePasswordAction(params));
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
          height: DimensionsConfig.screenHeight * 0.5,
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
            <Text style={styles.header}>Reset Password</Text>

            <Text style={styles.subheader}>Enter you email and we’ll send you instructions on how to reset your password.</Text>

            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Enter new password"
              isPassword={true}
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles?.spacingBtwInput} />
            <InputField
              placeholder="Confirm new password"
              isPassword={true}
              value={cPassword}
              onChangeText={setCPassword}
            />
            <View style={styles?.spacingBtwInput} />


            <TouchableOpacity onPress={handleOtpVerify} style={[styles.signUpButton]}>
              <Text style={styles.signUpButtonText}>Reset password</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default ResetPasswordScreen

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
    top: DimensionsConfig.screenHeight * 0.14
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
    height: DimensionsConfig.screenHeight * 0.5,
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