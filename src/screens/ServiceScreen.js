import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';
import AppHeader from '../components/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategoryAction } from '../redux/action/GetCategoryAction';
import { AddNewServiceAction, AddNewServiceDataClean } from '../redux/action/AddNewServiceAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetSelectedServicesAction } from '../redux/action/GetSelectedServicesAction';
import { useIsFocused } from '@react-navigation/native';

const service = [
  {
    id: '1',
    title: 'Hair',
    description: '5 services listed',
    icon: Images?.Hair,
  },
  {
    id: '2',
    title: 'Skincare',
    description: '5 services listed',
    icon: Images?.Skincare,
  },
  {
    id: '3',
    title: 'Nails',
    description: '5 services listed',
    icon: Images?.Nail,
  },
];

const ServiceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const getCategoryData = useSelector((state) => state.getCategoryData);
  const getSelectedServiceData = useSelector((state) => state.getSelectedServiceData);
  const addNewServiceData = useSelector((state) => state.addNewServiceData);
  const [allCategories, setAllCategories] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (getCategoryData?.response?.result) {
      const updatedCategories = mergeSelectedServices(
        getCategoryData?.response?.result,
        getSelectedServiceData?.response?.result
      );

      setAllCategories(updatedCategories);
    }
  }, [getCategoryData, getSelectedServiceData]);

  useEffect(() => {
    if (addNewServiceData?.response?.message == 'success') {
      GetSelectedServices()
      dispatch(AddNewServiceDataClean())
    }
  }, [addNewServiceData]);

  const mergeSelectedServices = (categories, selectedServices) => {
    const selectedIds = new Set(selectedServices?.map(service => service.category));

    return categories?.map(category => ({
      ...category,
      selected: selectedIds.has(category.name),
    }));
  };


  useEffect(() => {
    if (getSelectedServiceData?.response?.result) {
      setSelectedServices(getSelectedServiceData?.response?.result)
    }
  }, [getSelectedServiceData])

  useEffect(() => {
    GetSelectedServices()

  }, [isFocused])

  const GetSelectedServices = async () => {
    const userId = await AsyncStorage.getItem('token')
    const params = {
      business_id: userId
    }
    dispatch(GetSelectedServicesAction(params))
    dispatch(GetCategoryAction())
  }

  const AddRemoveService = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              hitSlop={100}
              style={styles?.CloserView}
            />
            <Text style={styles.modalHeader}>Add/Remove Services</Text>
            <ScrollView>
              {allCategories.map(service => (
                <View key={service.id} style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() => toggleServiceSelection(service.id)}>
                    <Image
                      source={
                        service.selected ? Images?.Check_Box : Images?.Unchecked
                      }
                      style={{
                        height: DimensionsConfig.screenHeight * 0.025,
                        width: DimensionsConfig.screenHeight * 0.025,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>{service.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const toggleServiceSelection = async (id) => {
    const userId = await AsyncStorage.getItem('token')
    let selectedServices = []
    setAllCategories(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, selected: !service.selected } : service,
      ),
    );
    selectedServices = allCategories
      .filter((service) => service?.selected)
      .map((service) => service.id);

    const isAlreadySelected = selectedServices.includes(id);

    if (isAlreadySelected) {
      selectedServices = await selectedServices.filter((serviceId) => serviceId !== id);
    } else {
      selectedServices.push(id);
    }

    const params = {
      business_id: userId,
      category_id: selectedServices
    }
    dispatch(AddNewServiceAction(params))
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text style={styles.header}>Services</Text> */}
        <AppHeader title={'Services'} />
        <View style={{
          flex: 1,
          paddingHorizontal: DimensionsConfig.screenHeight * 0.012,
          paddingTop: DimensionsConfig.screenHeight * 0.025,
        }}>
          <FlatList
            data={selectedServices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <View
                    style={{
                      height: DimensionsConfig.screenHeight * 0.06,
                      width: DimensionsConfig.screenHeight * 0.06,
                      backgroundColor: '#F6EFF9',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: (DimensionsConfig.screenHeight * 0.06) / 2,
                      marginRight: DimensionsConfig.screenHeight * 0.01,
                    }}>
                    <Image
                      source={{ uri: item?.category_image }}
                      style={{
                        height: DimensionsConfig.screenHeight * 0.028,
                        width: DimensionsConfig.screenHeight * 0.028,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.title}>{item.category}</Text>
                    <Text style={[styles.description]}>{item.total_services} services listed</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddUpdateServiceScreen' , {data : item});
                  }}>
                  <Image
                    source={Images?.VerticalThreeDot}
                    style={{
                      height: DimensionsConfig.screenHeight * 0.018,
                      width: DimensionsConfig.screenHeight * 0.018,
                      resizeMode: 'contain',
                    }}
                  />
                  {/* <Icon name="more-vert" size={24} color="#A020F0" />? */}
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image
            source={Images?.PlusWhite}
            style={{
              height: DimensionsConfig.screenHeight * 0.028,
              width: DimensionsConfig.screenHeight * 0.028,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        {AddRemoveService()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: DimensionsConfig.screenHeight * 0.012,
    // paddingTop: DimensionsConfig.screenHeight * 0.025,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#301E39',
    marginBottom: DimensionsConfig.screenHeight * 0.025,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: DimensionsConfig.screenHeight * 0.018,
    // backgroundColor: '#F7F7F7',
    borderWidth: 1.5,
    borderColor: '#F6EFF9',
    // borderRadius: DimensionsConfig.screenHeight * 0.001,
    marginBottom: DimensionsConfig.screenHeight * 0.02,
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    borderRadius: 15,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: DimensionsConfig.screenHeight * 0.02,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  description: {
    color: '#554F67',
    fontSize: 12,
    fontWeight: '400',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: DimensionsConfig.screenHeight * 0.07,
    height: DimensionsConfig.screenHeight * 0.07,
    backgroundColor: '#A020F0',
    borderRadius: (DimensionsConfig.screenHeight * 0.07) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: DimensionsConfig.screenHeight * 0.028,
    borderTopLeftRadius: DimensionsConfig.screenHeight * 0.028,
    borderTopRightRadius: DimensionsConfig.screenHeight * 0.028,
    maxHeight: '50%',
  },
  modalHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: DimensionsConfig.screenHeight * 0.02,
    color: '#301E39',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DimensionsConfig.screenHeight * 0.014,
  },
  checkboxLabel: {
    marginLeft: DimensionsConfig.screenHeight * 0.016,
    fontSize: 14,
    color: '#301E39',
    fontWeight: '400',
  },
  closeModalButton: {
    marginTop: DimensionsConfig.screenHeight * 0.028,
    padding: 10,
    backgroundColor: '#6A5ACD',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  CloserView: {
    height: DimensionsConfig?.screenHeight * 0.004,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -10,
  },
});

export default ServiceScreen;
