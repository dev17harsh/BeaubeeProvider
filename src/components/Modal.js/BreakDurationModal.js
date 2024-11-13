import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import CommonButton from '../CommonButton';
import { Colors } from '../../theme/colors';
import { DimensionsConfig } from '../../theme/dimensions';
import { mobileW } from '../utils';

const BreakDuratinModal = ({visible, onClose}) => {
  const numbers = Array.from({length: 60}, (_, index) => index + 1);
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
      {/* <View style={styles.modalContent}> */}

      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={100}
            style={styles?.CloserView}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: Colors.black,
              textAlign: 'center',
            }}>
            Select Break Duration (Minutes)
          </Text>
          <View style={{height: 300}}>
            <FlatList
              data={numbers}
              keyExtractor={item => item.toString()}
              contentContainerStyle={{alignItems: 'center'}}
              renderItem={({item}) => <Text style={styles.number}>{item}</Text>}
            />
          </View>
          <CommonButton title={'Submit'} onPress={() => onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default BreakDuratinModal;

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
    marginTop: 10,
  },
  summaryTxt: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  number: {
    fontSize: (mobileW * 5) / 100,
    marginTop: 4,
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
  CloserView: {
    height: DimensionsConfig?.screenHeight * 0.008,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: (mobileW * 22) / 100,
    height: (mobileW * 22) / 100,
    borderRadius: (mobileW * 11) / 100,
    marginBottom: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: (mobileW * 4.2) / 100,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black,
    marginBottom: 16,
  },
  serviceContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    paddingVertical: (mobileW * 3) / 100,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: 'bold',
    color: Colors.black,
  },
  price: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addOns: {
    fontSize: 14,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  assistantInfo: {
    left: 6,
  },
  assistantImage: {
    width: (mobileW * 13) / 100,
    height: (mobileW * 13) / 100,
    borderRadius: (mobileW * 6.5) / 100,
    marginRight: 8,
  },
  assistantName: {
    fontSize: (mobileW * 3.8) / 100,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.literPurple,
    padding: 10,
    borderRadius: (mobileW * 3) / 100,
    marginBottom: 8,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 3) / 100,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 8,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#6f3ef3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#6f3ef3',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  straightLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 2) / 100,
  },
  starIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
});
