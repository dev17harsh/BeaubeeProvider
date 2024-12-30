// ServiceSelector.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {Images} from '../../assets/images';
import {mobileW} from '../utils';
import {Colors} from '../../theme/colors';
import {DimensionsConfig} from '../../theme/dimensions';

const SelectServiceModal = ({visible, onClose, onSelectService, services}) => {
  const handleServiceSelect = service => {
    onSelectService(service);
    onClose(); // Close modal after selection
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={100}
            style={styles?.CloserView}
          />
          {/* Dynamic Tabs */}
          {/* Service List */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: (mobileW * 2) / 100,
              paddingVertical: (mobileW * 2) / 100,
            }}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceDurationHeader}>{'August 2019'}</Text>
            </View>

            <Text style={styles.serviceTitleheader}>$34,100 AUD</Text>
          </View>
          <FlatList
            data={services}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{item.title}</Text>
                </View>

                <Text style={styles.serviceDuration}>
                  {item.duration}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectServiceModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    bottom: 0,
    position: 'absolute',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200EE',
  },
  tabText: {
    color: Colors.black,
    fontSize: (mobileW * 3.5) / 100,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6200EE',
  },
  serviceCard: {
    padding: 13,
    borderRadius: 8,
    marginVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (mobileW * 2) / 100,
    borderWidth: (mobileW * 0.2) / 100,
    borderColor: Colors.OrGray,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitleheader: {
    fontSize: 23,
    fontWeight: '600',
    color: Colors.black,
    marginTop:mobileW*1/100
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  serviceDurationHeader: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '400',
  },
  serviceDuration: {
    color: Colors.gray,
    marginBottom: 10,
    fontSize: 15,
    marginTop: 5,
    fontWeight:'400'
  },
  selectButton: {
    backgroundColor: Colors.semiPurpleLight,
    padding: 10,
    borderRadius: (mobileW * 1.5) / 100,
    alignItems: 'center',
    width: (mobileW * 78) / 100,
  },
  selectButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#6200EE',
    fontSize: 16,
  },
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  downIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  straightLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 3) / 100,
  },
  CloserView: {
    height: DimensionsConfig?.screenHeight * 0.004,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
