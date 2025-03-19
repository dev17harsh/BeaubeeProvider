import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { mobileW } from '../utils';

const PrepaidOptionModal = ({
  visible,
  onFirstBtn,
  onSecondBtn,
  onClose,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          {/* Pause Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onFirstBtn}
            style={[
              styles.pauseButton,
              {
                backgroundColor:
                 Colors.primary
              },
            ]}>
            <Text style={styles.pauseButtonText}>
              Add Prepaid Package
              {/* Default text if not passed */}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onSecondBtn}
            style={[
              styles.pauseButton,
              {
                backgroundColor:Colors.primary
              },
            ]}>
            <Text style={styles.pauseButtonText}>
              Add Prepaid
              {/* Default text if not passed */}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.cancelButton,
            ]}
            onPress={onClose}>
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Default props for modal text, button text, and button background colors
PrepaidOptionModal.defaultProps = {
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
    width: '88%',
    backgroundColor: 'white',
    borderRadius: 19,
    alignItems: 'center',
    paddingVertical: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    width: '90%',
    color: '#301E39',
  },
  pauseButton: {
    width: '95%',
    padding: 14,
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
    width: '95%',
    padding: 14,
    // backgroundColor: '#f2f2f2', // Default background color
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 7,
  },
  cancelButtonText: {
    color: '#a14ebe',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrepaidOptionModal;
