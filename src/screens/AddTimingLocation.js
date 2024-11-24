import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';

const AddTimingLocation = ({ navigation }) => {
    const [locations, setLocations] = useState([
        { id: 1, title: 'Location 1', description: 'Some address line goes here' },
        { id: 2, title: 'Location 2', description: 'Some address line goes here' },
        { id: 3, title: 'Location 3', description: 'Some address line goes here' },
    ]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <AppHeader title={'Addresses and Timings'} />
            <View style={styles.subContainer}>
                {/* FlatList for displaying locations */}
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.serviceItem}>
                            <View style={styles.serviceInfo}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        source={Images?.locationIcon}
                                        style={styles.icon}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image
                                    source={Images?.VerticalThreeDot}
                                    style={styles.moreIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {/* "Add new address" Section */}
                <TouchableOpacity style={styles.addNewAddress} onPress={() => { navigation.navigate('AddressMapScreen') }}>
                    <Image
                        source={Images?.Add}
                        style={styles.addIcon}
                    />
                    <Text style={styles.addNewAddressText}>Add new address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    subContainer: {
        // flex: 1,
        padding: DimensionsConfig.screenHeight * 0.015,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: DimensionsConfig.screenHeight * 0.02,
        borderWidth: 1,
        borderColor: '#F6EFF9',
        borderRadius: DimensionsConfig.screenHeight * 0.015,
        marginBottom: DimensionsConfig.screenHeight * 0.02,
    },
    serviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        height: DimensionsConfig.screenHeight * 0.06,
        width: DimensionsConfig.screenHeight * 0.06,
        backgroundColor: '#F6EFF9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: DimensionsConfig.screenHeight * 0.03,
        marginRight: DimensionsConfig.screenHeight * 0.01,
    },
    icon: {
        height: DimensionsConfig.screenHeight * 0.028,
        width: DimensionsConfig.screenHeight * 0.028,
        resizeMode: 'contain',
    },
    moreIcon: {
        height: DimensionsConfig.screenHeight * 0.018,
        width: DimensionsConfig.screenHeight * 0.018,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#301E39',
    },
    description: {
        color: '#554F67',
        fontSize: 12,
        fontWeight: '400',
    },
    addNewAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: DimensionsConfig.screenHeight * 0.02,
    },
    addIcon: {
        height: DimensionsConfig.screenHeight * 0.025,
        width: DimensionsConfig.screenHeight * 0.025,
        resizeMode: 'contain',
    },
    addNewAddressText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors?.primary,
        marginLeft: 8,
    },
});

export default AddTimingLocation;
