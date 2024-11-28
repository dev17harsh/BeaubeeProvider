import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Modal, ScrollView, SafeAreaView } from 'react-native';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';

const service = [
    { id: '1', title: 'Hair', description: '5 services listed', icon: Images?.Hair },
    { id: '2', title: 'Skincare', description: '5 services listed', icon: Images?.Skincare },
    { id: '3', title: 'Nails', description: '5 services listed', icon: Images?.Nail },
];

const ServiceScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [services, setServices] = useState([
        { id: 1, name: 'Hair', selected: true },
        { id: 2, name: 'Makeup', selected: false },
        { id: 3, name: 'Skincare', selected: true },
        { id: 4, name: 'Nails', selected: true },
        { id: 5, name: 'Hair Removal', selected: false },
        { id: 6, name: 'Tanning', selected: false },
    ]);

    const AddRemoveService = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            hitSlop={100}
                            style={styles?.CloserView}
                        />
                        <Text style={styles.modalHeader}>Add/Remove Services</Text>
                        <ScrollView>
                            {services.map((service) => (
                                <View key={service.id} style={styles.checkboxContainer}>
                                    <TouchableOpacity
                                        onPress={() => toggleServiceSelection(service.id)}
                                    >
                                        <Image source={service.selected ? Images?.Check_Box : Images?.Unchecked} style={{
                                            height: DimensionsConfig.screenHeight * 0.025,
                                            width: DimensionsConfig.screenHeight * 0.025,
                                            resizeMode: 'contain'
                                        }} />
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxLabel}>{service.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }

    const toggleServiceSelection = (id) => {
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === id ? { ...service, selected: !service.selected } : service
            )
        );
    };
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.header}>Services</Text>
            <FlatList
                data={service}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.serviceItem}>
                        <View style={styles.serviceInfo}>
                            <View style={{
                                height: DimensionsConfig.screenHeight * 0.06,
                                width: DimensionsConfig.screenHeight * 0.06,
                                backgroundColor: '#F6EFF9',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: DimensionsConfig.screenHeight * 0.06 / 2,
                                marginRight: DimensionsConfig.screenHeight * 0.01
                            }}>
                                <Image source={item?.icon} style={{
                                    height: DimensionsConfig.screenHeight * 0.028,
                                    width: DimensionsConfig.screenHeight * 0.028,
                                    resizeMode: 'contain'
                                }} />
                            </View>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('AddUpdateServiceScreen')
                        }}
                        >
                            <Image source={Images?.VerticalThreeDot} style={{
                                height: DimensionsConfig.screenHeight * 0.018,
                                width: DimensionsConfig.screenHeight * 0.018,
                                resizeMode: 'contain'
                            }} />
                            {/* <Icon name="more-vert" size={24} color="#A020F0" />? */}
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.fab} onPress={() => {
                setModalVisible(true)
            }}>
                <Image source={Images?.PlusWhite} style={{
                    height: DimensionsConfig.screenHeight * 0.028,
                    width: DimensionsConfig.screenHeight * 0.028,
                    resizeMode: 'contain'
                }} />
            </TouchableOpacity>
            {AddRemoveService()}
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: DimensionsConfig.screenHeight * 0.025,
        paddingTop: DimensionsConfig.screenHeight * 0.025,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: '#301E39',
        marginBottom: DimensionsConfig.screenHeight * 0.025,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: DimensionsConfig.screenHeight * 0.02,
        // backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#F6EFF9',
        borderRadius: DimensionsConfig.screenHeight * 0.015,
        marginBottom: DimensionsConfig.screenHeight * 0.02,
    },
    serviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: DimensionsConfig.screenHeight * 0.02,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#301E39',
    },
    description: {
        color: '#554F67',
        fontSize: 12,
        fontWeight: '400'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: DimensionsConfig.screenHeight * 0.07,
        height: DimensionsConfig.screenHeight * 0.07,
        backgroundColor: '#A020F0',
        borderRadius: DimensionsConfig.screenHeight * 0.07 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: DimensionsConfig.screenHeight * 0.028,
        borderTopLeftRadius: DimensionsConfig.screenHeight * 0.028,
        borderTopRightRadius: DimensionsConfig.screenHeight * 0.028,
        maxHeight: '50%',
    },
    modalHeader: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: DimensionsConfig.screenHeight * 0.02,
        color:'#301E39'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: DimensionsConfig.screenHeight * 0.014,
    },
    checkboxLabel: {
        marginLeft: DimensionsConfig.screenHeight * 0.016,
        fontSize: 14,
        color:'#301E39',
        fontWeight:'400'
    },
    closeModalButton: {
        marginTop: DimensionsConfig.screenHeight * 0.028,
        padding: 10,
        backgroundColor: '#6A5ACD',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeModalText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    CloserView: {
        height: DimensionsConfig?.screenHeight * 0.008,
        width: DimensionsConfig?.screenWidth * 0.14,
        borderRadius: 10,
        backgroundColor: '#9E98AC',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: -10
    },
});

export default ServiceScreen;
