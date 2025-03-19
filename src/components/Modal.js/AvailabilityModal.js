import {
    View,
    Text,
    Switch,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Modal,
} from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../AppHeader';
import CustomSwitch from '../CustomSwitch';
import CommonButton from '../CommonButton';
import { Colors } from '../../theme/colors';
import { Picker } from '@react-native-picker/picker';
import { Images } from '../../assets/images';
import { DimensionsConfig } from '../../theme/dimensions';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateTimeOptions = () => {
    const times = [];
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    for (let i = 0; i < 48; i++) {
        times.push(
            date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
        );
        date.setMinutes(date.getMinutes() + 30);
    }
    return times;
};

const timeOptions = generateTimeOptions();

const AvailabilityModal = ({ isVisible, onClose , onPressSave}) => {
    const [schedule, setSchedule] = useState(
        daysOfWeek.map(day => ({
            day,
            isOpen: false,
            openingTime: '12:00 am',
            closingTime: '12:30 am',
        })),
    );

    const toggleOpen = index => {
        const newSchedule = [...schedule];
        newSchedule[index].isOpen = !newSchedule[index].isOpen;
        setSchedule(newSchedule);
    };

    const updateTime = (index, type, value) => {
        const newSchedule = [...schedule];
        if (type === 'openingTime') {
            newSchedule[index].openingTime = value;
            if (
                timeOptions.indexOf(value) >=
                timeOptions.indexOf(newSchedule[index].closingTime)
            ) {
                const newClosingTimeIndex = timeOptions.indexOf(value) + 1;
                newSchedule[index].closingTime =
                    timeOptions[newClosingTimeIndex] ||
                    timeOptions[timeOptions.length - 1];
            }
        } else {
            newSchedule[index].closingTime = value;
        }
        setSchedule(newSchedule);
    };

    const renderTimePicker = (time, onChange, options) => (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={time}
                style={styles.timePicker}
                onValueChange={onChange}
                mode="dropdown">
                {options.map(timeOption => (
                    <Picker.Item label={timeOption} value={timeOption} key={timeOption} />
                ))}
            </Picker>
        </View>
    );

    return (
        <Modal visible={isVisible} animationType='slide' transparent>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => onClose()}>
                            <Image source={Images?.BackIcon} style={styles.backIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Availability</Text>
                        <TouchableOpacity>
                            <Image source={Images?.HeartIcon} style={styles.backIcon} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: mobileW * 0.08 }}>
                        <View style={styles.subContainer}>
                            {schedule.map((item, index) => {
                                // Filter closing time options based on selected opening time
                                const validClosingOptions = timeOptions.slice(
                                    timeOptions.indexOf(item.openingTime) + 1,
                                );

                                return (
                                    <View key={item.day} style={styles.dayContainer}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: 10,
                                            }}>
                                            <Text style={styles.dayText}>{item.day}</Text>
                                            <Text style={styles.openText}>
                                                {item.isOpen ? 'Availabe' : 'Unavailabe'}
                                            </Text>
                                            <CustomSwitch
                                                isEnabled={item?.isOpen}
                                                toggleSwitch={() => toggleOpen(index)}
                                            />
                                        </View>
                                        <View style={styles.timeContainer}>
                                            {renderTimePicker(
                                                item.openingTime,
                                                value => updateTime(index, 'openingTime', value),
                                                timeOptions,
                                            )}
                                            <Text style={styles.toText}>To</Text>
                                            {renderTimePicker(
                                                item.closingTime,
                                                value => updateTime(index, 'closingTime', value),
                                                validClosingOptions,
                                            )}
                                        </View>
                                        <View
                                            style={{
                                                alignSelf: 'flex-start',
                                                paddingVertical: (mobileW * 3) / 100,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <Image
                                                source={Images?.PlusWithLightBAck}
                                                style={styles?.backIcon}
                                            />
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    {
                                                        color: Colors.primary,
                                                        left: (mobileW * 2) / 100,
                                                        fontWeight: '700',
                                                        fontSize: mobileW * 3.5 / 100
                                                    },
                                                ]}>
                                                Add Timeframe
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{ width: mobileW * 90 / 100, alignSelf: 'center' }}>
                            <CommonButton
                                onPress={() => {
                                    onClose();
                                    onPressSave(schedule)
                                }}
                                title={'Save'}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default AvailabilityModal;

const styles = StyleSheet.create({
    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '100%', maxHeight: '100%', backgroundColor: Colors.white, borderRadius: 10, },
    subContainer: { padding: 20 },
    dayContainer: { marginBottom: 15 },
    rowContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    dayText: { flex: 1, fontSize: 14, color: '#301E39', fontWeight: '600' },
    openText: { marginRight: 10, fontSize: 14, color: '#301E39', fontWeight: '400' },
    timeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    pickerContainer: { flex: 1, borderWidth: 1, borderColor: '#EEE6F1', borderRadius: 5 },
    timePicker: { width: '100%', height: 50, color: '#000' },
    toText: { marginHorizontal: 5, fontSize: 14, color: '#9E98AC', fontWeight: '400' },
    selectLocationButton: {
        backgroundColor: '#8D10B5',
        width: (mobileW * 90) / 100,
        borderRadius: DimensionsConfig?.buttonHeight * 0.18,
        paddingVertical: DimensionsConfig?.buttonHeight * 0.28,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: (mobileH * 15) / 100,
        position: 'absolute',
        bottom: (mobileH * 2) / 100,
    },
    selectionButtonTxt: {
        fontSize: (mobileW * 4) / 100,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    subContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    dayContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    dayText: {
        flex: 1,
        fontSize: 14,
        color: '#301E39',
        fontWeight: '600',
    },
    openText: {
        marginRight: 10,
        fontSize: 14,
        color: '#301E39',
        fontWeight: '400',
    },
    timeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 2,
    },
    pickerContainer: {
        width: mobileW * 0.4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEE6F1',
        marginHorizontal: 5,
    },
    timePicker: {
        width: '100%',
        height: mobileH * 0.07, // Adjust height as needed
        color: '#000', // Customize text color inside picker if needed
    },
    toText: {
        fontSize: 14,
        color: '#9E98AC',
        fontWeight: '400',
        marginHorizontal: 5,
        fontFamily: 'Inter',
    },
    closedText: {
        fontSize: 14,
        color: '#A0A0A0',
        fontStyle: 'italic',
    },
    backIcon: {
        width: (mobileW * 5) / 100,
        height: (mobileW * 5) / 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: (mobileW * 5) / 100,
        paddingVertical: (mobileW * 5) / 100,
        borderBottomColor: '#ebedf4',
        borderBottomWidth: (mobileW * 0.5) / 100,
    },
    headerBackIconView: {
        backgroundColor: '#FFFFFF',
        width: (mobileW * 10) / 100,
        height: (mobileW * 10) / 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (mobileH * 5) / 100,
    },
    backIcon: {
        width: (mobileW * 4.5) / 100,
        height: (mobileW * 4.5) / 100,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 15,
        color: '#000',
    },
});
