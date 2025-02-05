import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signupUserAction, signupUserRemoveAction } from '../redux/action/SignUpAction';
import { CommonActions } from '@react-navigation/native';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const AddProfilePictureScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const signUpData = useSelector((state) => state.signUpData);
    const [profileImage, setProfileImage] = useState(null);
    const [imageData, setimageData] = useState([]);

    useEffect(() => {
        if (signUpData?.response?.message == 'success') {
            navigation.dispatch(
                CommonActions.reset({
                  index: 0, // Position of the new route in the stack
                  routes: [
                    {
                      name: 'AddressMapScreen',
                    },
                  ],
                })
              );
            dispatch(
                signupUserRemoveAction()
            )
        }
    }, [signUpData])

    const openImagePicker = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response?.assets && response.assets.length > 0) {
                setimageData(response?.assets)
                setProfileImage(response.assets[0].uri);
            }
        });
    };

    const createFileFromPickerData = (imagePickerResponse) => {
        if (imagePickerResponse && imagePickerResponse.length > 0) {
            const fileData = imagePickerResponse[0]; // Assuming you have a single image
            const { uri, fileName, type } = fileData;

            // Creating a file object for FormData
            const file = {
                uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''), // Remove 'file://' on iOS
                name: fileName,
                type: type,
            };

            return file;
        }
        return null;
    };

    const onPressNext = async () => {
        const userId = await AsyncStorage.getItem('token')
        const imageFile = await createFileFromPickerData(imageData)
        const formData = new FormData();
        formData.append('business_id', userId);
        formData.append('profile', imageFile);
        console.log('formData', formData)

        await dispatch(signupUserAction(formData));
    }

    return (
        <SafeAreaView style={styles.container}>
            <View  style={styles.container}>
            <StatusBar backgroundColor={Colors?.white} barStyle={'dark-content'} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add a profile picture</Text>
            </View>
            <View style={{
                flex: 0.9,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={openImagePicker} style={styles.imageButton}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.placeholderCircle}>
                                <Image
                                 tintColor={Colors?.primary}
                                    source={Images?.GalleryIcon} // Placeholder icon
                                    style={styles.placeholderIcon}
                                />
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openImagePicker} style={styles.cameraButton}>
                        <Image
                            source={Images?.camera} // Camera icon
                            tintColor={Colors?.primary}
                            style={styles.cameraIcon}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <View>
            <TouchableOpacity 
            disabled={imageData.length === 0} style={[styles.nextButton, imageData.length === 0 && { backgroundColor: Colors?.OrGray }]} onPress={() => {
                onPressNext()
            }}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=>{
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0, 
                      routes: [
                        {
                          name: 'AddressMapScreen',
                          params: { type: 'Add' },
                        },
                      ],
                    })
                  );
            }}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: (mobileW * 6) / 100,
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    imagePickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    imageButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: (mobileH * 20) / 100,
        height: (mobileH * 20) / 100,
        borderRadius: ((mobileH * 20) / 100) / 2,
    },
    placeholderCircle: {
        width: (mobileH * 20) / 100,
        height: (mobileH * 20) / 100,
        borderRadius: ((mobileH * 20) / 100) / 2,
        backgroundColor: '#F6EFF9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderIcon: {
        width: (mobileH * 6) / 100,
        height: (mobileH * 6) / 100,
    },
    cameraButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cameraIcon: {
        width: (mobileH * 3) / 100,
        height: (mobileH * 3) / 100,
    },
    nextButton: {
        backgroundColor: Colors?.primary,
        borderRadius: DimensionsConfig?.buttonHeight * 0.18,
        paddingVertical: DimensionsConfig?.buttonHeight * 0.28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (mobileH * 5) / 100,
        width: '95%',
        alignSelf: 'center'
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skipText: {
        color: Colors?.primary,
        fontSize: 16,
        marginTop:DimensionsConfig?.buttonHeight * 0.2,
        alignSelf: 'center'
    },
});

export default AddProfilePictureScreen;
 