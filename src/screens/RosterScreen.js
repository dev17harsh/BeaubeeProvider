import React from 'react';
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

const RosterScreen = ({navigation}) => {

    const data = [
        { name: 'Peter M.', schedule: ['9am to 5pm', '', '', '', '', '', ''] },
        { name: 'Nick T.', schedule: ['', '7am to 10pm', '', '7am to 10pm', '', '', ''] },
        { name: 'Pope F.', schedule: ['11am to 5pm', '', '', '', '9am to 5pm', '', '11am to 5pm'] },
        { name: 'Leila E.', schedule: ['9am to 5pm', '', '', '', 'Add', 'Add', ''] },
        { name: 'Mia J.', schedule: ['9am to 5pm', '', '', '', '', '', 'Add'] },
    ];

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const renderSchedule = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            {item.schedule.map((slot, index) => (
                <View
                    key={index}
                    style={[
                        styles.cell,
                        slot && slot != 'Add' ? styles.filledCell : styles.emptyCell,
                    ]}
                >
                    {slot == 'Add' ? <View style={styles?.AddBtnView}><Text style={{
                        color: Colors?.white,
                        fontSize: 12,
                    }}>+</Text></View> :
                        <Text style={styles.cellText}>{slot}</Text>}
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            {/* Header */}
            <AppHeader title={"Roaster"} />

            {/* Calendar */}
            <View style={styles.calendar}>
                <View style={{
                    flexDirection: 'row',
                    width: 80,
                    alignItems: 'center'
                }}>
                    <Text style={styles.month}>Aug</Text>
                    <Image source={Images.EditPen} tintColor={Colors?.primary} style={styles.editIcon} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {days.map((day, index) => (
                        <View key={index} style={styles.calendarCell}>
                            <Text style={styles.dayText}>{day}</Text>
                            <Text style={styles.dateText}>{index + 1}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Schedule Table */}
            <FlatList
                data={data}
                renderItem={renderSchedule}
                keyExtractor={(item, index) => index.toString()}
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
        marginRight: DimensionsConfig.screenHeight * 0.024,
    },
    dayText: {
        fontSize: 12,
        color: '#666',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: DimensionsConfig.screenHeight * 0.01,
        paddingHorizontal: DimensionsConfig.screenHeight * 0.028,
    },
    name: {
        width: 80,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors?.primary,
    },
    cell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: DimensionsConfig.screenHeight * 0.006,
        paddingHorizontal: DimensionsConfig.screenHeight * 0.002,
        marginHorizontal: 2,
    },
    filledCell: {
        backgroundColor: '#f3e6fa',
        borderRadius: 5,
    },
    emptyCell: {
        backgroundColor: '#fff',
    },
    cellText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors?.primary,
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
