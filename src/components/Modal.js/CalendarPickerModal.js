import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';

const CustomCalendarModal = ({ visible, onClose, selectedDates , setSelectedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handleDatePress = (date) => {
    const isDateInPast = date.isBefore(moment().startOf('day'));
  
    if (isDateInPast) return; // Block past dates
  
    // Check if the selected date is before the current start date, and reset if so
    if (selectedDates.length === 1 && date.isBefore(selectedDates[0], 'day')) {
      setSelectedDates([date]); // Start a new range from the selected date
    } else if (selectedDates.length === 2) {
      // If two dates are already selected, reset and start a new range
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      const startDate = selectedDates[0];
      const endDate = date;
  
      // Ensure the range does not exceed 7 days
      const daysDifference = endDate.diff(startDate, 'days');
      if (daysDifference <= 7 && daysDifference > 0) {
        const range = [];
        for (let i = 0; i <= daysDifference; i++) {
          range.push(startDate.clone().add(i, 'days'));
        }
        setSelectedDates(range);
      }
    } else {
      // First date selected
      setSelectedDates([date]);
    }
  };
  

  const renderDaysOfWeek = () => {
    const daysOfWeek = moment.weekdaysShort(true); // Adjust to start on Sunday
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayContainer,
              item && selectedDates.some(date => date.isSame(item, 'day')) && styles.selectedDay
            ]}
            onPress={() => item && handleDatePress(item)}
            disabled={!item}
          >
            <Text style={[
              styles.dayText,
              item && item.isBefore(moment(), 'day') && styles.disabledDayText,
              item && selectedDates.some(date => date.isSame(item, 'day')) && { color: '#fff' }
            ]}>
              {item ? item.date() : ''}
            </Text>
          </TouchableOpacity>
        )}
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePreviousMonth}>
              <Text style={styles.arrowText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <Text style={styles.arrowText}>{">"}</Text>
            </TouchableOpacity>
          </View>

          {renderDaysOfWeek()}
          {renderDaysInMonth()}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'space-between',
    width: '100%',
  },
  arrowText: {
    fontSize: 20,
    color: '#6c379e',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 16,
    color: '#6c379e',
    fontWeight: 'bold',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
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
    backgroundColor: '#6c379e',
    borderRadius: 15,
  },
  disabledDayText: {
    color: '#ccc',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#6c379e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomCalendarModal;
