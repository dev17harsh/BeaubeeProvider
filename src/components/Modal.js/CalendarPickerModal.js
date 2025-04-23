import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import { Colors } from '../../theme/colors';

const CustomCalendarModal = ({ visible, onClose, selectedDates, setSelectedDates , onPressDate}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handleDatePress = (date) => {
    const isDateInPast = date.isBefore(moment().startOf('day'));
    if (isDateInPast) return; // Block past dates

    const formattedDate = moment(date).format('YYYY-MM-DD'); // Format to YYYY-MM-DD
    onPressDate(formattedDate);
    onClose();
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = moment.weekdaysShort(true); // Start week on Sunday
    return (
      <View style={styles.daysRow}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayText}>{day}</Text>
        ))}
      </View>
    );
  };

  const renderDaysInMonth = () => {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const daysInMonth = [];

    // Fill empty days for the first row
    for (let i = 0; i < startOfMonth.day(); i++) {
      daysInMonth.push(null);
    }

    // Add days in the current month
    for (let day = 1; day <= endOfMonth.date(); day++) {
      daysInMonth.push(currentMonth.clone().date(day));
    }

    return (
      <FlatList
        data={daysInMonth}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelected = item && selectedDates === item.format('YYYY-MM-DD');

          const isDisabled = item && item.isBefore(moment(), 'day');

          return (
            <TouchableOpacity
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDay
              ]}
              onPress={() => item && handleDatePress(item)}
              disabled={!item || isDisabled}
            >
              <Text style={[
                styles.dayText,
                isDisabled && styles.disabledDayText,
                isSelected && { color: '#fff' }
              ]}>
                {item ? item.date() : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.clone().add(1, 'month'));
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableOpacity onPress={onClose} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            {/* <TouchableOpacity hitSlop={40} onPress={handlePreviousMonth}>
              <Text style={styles.arrowText}>{"<"}</Text>
            </TouchableOpacity> */}
            <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
            {/* <TouchableOpacity hitSlop={40} onPress={handleNextMonth}>
              <Text style={styles.arrowText}>{">"}</Text>
            </TouchableOpacity> */}
          </View>

          {renderDaysOfWeek()}
          {renderDaysInMonth()}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  arrowText: {
    fontSize: 20,
    color: '#301E39',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 16,
    color: '#6c379e',
    fontWeight: '700',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 13,
    color: '#554F67',
    fontWeight: '500',
    width: 30,
    textAlign: 'center',
  },
  dayContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedDay: {
    backgroundColor: Colors?.primary,
    borderRadius: 15,
  },
  disabledDayText: {
    color: '#ccc',
  },
});

export default CustomCalendarModal;
