import React, { useEffect, useState } from 'react';
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
import { Images } from '../../assets/images';
import { mobileH, mobileW } from '../utils';
import { Colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetSelectedServicesAction } from '../../redux/action/GetSelectedServicesAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategoryAction } from '../../redux/action/GetCategoryAction';
import { GetServicesDetailAction } from '../../redux/action/GetServicesDetailAction';
import { DimensionsConfig } from '../../theme/dimensions';

const ServiceSelector = ({
  visible,
  onClose,
  onSelectService,
  tabs,
  services,
}) => {
  const dispatch = useDispatch();
  const getSelectedServiceData = useSelector((state) => state.getSelectedServiceData);
  const getServicesDetailData = useSelector((state) => state.getServicesDetailData);
  const [activeTab, setActiveTab] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectServiceDetail, setSelectServiceDetail] = useState({});
  const [subServices, setSubServices] = useState([]);

  const handleServiceSelect = service => {
    onSelectService({service : service , selectServiceDetail : selectServiceDetail});
    onClose(); // Close modal after selection
  };

  useEffect(() => {
    if (getSelectedServiceData?.response?.result?.length > 0) {
      // console.log('getSelectedServiceData?.response?.result', getSelectedServiceData?.response?.result)
      setSelectedServices(getSelectedServiceData?.response?.result)
      setActiveTab(getSelectedServiceData?.response?.result[0]?.category_id)
      setSelectServiceDetail(getSelectedServiceData?.response?.result[0])
      fetchSubServiceData(getSelectedServiceData?.response?.result[0]?.category_id)
    }
  }, [getSelectedServiceData])

   useEffect(() => {
     console.log('getServicesDetailData?.response', getServicesDetailData?.response)
      if (getServicesDetailData?.response?.message == 'success') {
        setSubServices(getServicesDetailData?.response?.result)
      } else{
        setSubServices([])
      }
    }, [getServicesDetailData]);

  useEffect(() => {
    if (visible) {
      GetSelectedServices()
    }

  }, [visible])

  const fetchSubServiceData = async (category_id) => {
    const userId = await AsyncStorage.getItem('token')
    // console.log('category_id===>' , category_id)
    dispatch(GetServicesDetailAction({
      business_id: userId,
      category_id: category_id,
      service_type : ''
    }))
  }

  const GetSelectedServices = async () => {
    const userId = await AsyncStorage.getItem('token')
    const params = {
      business_id: userId
    }
    dispatch(GetSelectedServicesAction(params))
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose} // Support for Android Back Button
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>

          {/* Dynamic Tabs */}
          <View style={{
            height: DimensionsConfig.screenHeight * 0.08
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}>
            {selectedServices.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabButton,
                  activeTab === tab?.category_id ? styles.activeTab : null,
                ]}
                onPress={() => {
                  setSelectServiceDetail(tab)
                  fetchSubServiceData(tab.category_id)
                  setActiveTab(tab.category_id)}}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab?.category_id ? styles.activeTabText : null,
                  ]}>
                  {tab?.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          </View>

          {/* Service List */}
          <FlatList
            data={subServices}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({ item }) => (
              <View style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{item.service}</Text>
                  <Text style={styles.servicePrice}>
                    {'From ' + item.price}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={Images?.Like} style={styles.forwardIcon} />
                  <Text style={styles.serviceRating}>
                    {item.rating} ({item.reviews})
                  </Text>
                </View>
                <Text style={styles.serviceDuration}>
                  Duration: {item.duration}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleServiceSelect(item)}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                  <Image source={Images?.downError} style={styles.downIcon} />
                </View>
                <View style={styles.straightLine} />
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ServiceSelector;

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: mobileH * 2
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '95%',
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
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#301E39',
  },
  servicePrice: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  serviceRating: {
    color: '#554F67',
    marginVertical: 5,
    left: 10,
    fontSize: 13,
    fontWeight: '400',
  },
  serviceDuration: {
    color: '#554F67',
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '400',
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
    fontWeight: '600',
    fontSize: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
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
});
