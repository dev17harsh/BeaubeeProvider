import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TextInput,
    SafeAreaView,
} from 'react-native';
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import LocationSearchModal from '../components/Modal.js/LocationSearchModal';
import { DimensionsConfig } from '../theme/dimensions';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const AddressMapScreen = ({ navigation }) => {
    const [searchModalVisible, setSearchModalVisible] = useState(false);

    return (
        <>
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <AppHeader
                title={"Business Address"}
            />
            <ImageBackground
                style={{ flex: 1 }}
                imageStyle={{ flex: 1 }}
                source={Images.mapImage}>
                
                {/* Location Section */}
                <View style={styles.LocationButtonView}>
                    <TouchableOpacity 
                        onPress={() => setSearchModalVisible(true)} 
                        style={styles.locationSection}
                    >
                        <Image
                            style={styles.tagIcon}
                            resizeMode="contain"
                            source={Images.SearchIcon}
                        />
                        <View style={styles.textInputView}>
                            <Text style={styles.searchPlaceholder}>Search Location</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddAddressScreen')}
                        style={styles.selectLocationButton}
                    >
                        <Text style={styles.selectionButtonTxt}>Select Location</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            </View>
        </SafeAreaView>
        
        <LocationSearchModal 
            visible={searchModalVisible} 
            onClose={() => setSearchModalVisible(false)} 
        />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    LocationButtonView: {
        bottom: (mobileW * 5) / 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: (mobileW * 3.5) / 100,
    },
    locationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        backgroundColor: '#ffffff',
        width: (mobileW * 90) / 100,
        alignSelf: 'center',
        borderRadius: (mobileW * 8) / 100,
        paddingVertical: (mobileW * 3.5) / 100,
        paddingHorizontal: (mobileW * 4) / 100,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    tagIcon: {
        width: (mobileW * 5.2) / 100,
        height: (mobileW * 5.2) / 100,
    },
    textInputView: {
        left: 7,
        width: (mobileW * 75) / 100,
    },
    searchPlaceholder: {
        fontSize: (mobileW * 4) / 100,
        fontWeight: '400',
        color: '#554F67',
    },
    selectLocationButton: {
        backgroundColor: '#8D10B5',
        width: (mobileW * 90) / 100,
        borderRadius: DimensionsConfig?.buttonHeight * 0.18,
        paddingVertical: DimensionsConfig?.buttonHeight * 0.28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectionButtonTxt: {
        fontSize: (mobileW * 4) / 100,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});

export default AddressMapScreen;
