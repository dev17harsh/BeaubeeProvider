import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors} from '../theme/colors';
import {DimensionsConfig} from '../theme/dimensions';
import CommonButton from './CommonButton';
import {mobileW} from './utils';
import {Images} from '../assets/images';

const ProfileCard = ({
  visible,
  onClose,
  profileImage,
  name,
  serviceName,
  price,
  addOns,
  assistantImage,
  assistantName,
  rating,
  reviews,
  onAddAmendPress,
  onCompletePress,
  navigation
}) => {
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
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.name}>{name}</Text>

          <View style={styles.serviceContainer}>
            <View style={styles.serviceRow}>
              <Text style={styles.serviceName}>{serviceName}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <Text style={styles.addOns}>
              Add Ons: <Text style={styles.boldText}>{addOns}</Text>
            </Text>

            <View style={styles.straightLine} />

            <View style={styles.assistantContainer}>
              <Image source={assistantImage} style={styles.assistantImage} />
              <View style={styles.assistantInfo}>
                <Text style={styles.assistantName}>{assistantName}</Text>
                <View style={styles.ratingRow}>
                  <Image source={Images?.activeStar} style={styles.starIcon} />
                  <Text style={styles.rating}>
                    {rating}
                    <Text style={styles.review}> ({reviews} Reviews)</Text>
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onAddAmendPress}>
              <Image source={Images?.Edit} style={styles.starIcon} />
              <Text style={styles.buttonText}>Add/Amend</Text>
            </TouchableOpacity>
          </View>

          <CommonButton
            title={'Mark as Complete'}
            onPress={() => {onCompletePress()}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProfileCard;

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
    paddingVertical: 10,
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
    height: DimensionsConfig?.screenHeight * 0.006,
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
    width: (mobileW * 20) / 100,
    height: (mobileW * 20) / 100,
    borderRadius: (mobileW * 10) / 100,
    marginBottom: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0D0E11',
    marginBottom: 16,
  },
  serviceContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    paddingVertical: (mobileW * 4) / 100,
    borderWidth: 1,
    borderColor: '#F6EFF9',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D0E11',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  addOns: {
    fontSize: 12,
    color: '#301E39',
  },
  boldText: {
    fontWeight: '700',
  },
  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 1) / 100,
  },
  assistantInfo: {
    left: 6,
  },
  assistantImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 6.5) / 100,
    marginRight: 8,
  },
  assistantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 1) / 100,
  },
  rating: {
    fontSize: 12,
    color: '#301E39',
    marginLeft: 4,
    fontWeight: '600',
  },
  review: {
    fontSize: 12,
    color: '#554F67',
    marginLeft: 4,
    fontWeight: '400',
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
    fontSize: 14,
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
    marginVertical: (mobileW * 4) / 100,
    // marginTop: (mobileW * 2) / 100,
  },
  starIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
});
