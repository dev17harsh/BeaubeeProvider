import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const AddProfilePictureScreen = ({navigation}) => {
    const [profileImage, setProfileImage] = useState(null);

    const openImagePicker = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response?.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri);
            }
        });
    };

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
            <TouchableOpacity style={styles.nextButton} onPress={()=>{
                navigation.navigate('AddressMapScreen')
            }}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
 