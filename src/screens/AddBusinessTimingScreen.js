import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    Modal,
    Button,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'
import { Colors } from '../theme/colors';
import { Picker } from '@react-native-picker/picker';
import CustomSwitch from '../components/CustomSwitch';
import { DimensionsConfig } from '../theme/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { signupUserAction, signupUserRemoveAction } from '../redux/action/SignUpAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateTimeOptions = () => {
    const times = [];
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    for (let i = 0; i < 48; i++) {
        times.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase());
        date.setMinutes(date.getMinutes() + 30);
    }
    return times;
};

const timeOptions = generateTimeOptions();

const AddBusinessTimingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const signUpData = useSelector((state) => state.signUpData);

    const [schedule, setSchedule] = useState(
        daysOfWeek.map(day => ({
            day,
            status: day !== 'Saturday' && day !== 'Sunday',
            time_range: {
                start: "12:00 am",
                end: "12:30 am"
            },
        }))
    );

    const [iosPicker, setIosPicker] = useState({ visible: false, index: null, type: null });

    useEffect(() => {
        if (signUpData?.response?.message == 'success') {
            navigation.navigate('AddServicesScreen')
            dispatch(signupUserRemoveAction({}))
        }
    }, [signUpData])

    const toggleOpen = (index) => {
        const newSchedule = [...schedule];
        newSchedule[index].status = !newSchedule[index].status;
        setSchedule(newSchedule);
    };

    const updateTime = (index, type, value) => {
        const newSchedule = [...schedule];
        if (type === 'openingTime') {
            newSchedule[index].time_range.start = value;
            if (timeOptions.indexOf(value) >= timeOptions.indexOf(newSchedule[index].time_range.end)) {
                const newClosingTimeIndex = timeOptions.indexOf(value) + 1;
                newSchedule[index].time_range.end = timeOptions[newClosingTimeIndex] || timeOptions[timeOptions.length - 1];
            }
        } else {
            newSchedule[index].time_range.end = value;
        }
        setSchedule(newSchedule);
    };

    const transformSchedule = (schedule) => {
        return {
            day: schedule.map(item => item.day),
            status: schedule.map(item => item.status),
            start: schedule.map(item => item.time_range.start),
            end: schedule.map(item => item.time_range.end)
        };
    }

    const onPressSubmit = async () => {
        const userId = await AsyncStorage.getItem('token')
        const values = transformSchedule(schedule)
        const formData = new FormData();
        formData.append('business_id', userId);
        formData.append('day_of_week', values.day);
        formData.append('start_time', values.start);
        formData.append('end_time', values.end);
        formData.append('business_status', values.status);
        console.log('formData', formData)

        await dispatch(signupUserAction(formData));
    }

    const renderTimePicker = (time, onChange, options, status, index, type) => {
        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity
                    style={[styles.pickerContainer, !status && { backgroundColor: '#f5f5f5' }]}
                    disabled={!status}
                    onPress={() => setIosPicker({ visible: true, index, type })}
                >
                    <Text style={{ color: status ? '#000' : Colors.OrGray }}>
                        {time}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={time}
                    style={[styles.timePicker, !status && { color: Colors.OrGray }]}
                    onValueChange={onChange}
                    mode="dropdown"
                    enabled={status}
                >
                    {options.map((timeOption) => (
                        <Picker.Item label={timeOption} value={timeOption} key={timeOption} />
                    ))}
                </Picker>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <AppHeader title={"Timings"} />
                <ScrollView contentContainerStyle={{ paddingBottom: (mobileW * 18) / 100 }}>
                    <View style={styles.subContainer}>
                        {schedule.map((item, index) => {
                            const validClosingOptions = timeOptions.slice(timeOptions.indexOf(item.time_range.start) + 1);

                            return (
                                <View key={item.day} style={styles.dayContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                        <Text style={styles.dayText}>{item.day}</Text>
                                        <Text style={styles.openText}>{item.status ? "Open" : "Closed"}</Text>
                                        <CustomSwitch
                                            isEnabled={item?.status}
                                            toggleSwitch={() => toggleOpen(index)}
                                        />
                                    </View>
                                    <View style={styles.timeContainer}>
                                        {renderTimePicker(
                                            item.time_range.start,
                                            (value) => updateTime(index, 'openingTime', value),
                                            timeOptions,
                                            item?.status,
                                            index,
                                            'openingTime'
                                        )}
                                        <Text style={styles.toText}>To</Text>
                                        {renderTimePicker(
                                            item.time_range.end,
                                            (value) => updateTime(index, 'closingTime', value),
                                            validClosingOptions,
                                            item?.status,
                                            index,
                                            'closingTime'
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={onPressSubmit} style={styles.selectLocationButton}>
                    <Text style={styles.selectionButtonTxt}>Save Location</Text>
                </TouchableOpacity>
            </View>

            {/* iOS Modal Picker */}
            {iosPicker.visible && (
                <Modal transparent animationType="slide" visible={iosPicker.visible}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: '#fff', paddingBottom: 20 }}>
                            <Picker
                                selectedValue={
                                    schedule[iosPicker.index].time_range[iosPicker.type === 'openingTime' ? 'start' : 'end']
                                }
                                onValueChange={(val) => updateTime(iosPicker.index, iosPicker.type, val)}
                            >
                                {(iosPicker.type === 'openingTime'
                                    ? timeOptions
                                    : timeOptions.slice(timeOptions.indexOf(schedule[iosPicker.index].time_range.start) + 1)
                                ).map((opt) => (
                                    <Picker.Item key={opt} label={opt} value={opt} />
                                ))}
                            </Picker>
                            <Button title="Done" onPress={() => setIosPicker({ visible: false, index: null, type: null })} />
                        </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EEE6F1',
        marginHorizontal: 5,
        height: mobileW * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timePicker: {
        width: '100%',
        height: '100%',
        color: '#000',
    },
    toText: {
        fontSize: 14,
        color: '#9E98AC',
        fontWeight: '400',
        marginHorizontal: 5,
        fontFamily: 'Inter'
    },
})
