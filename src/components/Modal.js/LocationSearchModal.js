import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { Images } from '../../assets/images';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const LocationSearchModal = ({ visible, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const locations = [
        { id: '1', name: 'ABC Location', details: 'Detailed location goes here' },
        { id: '2', name: 'ABC Location', details: 'Detailed location goes here' },
        { id: '3', name: 'ABC Location', details: 'Detailed location goes here' },
        { id: '4', name: 'ABC Location', details: 'Detailed location goes here' },
        { id: '5', name: 'ABC Location', details: 'Detailed location goes here' },
    ];
    const [filteredData, setFilteredData] = useState(locations);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredData(
            locations.filter((location) =>
                location.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const renderLocation = ({ item }) => (
        <View style={styles.locationItem}>
            <View style={styles?.locationView}>
            <Image
                style={styles.LocationIcon}
                resizeMode="contain"
                source={Images.locationIcon}
            />
            </View>
            <View style={styles.locationText}>
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationDetails}>{item.details}</Text>
            </View>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.searchBar}>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={Images.BackIcon} style={styles.backIcon} />
                        </TouchableOpacity>
                        <View style={styles.searchInputContainer}>
                            <Image source={Images.SearchIcon} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search here"
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
                    </View>
                    <View style={styles?.HorizontalLine} />
                    <FlatList
                        data={filteredData}
                        renderItem={renderLocation}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            paddingHorizontal: mobileH * 0.025,
                            paddingVertical:  mobileH * 0.015,
                        }}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // padding: mobileH * 0.025,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: mobileH * 0.025,
        padding: mobileH * 0.025,
    },
    searchInputContainer: {
        flex: 1,
        height: mobileH * 0.055,
        borderRadius: mobileH * 0.055 / 2,
        backgroundColor: '#F6EFF9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: mobileH * 0.02,
        marginLeft: mobileH * 0.015,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        marginLeft: mobileH * 0.002,
        fontSize: 16,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: mobileH * 0.015,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    locationText: {
        marginLeft: mobileH * 0.015,
    },
    locationName: {
        fontWeight: '600',
        color: '#301E39',
        fontSize: 14,
    },
    locationDetails: {
        color: '#9E98AC',
        fontSize: 12,
    },
    backIcon: {
        width: mobileW * 0.05,
        height: mobileW * 0.05,
    },
    searchIcon: {
        width: mobileW * 0.05,
        height: mobileW * 0.05,
        marginRight: mobileH * 0.01,
    },
    LocationIcon:{
        width: (mobileW * 5.5) / 100,
        height: (mobileW * 5.5) / 100,
    },
    locationView:{
        width: (mobileW * 10) / 100,
        height: (mobileW * 10) / 100,
        borderRadius : ((mobileW * 10) / 100 ) / 2,
        backgroundColor: '#F6EFF9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    HorizontalLine:{
        width: '120%',
        backgroundColor: '#E6E8F1',
        height: 2
    }
});

export default LocationSearchModal;
