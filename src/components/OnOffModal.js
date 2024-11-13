import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';

const OnOffModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} hitSlop={100} style={styles?.CloserView} />
        <Text style={styles.title}>Turn On/Off Bookings</Text>
        <Text style={styles.summaryTxt}>Toggle to pause bookings for today. This will temporarily stop any new appointments from being scheduled.</Text>
      </View>
    </Modal>
  );
};

export default OnOffModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000090',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: DimensionsConfig.screenWidth * 0.05,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 15,
    textAlign: 'center',
    marginTop:10
  },
  summaryTxt: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 15,
    color: '#554F67',
  },
  timeText: {
    fontSize: 15,
    color: '#554F67',
  },
  CloserView:{
    height: DimensionsConfig?.screenHeight * 0.008,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10
  }
});
