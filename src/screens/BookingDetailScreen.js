import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Modal,
    SafeAreaView,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const BookingDetailScreen = ({ navigation }) => {
    const [isCancelModalVisible, setIsCandelModalVisible] = useState(false);
    const [isChargeModalVisible, setIsChargeModalVisible] = useState(false);

    const cancelCloseModal = () => {
        setIsCandelModalVisible(false);
    };

    const chargeCloseModal = () => {
        setIsChargeModalVisible(false);
    };

    const cancelConformationModal = () => {
        return (
            <Modal visible={isCancelModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to cancel this appointment?</Text>
                        <TouchableOpacity style={styles.modalCancelButton} onPress={() => {
                            setIsChargeModalVisible(true)
                            cancelCloseModal()
                        }}>
                            <Text style={styles.modalCancelText}>Cancel Appointment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalBackButton} onPress={cancelCloseModal}>
                            <Text style={styles.modalBackText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    const cancelChargesModal = () => {
        return (
            <Modal visible={isChargeModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Charge cancellation fee of $12.50?</Text>
                        <TouchableOpacity style={[styles.modalCancelButton, { backgroundColor: Colors?.primary }]} onPress={chargeCloseModal}>
                            <Text style={[styles.modalCancelText, { color: Colors?.white }]}>Charge</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalBackButton} onPress={chargeCloseModal}>
                            <Text style={styles.modalBackText}>Waive</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <AppHeader title={'Booking Details'} />

            <ScrollView style={styles.Scrollcontainer}>
                {/* Header */}

                {/* Detail Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detail</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Customer</Text>
                            <Text style={[styles.value, { color: Colors?.primary }]}>Kynthia's</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Service</Text>
                            <Text style={styles.value}>Straight Hair</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Price</Text>
                            <Text style={[styles.value, styles.price]}>$60.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Duration</Text>
                            <Text style={styles.value}>Straight Hair</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Appointment Date</Text>
                            <Text style={styles.value}>29th March, 2022</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Appointment Time</Text>
                            <Text style={styles.value}>12:00PM-1:00PM</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Professional</Text>
                            <Text style={styles.value}>Linda Johnson</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Service Location</Text>
                            <Text style={styles.value}>Your location</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#EEE6F1', marginBottom: 10 }} />
                        <View>
                            <Text style={styles.label}>Note from customer:</Text>
                            <Text style={styles.value}>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae eleifend ac.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles?.horizontalLine} />

                {/* Professional Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional</Text>
                    <View style={styles.infoContainer}>
                        <View style={[styles.row, { marginBottom: 0, justifyContent: 'flex-start', alignItems: 'center' }]}>
                            <Image source={Images?.personImage} style={{ height: mobileH * 0.06, width: mobileH * 0.06, borderRadius: 100 }} />
                            <Text style={[styles.value, { marginLeft: 10 }]}>Linda J.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles?.horizontalLine} />

                {/* Cost Breakdown Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cost Breakdown</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Straight Hair</Text>
                            <Text style={styles.value}>$60.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Visiting Charges</Text>
                            <Text style={styles.value}>$10.00</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#EEE6F1', marginBottom: 10 }} />
                        <View style={styles.row}>
                            <Text style={[styles.label, styles.totalLabel]}>Total</Text>
                            <Text style={[styles.value, styles.totalValue]}>$70.00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles?.horizontalLine} />
                {/* Location Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location <Text style={{ color: '#9E98AC', fontWeight: '400' }} >(Customer Location)</Text></Text>
                    <View style={styles.infoContainer}>
                        <View style={[styles.row, { marginBottom: 0, justifyContent: 'flex-start', alignItems: 'center' }]}>
                            <View style={{ height: mobileH * 0.06, width: mobileH * 0.06, borderRadius: 100, justifyContent: 'center', backgroundColor: '#F6EFF9', alignItems: 'center' }}>
                                <Image source={Images?.locationIcon} tintColor={Colors?.primary} style={{ height: mobileH * 0.03, width: mobileH * 0.03, resizeMode: 'contain' }} />
                            </View>
                            <Text style={[styles.value, { marginLeft: 10 }]}>188 Ballarat Rd. Footscray</Text>
                        </View>
                    </View>
                </View>

                <View style={styles?.horizontalLine} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.infoContainer}>
                        <View style={[styles.row, { marginBottom: 0, justifyContent: 'flex-start', alignItems: 'center' }]}>
                            <Image source={Images?.cardPayment} style={{ height: mobileH * 0.06, width: mobileH * 0.06, }} />
                            <Text style={[styles.value, { marginLeft: 10 }]}>**** **** **** 1234</Text>
                        </View>
                    </View>
                </View>


                {/* Buttons */}
                <TouchableOpacity
                    // onPress={() => navigation.navigate('RescheduleService')}
                    style={styles.rescheduleButton}>
                    <Text style={styles.rescheduleText}>Start Service</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('RescheduleService')}
                    style={[styles.rescheduleButton, { backgroundColor: '#EEE6F1' }]}>
                    <Text style={[styles.rescheduleText, { color: Colors?.primary }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setIsCandelModalVisible(true) }}
                    style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View style={{ marginTop: (mobileH * 5) / 100 }} />
            </ScrollView>
            {cancelConformationModal()}
            {cancelChargesModal()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    Scrollcontainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: (mobileW * 5) / 100,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3F3D56',
        alignSelf: 'center',
        marginBottom: 24,
    },
    section: {
        marginVertical: 14,
        backgroundColor: Colors.white,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#301E39',
        marginBottom: 8,
    },
    infoContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 16,
        elevation: 3,
        shadowColor: '#000', // For iOS shadow
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#301E39',
    },
    value: {
        fontSize: 14,
        color: '#301E39',
        fontWeight: '600',
    },
    price: {
        color: Colors.primary,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    totalValue: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    mapContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (mobileW * 2) / 100,
        elevation: 3,
        marginTop: (mobileW * 5) / 100,
        shadowColor: '#000', // For iOS shadow
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    mapImage: {
        width: (mobileW * 90) / 100,
        height: (mobileW * 40) / 100,
        borderTopLeftRadius: (mobileW * 2.3) / 100,
        borderTopRightRadius: (mobileW * 2.3) / 100,
    },
    locationName: { fontSize: (mobileW * 4) / 100, color: '#000' },
    locationNameAdd: {
        fontSize: (mobileW * 2.8) / 100,
        color: '#000',
        marginTop: (mobileW * 1) / 100,
    },
    locationAddress: {
        width: (mobileW * 90) / 100,
        paddingHorizontal: (mobileW * 5) / 100,
        paddingVertical: (mobileW * 4) / 100,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: (mobileW * 2.3) / 100,
        borderBottomRightRadius: (mobileW * 2.3) / 100,
    },
    paymentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F6',
        borderRadius: 8,
        padding: 16,
    },
    paymentText: {
        fontSize: 14,
        color: '#3F3D56',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    rescheduleButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    rescheduleText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    cancelButton: {
        alignItems: 'center',
        marginTop: 16,
        paddingVertical: 12,
    },
    cancelText: {
        fontSize: 14,
        color: '#FE5F7C',
        fontWeight: 'bold',
    },
    backIcon: {
        width: (mobileW * 5) / 100,
        height: (mobileW * 5) / 100,
    },
    straightLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#E7E7E7',
        marginVertical: (mobileW * 7) / 100,
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: (mobileW * 5) / 100,
        backgroundColor: '#ffffff',
        marginTop: (mobileW * 3) / 100,
        borderRadius: (mobileW * 2.5) / 100,
        paddingHorizontal: (mobileW * 3) / 100,
        elevation: 3,
        shadowColor: '#000', // For iOS shadow
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    methodDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcons: {
        width: (mobileW * 9) / 100,
        height: (mobileW * 9) / 100,
    },
    methodText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    horizontalLine: {
        height: DimensionsConfig?.screenHeight * 0.001,
        width: '98%',
        backgroundColor: '#E7E7E7',
        marginTop: 10,
        alignSelf: 'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000090',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#301E39',
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: '600',
    },
    modalCancelButton: {
        backgroundColor: '#FCE9E9',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalCancelText: {
        color: '#FE5F7C',
        fontSize: 14,
        fontWeight: '600',
    },
    modalBackButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    modalBackText: {
        color: Colors?.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default BookingDetailScreen;
