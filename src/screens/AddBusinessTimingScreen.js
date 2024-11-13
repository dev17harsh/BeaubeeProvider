import {
    View,
    Text,
    Switch,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
 } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../components/AppHeader'
import { Colors } from '../theme/colors';
import { Picker } from '@react-native-picker/picker';
import CustomSwitch from '../components/CustomSwitch';
import { DimensionsConfig } from '../theme/dimensions';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Generate time slots in 30-minute intervals
const generateTimeOptions = () => {
    const times = [];
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    for (let i = 0; i < 48; i++) {
        times.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        date.setMinutes(date.getMinutes() + 30);
    }
    return times;
};

const timeOptions = generateTimeOptions();

const AddBusinessTimingScreen = ({navigation}) => {
    const [schedule, setSchedule] = useState(
        daysOfWeek.map(day => ({
            day,
            isOpen: day !== 'Saturday' && day !== 'Sunday',
            openingTime: '12:00 PM',
            closingTime: '12:30 PM',
        }))
    );

    const toggleOpen = (index) => {
        const newSchedule = [...schedule];
        newSchedule[index].isOpen = !newSchedule[index].isOpen;
        setSchedule(newSchedule);
    };

    const updateTime = (index, type, value) => {
        const newSchedule = [...schedule];
        if (type === 'openingTime') {
            newSchedule[index].openingTime = value;
            // If opening time is set later than closing time, adjust closing time to be at least 30 mins later
            if (timeOptions.indexOf(value) >= timeOptions.indexOf(newSchedule[index].closingTime)) {
                const newClosingTimeIndex = timeOptions.indexOf(value) + 1;
                newSchedule[index].closingTime = timeOptions[newClosingTimeIndex] || timeOptions[timeOptions.length - 1];
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
            mode="dropdown"
        >
            {options.map((timeOption) => (
                <Picker.Item label={timeOption} value={timeOption} key={timeOption} />
            ))}
        </Picker>
    </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <AppHeader
                title={"Business Timings"}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: (mobileW * 8) / 100 }}>
                <View style={styles.subContainer}>
                    {schedule.map((item, index) => {
                        // Filter closing time options based on selected opening time
                        const validClosingOptions = timeOptions.slice(timeOptions.indexOf(item.openingTime) + 1);

                        return (
                            <View key={item.day} style={styles.dayContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}>
                                <Text style={styles.dayText}>{item.day}</Text>
                                <Text style={styles.openText}>{item.isOpen ? "Open" : "Closed"}</Text>
                                {/* <Switch
                                    value={item.isOpen}
                                    onValueChange={() => toggleOpen(index)}
                                    thumbColor={item.isOpen ? "#6A0DAD" : "#f4f3f4"}
                                    trackColor={{ false: "#767577", true: "#D8BFD8" }}
                                /> */}
                                <CustomSwitch 
                                isEnabled={item?.isOpen}
                                toggleSwitch={() => toggleOpen(index)}
                                />
                                </View>
                                <View style={styles.timeContainer}>
                                    {/* {item.isOpen ? (
                                        <> */}
                                            {renderTimePicker(item.openingTime, (value) => updateTime(index, 'openingTime', value), timeOptions)}
                                            <Text style={styles.toText}>To</Text>
                                            {renderTimePicker(item.closingTime, (value) => updateTime(index, 'closingTime', value), validClosingOptions)}
                                        {/* </>
                                    ) : (
                                        <Text style={styles.closedText}>Closed</Text>
                                    )} */}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.navigate('AddServicesScreen')}
                style={styles.selectLocationButton}>
                <Text style={styles.selectionButtonTxt}>Save Location and Timings</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddBusinessTimingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
    },
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
        fontWeight: '400'
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
        fontFamily: 'Inter'
    },
    closedText: {
        fontSize: 14,
        color: '#A0A0A0',
        fontStyle: 'italic',
    },
})