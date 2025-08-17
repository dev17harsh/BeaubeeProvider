import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import { DimensionsConfig } from '../theme/dimensions';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetRosterDetailsAction } from '../redux/action/GetRosterDetailsAction';
import DateTimePicker from '@react-native-community/datetimepicker';
import RosterOptionsModal from '../components/Modal.js/RosterOptionsModal';
import { DeleteRosterAction, DeleteRosterRemoveAction } from '../redux/action/DeleteRosterAction';

const RosterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const getRosterDetailsData = useSelector((state) => state.getRosterDetailsData);
    const deleteRosterData = useSelector((state) => state.deleteRosterData);
    const [rosterData, setRosterData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [days, setDays] = useState([]);
    const [showOptionModal, setOptionModal] = useState(false);
    const [selectedSatffData, setSelectedSatffData] = useState({});
    const [selectedDateData, setSelectedDateData] = useState({});
    const [selectedRosterData, setSelectedRosterData] = useState({});
    const scrollRef = useRef(null);
    const scrollRefHeader = useRef(null);


    const data = [
        { name: 'Peter M.', schedule: ['9am to 5pm', '', '', '', '', '', ''] },
        { name: 'Nick T.', schedule: ['', '7am to 10pm', '', '7am to 10pm', '', '', ''] },
        { name: 'Pope F.', schedule: ['11am to 5pm', '', '', '', '9am to 5pm', '', '11am to 5pm'] },
        { name: 'Leila E.', schedule: ['9am to 5pm', '', '', '', 'Add', 'Add', ''] },
        { name: 'Mia J.', schedule: ['9am to 5pm', '', '', '', '', '', 'Add'] },
    ];

    // const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        // console.log('getRosterDetailsData?.response?.result', getRosterDetailsData?.response?.result)
        if (Array.isArray(getRosterDetailsData?.response?.result)) {
            setRosterData(getRosterDetailsData?.response?.result)
        }
    }, [getRosterDetailsData])

    useEffect(() => {
        if (deleteRosterData?.response?.message == 'success') {
            //  navigation.goBack()
            dispatch(
                DeleteRosterRemoveAction({})
            )
            setSelectedSatffData({})
            setSelectedDateData({})
            setSelectedRosterData({})
            setOptionModal(false)
            getData()

        }
    }, [deleteRosterData])

    useEffect(() => {
        getData()
        generateMonthDays(selectedMonth);
    }, [isFocused, selectedMonth]);

    const getData = () => {
        const date = new Date(selectedMonth);
        const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        // console.log(formattedDate);
        dispatch(GetRosterDetailsAction({ date: formattedDate }));
    }

    const generateMonthDays = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // First day of the month
        const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Total days in month

        const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let result = [];

        for (let i = 1; i <= totalDays; i++) {
            const dayIndex = (firstDay + i - 1) % 7;
            result.push({
                day: weekDays[dayIndex],
                date: i,
            });
        }

        setDays(result);
    };

    const handleMonthChange = (event, date) => {
        setShowMonthPicker(false);
        if (date) {
            setSelectedMonth(date);
        }
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const syncScroll = (event, ref) => {
        if (ref.current) {
            ref.current.scrollToOffset({ offset: event.nativeEvent.contentOffset.x, animated: false });
        }
    };

    const renderSchedule = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.name}>{item.first_name} {item?.last_name?.split('')[0]}.</Text>
          {days ? ( <FlatList
                horizontal
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                data={days}
                style={{
                    marginRight: DimensionsConfig.screenHeight * 0.005
                }}
                keyExtractor={(day, index) => index.toString()}
                renderItem={({ item: day, index }) => {
                    const slot = item?.shift_index[index]?.timeslot || [];
                    return (
                        <TouchableOpacity disabled={slot.length > 0} onPress={() => {
                            // console.log('hittting ' , item.shift_index[index])
                            if (slot.length > 0) {

                            } else {
                                navigation.navigate('RosteringHours', { staffDetail: item, selectedData: item.shift_index[index] })
                            }
                        }} key={index} style={[{
                            borderWidth: DimensionsConfig.screenHeight * 0.001,
                            borderColor: '#eee'
                        }, index == 0 && { borderLeftWidth: DimensionsConfig.screenHeight * 0.0015, }, index - 1 && { borderRightWidth: DimensionsConfig.screenHeight * 0.0015 }]}>
                            {slot.length > 0 ? slot.map((slot, idf) => (
                                <TouchableOpacity
                                    key={idf}
                                    style={[
                                        styles.cell,
                                        slot && slot != 'Add' ? styles.filledCell : styles.emptyCell,
                                    ]}
                                    onPress={() => {
                                        setSelectedSatffData(item)
                                        setSelectedDateData(item.shift_index[index])
                                        setSelectedRosterData(slot)
                                        setOptionModal(true)
                                        // console.log('item ===>', item, "date  ===>", slot)
                                    }}
                                >
                                    {/* {slot == 'Add' ? <View style={styles?.AddBtnView}><Text style={{
                                                color: Colors?.white,
                                                fontSize: 12,
                                            }}>+</Text></View> : */}
                                    <Text style={styles.cellText}>{formatTime(slot?.start_time)} to {formatTime(slot.end_time)}</Text>
                                    {/* } */}
                                </TouchableOpacity>
                            )) : <View
                                key={index}
                                style={[
                                    styles.cell, styles.emptyCell,
                                ]}
                            >
                            </View>}
                        </TouchableOpacity>
                    );
                }}
                onScroll={(e) => syncScroll(e, scrollRefHeader)}
                scrollEventThrottle={30}
            />) : null} 
        </View>
    );
    const onPressRosterRemove = () => {
        dispatch(DeleteRosterAction({ roaster_id: selectedRosterData?.roaster_id }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <RosterOptionsModal visible={showOptionModal} onClose={() => {
                setOptionModal(false)
            }}
                onPressEdit={() => {
                    navigation.navigate('RosteringHours', { staffDetail: selectedSatffData, selectedData: selectedDateData, data: selectedRosterData, type: 'Edit' })
                }}
                onPressRemove={() => {
                    onPressRosterRemove()
                }}
            />
            <View style={styles.container}>
                {/* Header */}
                <AppHeader title={"Roaster"} />

                {/* Calendar */}
                <View style={styles.calendar}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        width: 80,
                        alignItems: 'center'
                    }}
                        onPress={() => setShowMonthPicker(true)}
                    >
                        <Text style={styles.month}>
                            {selectedMonth.toLocaleString('default', { month: 'short' })}
                        </Text>
                        <Image source={Images.EditPen} tintColor={Colors?.primary} style={styles.editIcon} />
                    </TouchableOpacity>
                    {/* <ScrollView horizontal
                        ref={scrollRefHeader}
                        onScroll={(e) => syncScroll(e, scrollRef)}
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}>
                        {days.map((item, index) => (
                            <View key={index} style={styles.calendarCell}>
                                <Text style={styles.dayText}>{item.day}</Text>
                                <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                        ))}
                    </ScrollView> */}
                    <FlatList
                        horizontal
                        ref={scrollRefHeader}
                        data={days}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.calendarCell}>
                                <Text style={styles.dayText}>{item.day}</Text>
                                <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                        )}
                        onScroll={(e) => syncScroll(e, scrollRef)}
                        scrollEventThrottle={30}
                    />
                </View>

                {/* Schedule Table */}
                <FlatList
                    data={rosterData}
                    renderItem={renderSchedule}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <View style={{ height: 100 }} />}
                />


                {/* Floating Action Button */}
                <TouchableOpacity style={styles.fab} onPress={() => {
                    navigation.navigate('RosteringHours')
                }} >
                    <Image source={Images?.PlusWhite} style={{
                        height: DimensionsConfig.screenHeight * 0.028,
                        width: DimensionsConfig.screenHeight * 0.028,
                        resizeMode: 'contain'
                    }} />
                </TouchableOpacity>

                {showMonthPicker && (
                    <DateTimePicker
                        value={selectedMonth}
                        mode='date'
                        display="spinner"
                        onChange={handleMonthChange}
                        minimumDate={new Date()} // Only allow selecting current and future months
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    calendar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: DimensionsConfig.screenHeight * 0.016,
        paddingHorizontal: DimensionsConfig.screenHeight * 0.028,
        marginTop: DimensionsConfig.screenHeight * 0.016,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    month: {
        fontSize: 16,
        color: Colors?.primary,
        // marginRight: 10,
        fontWeight: '600',
    },
    calendarCell: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: DimensionsConfig.screenHeight * 0.016,
    },
    dayText: {
        fontSize: 12,
        color: '#666',
        maxWidth: DimensionsConfig.screenWidth * 0.08
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        maxWidth: DimensionsConfig.screenWidth * 0.08
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        // paddingVertical: DimensionsConfig.screenHeight * 0.01,
        paddingHorizontal: DimensionsConfig.screenHeight * 0.028,
    },
    name: {
        width: DimensionsConfig.screenWidth * 0.2,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors?.primary,
    },
    cell: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: DimensionsConfig.screenHeight * 0.006,
        paddingHorizontal: DimensionsConfig.screenHeight * 0.002,
        marginHorizontal: 2,
    },
    filledCell: {
        backgroundColor: '#f3e6fa',
        borderRadius: 5,
        marginVertical: DimensionsConfig.screenWidth * 0.001
    },
    emptyCell: {
        backgroundColor: '#fff',
        width: DimensionsConfig.screenWidth * 0.081,
        height: DimensionsConfig.screenWidth * 0.1
    },
    cellText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors?.primary,
        maxWidth: DimensionsConfig.screenWidth * 0.081
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    editIcon: {
        width: (DimensionsConfig.screenHeight * 2.2) / 100,
        height: (DimensionsConfig.screenHeight * 2.2) / 100,
        marginLeft: 5
    },
    AddBtnView: {
        width: (DimensionsConfig.screenHeight * 2) / 100,
        height: (DimensionsConfig.screenHeight * 2) / 100,
        borderRadius: (DimensionsConfig.screenHeight * 0.4) / 100,
        backgroundColor: Colors?.lightGray,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default RosterScreen
