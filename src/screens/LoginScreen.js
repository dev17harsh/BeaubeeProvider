import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';
import InputField from '../components/InputField'; // Import InputField component
import { Images } from '../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, UserLoginDataClean } from '../redux/action/LoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../components/ToastMessage';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.authData);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastData, setToastData] = useState({
        message: '',
        color: '',
        error: false
    });

    const showToast = () => {
        setToastVisible(true);
    };

    useEffect(() => {
        console.log('loginData?.response', loginData?.response)
        if (loginData?.response?.message == 'success') {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'MainApp',
                        },
                    ],
                })
            );
            AsyncStorage.setItem('token', loginData?.response?.result?.business_id)
            dispatch(
                UserLoginDataClean({})
            )
        } else if (loginData?.response?.message == 'unsuccess') {
            showToast()
            setToastData({
                message: loginData?.response?.result,
                color: Colors?.red,
                error: true
            })
            dispatch(
                UserLoginDataClean({})
            )
        }
    }, [loginData])

    const handleLogin = async () => {
        // Add your login functionality here
        const passwordRegex = /^(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~])(?=.*[A-Za-z0-9])[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]{8,25}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log('Login pressed');
        if (email == '') {
            showToast()
            setToastData({
                message: 'Please Entered Email',
                color: Colors?.red,
                error: true
            })
        } else if (email && !emailRegex.test(email)) {
            showToast()
            setToastData({
                message: 'Invalid email address',
                color: Colors?.red,
                error: true
            })
        } else if (password == '') {
            showToast()
            setToastData({
                message: 'Please Entered Password',
                color: Colors?.red,
                error: true
            })
        } else if (password && !passwordRegex.test(password)) {
            showToast()
            setToastData({
                message: 'Password must be 8-25 characters, include at least one special character, and no emojis.',
                color: Colors?.red,
                error: true
            })
        } else {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            console.log('login data  ===>', formData)
            await dispatch(loginUser(formData));

        }
        // navigation.navigate('MainApp')
    };

    return (
        <View style={styles?.container}>
            <ToastMessage
                visible={toastVisible}
                message={toastData.message}
                onClose={() => setToastVisible(false)}
                toastStyle={{
                    backgroundColor: toastData.color
                }}
                error={toastData.error}
            />
            <StatusBar backgroundColor={Colors?.primary} barStyle={'light-content'} />
            <ImageBackground source={Images?.ScreenBackground} style={styles.ImageView} />
            <View style={{
                flex: 1,
                position: 'absolute'
            }}>
                <View style={{
                    height: DimensionsConfig.screenHeight * 0.35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    <Image source={Images?.logoWhite} style={styles.logo} />
                </View>
                <View
                    style={{
                        backgroundColor: Colors.white,
                        width: DimensionsConfig.screenWidth,
                        height: DimensionsConfig.screenHeight * 0.8,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.loginText}>Login</Text>

                    <InputField
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                    />
                    <View style={styles?.spacingBtwInput} />
                    <InputField
                        placeholder="Password"
                        isPassword={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ForgetPasswordEmailScreen')
                    }} >
                        <Text style={styles.forgetText}>Forget Password ?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.orText}>Or</Text>

                    <TouchableOpacity style={styles.googleButton} onPress={() => { }}>
                        <Image source={Images?.GoogleIcon} style={styles.googlelogo} />
                        <Text style={styles.googleButtonText}>Login with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>Don't have an account yet? <Text style={{ color: Colors?.primary, fontWeight: '600' }}>Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    ImageView: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        position: 'relative',
    },
    logo: {
        height: DimensionsConfig.logoHeight,
        width: DimensionsConfig.logoWidth,
        resizeMode: 'contain',
    },
    googlelogo: {
        height: DimensionsConfig.screenHeight * 0.035,
        width: DimensionsConfig.screenHeight * 0.035,
        resizeMode: 'contain',
        marginRight: 5
    },
    spacingBtwInput: {
        marginVertical: DimensionsConfig?.screenHeight * 0.012
    },
    loginText: {
        fontSize: 20,
        color: Colors.DarkPurple,
        marginBottom: 20,
    },
    loginButton: {
        height: DimensionsConfig.buttonHeight,
        width: DimensionsConfig.buttonWidth,
        backgroundColor: Colors?.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 15,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 15,
    },
    orText: {
        color: Colors.OrGray,
        fontSize: 14,
        marginVertical: 10,
    },
    forgetText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 14,
        marginBottom: 7
    },
    googleButton: {
        backgroundColor: Colors.white,
        height: DimensionsConfig.screenHeight * 0.07,
        width: DimensionsConfig.screenWidth * 0.9,
        borderWidth: 1,
        borderColor: '#EEE6F1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row'
    },
    googleButtonText: {
        color: Colors.black,
        fontSize: 15,
    },
    signupText: {
        color: Colors.DarkPurple,
        marginVertical: 20,
    },
});
