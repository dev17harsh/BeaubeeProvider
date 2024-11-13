import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../theme/colors';
import {mobileH, mobileW} from './utils';

const CustomAlert = ({visible, onClose, onConfirm, message}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.message}>
            {message || 'Are you sure you want to reject this booking request?'}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.rejectButton}
              onPress={onConfirm}>
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.noButton}
              onPress={onClose}>
              <Text style={styles.noText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: (mobileW * 4) / 100,
    textAlign: 'center',
    marginBottom: (mobileW * 8) / 100,
    fontWeight: '600',
    color: Colors.black,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  rejectButton: {
    backgroundColor: '#ffeef0',
    paddingVertical: (mobileW * 3) / 100,
    paddingHorizontal: (mobileW * 10) / 100,
    borderRadius: 8,
    width: (mobileW * 32) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    color: '#fc6076',
    fontWeight: 'bold',
  },
  noButton: {
    backgroundColor: Colors.semiPurpleLight,
    paddingVertical: (mobileW * 3) / 100,
    paddingHorizontal: (mobileW * 10) / 100,
    borderRadius: 8,
    width: (mobileW * 32) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noText: {
    color: '#a165e0',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
