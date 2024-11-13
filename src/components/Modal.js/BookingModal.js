import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../theme/colors';
import {mobileW} from '../utils';

const BookingModal = ({
  visible,
  onFirstBtn,
  onClose,
  type,
  buttonBackgroundColor,
  cancelButtonBackgroundColor,
  buttonText,
  cancelButtonText,
  modalText, // New prop for customizable modal text
  midText,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Customizable Modal Text */}
          <Text style={styles.modalText}>
            {modalText ||
              `Are you sure you want to ${
                type ? 'pause' : 'resume'
              } the bookings for today?`}
          </Text>
          {midText ? (
            <Text
              style={{
                paddingHorizontal: 15,
                textAlign: 'center',
                fontSize: (mobileW * 3.5) / 100,
                color: '#554F67',
              }}>
              {midText}
            </Text>
          ) : null}
          <View style={{marginTop: 20}} />

          {/* Pause Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onFirstBtn}
            style={[
              styles.pauseButton,
              {
                backgroundColor:
                  buttonBackgroundColor || (type ? Colors.primary : Colors.red),
              },
            ]}>
            <Text style={styles.pauseButtonText}>
              {buttonText || 'Pause Bookings'}{' '}
              {/* Default text if not passed */}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.cancelButton,
              {backgroundColor: cancelButtonBackgroundColor || '#f2f2f2'}, // Default gray
            ]}
            onPress={onClose}>
            <Text style={styles.cancelButtonText}>
              {cancelButtonText || 'Cancel'} {/* Default text if not passed */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Default props for modal text, button text, and button background colors
BookingModal.defaultProps = {
  buttonBackgroundColor: Colors.red, // Default color for Pause button
  cancelButtonBackgroundColor: '#f2f2f2', // Default color for Cancel button
  buttonText: 'Pause Bookings', // Default text for Pause button
  cancelButtonText: 'Cancel', // Default text for Cancel button
  modalText: null, // No default text for modal message, so parent screen can customize it
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: (mobileW * 8) / 100,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    width: '90%',
    color: Colors.black,
  },
  pauseButton: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.red, // Default red, but will be overridden
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f2f2f2', // Default background color
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#a14ebe',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingModal;
