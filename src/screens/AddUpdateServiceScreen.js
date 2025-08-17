import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../theme/colors'
import AppHeader from '../components/AppHeader'
import { DimensionsConfig } from '../theme/dimensions'
import { Images } from '../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { GetServicesDetailAction } from '../redux/action/GetServicesDetailAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const services = [
  {
    id: '1',
    name: 'Straight Hair',
    price: '$60.00',
    duration: '45 minutes',
    addons: 'Add On 1, Add On 2',
  },
  {
    id: '2',
    name: 'Buzz Cut',
    price: '$60.00',
    duration: '45 minutes',
    addons: '',
  },
  {
    id: '3',
    name: 'Hair Cut 3',
    price: '$60.00',
    duration: '45 minutes',
    addons: '',
  },
  {
    id: '4',
    name: 'Hair Cut 4',
    price: '$60.00',
    duration: '45 minutes',
    addons: '',
  },
  {
    id: '5',
    name: 'Hair Cut 5',
    price: '$60.00',
    duration: '45 minutes',
    addons: '',
  },
];

const ComibeSave = [
  {
    id: '1',
    name: 'Glamour Glow Bundle',
    price: '$60.00',
    duration: '45 minutes',
    addons: 'Add On 1, Add On 2',
  },
  {
    id: '2',
    name: 'Bridal Bliss Bundle',
    price: '$60.00',
    duration: '45 minutes',
    addons: '',
  },
];

const AddUpdateServiceScreen = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const getServicesDetailData = useSelector((state) => state.getServicesDetailData);
  const [activeTab, setActiveTab] = useState('Service');
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData('Service')
  }, [isFocused])

  const fetchData = async (activeTab) => {
    const userId = await AsyncStorage.getItem('token')
    // console.log('props?.route?.params?.data?.id', props?.route?.params?.data?.category_id, activeTab)
    dispatch(GetServicesDetailAction({
      business_id: userId,
      category_id: props?.route?.params?.data?.category_id,
      // business_id: '8',
      // category_id: '28',
      service_type: activeTab
    }))
  }

  useEffect(() => {
    if (getServicesDetailData?.response?.message == 'success') {
      console.log('getServicesDetailData?.response', getServicesDetailData?.response)
      setData(getServicesDetailData?.response?.result)
    }
  }, [getServicesDetailData]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppHeader
          title={`${props?.route?.params?.data?.category} Services`}
        />
        <View style={styles?.subContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => {
              fetchData('Service')
              setActiveTab('Service')
            }} style={[styles.tabButton, activeTab == 'Service' && styles.tabInactive]}>
              <Text style={styles.tabText}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              fetchData('Combine')
              setActiveTab('Combine')
            }} style={[styles.tabButton, activeTab == 'Combine' && styles.tabInactive]}>
              <Text style={[styles.tabText]}>Combine & Save</Text>
            </TouchableOpacity>
          </View>
          {activeTab == 'Service' ? (
            <>
              {data.length > 0 ? (
                <View style={{ height: DimensionsConfig?.screenHeight * 0.8 }}>
                  <View style={styles.insideConatiner}>
                    <FlatList
                      data={data}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <View style={styles.serviceItem}>
                          <View style={styles.serviceInfo}>
                            <Text style={styles.name}>{item.service}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                            <Text style={styles.details}>Duration: {item.duration}</Text>
                            {item.addons ? <Text style={styles.addons}>Add Ons: <Text style={{ fontWeight: '700' }}>{item.addons}</Text></Text> : null}
                          </View>
                          <TouchableOpacity style={styles.editButton} onPress={() => {
                            navigation.navigate('AddEditSubServices', { type: activeTab, data: props?.route?.params?.data })
                          }}>
                            <Image source={Images.EditPen} style={styles.editIcon} />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                  <TouchableOpacity style={styles.fab} onPress={() => {
                    navigation.navigate('AddEditSubServices', { type: activeTab, data: props?.route?.params?.data })
                  }} >
                    <Image source={Images?.PlusWhite} style={{
                      height: DimensionsConfig.screenHeight * 0.028,
                      width: DimensionsConfig.screenHeight * 0.028,
                      resizeMode: 'contain'
                    }} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ height: DimensionsConfig?.screenHeight * 0.7, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles?.AddServiceHeadingTxt}>Add a Hair Service</Text>
                  <TouchableOpacity style={styles?.AddServiceBtnView} onPress={() => {
                    navigation.navigate('AddEditSubServices', { type: activeTab, data: props?.route?.params?.data })
                  }}>
                    <View style={styles.plusCircle}>
                      <Image source={Images?.PlusWhite} style={{
                        height: DimensionsConfig.screenHeight * 0.02,
                        width: DimensionsConfig.screenHeight * 0.02,
                        resizeMode: 'contain'
                      }} />
                    </View>
                    <Text style={styles?.AddServidsTxt}>Add a service</Text></TouchableOpacity>
                </View>)}
            </>
          ) : (
            <>
              {data.length > 0 ? (
                <View style={{ height: DimensionsConfig?.screenHeight * 0.8 }}>
                  <View style={styles.insideConatiner}>
                    <FlatList
                      data={data}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <View style={styles.serviceItem}>
                          <View style={styles.serviceInfo}>
                            <Text style={styles.name}>{item.service}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                            <Text style={styles.details}>Duration: {item.duration}</Text>
                            {item.addons ? <Text style={styles.addons}>Add Ons: <Text style={{ fontWeight: '700' }}>{item.addons}</Text></Text> : null}
                          </View>
                          <TouchableOpacity style={styles.editButton} onPress={() => {
                            navigation.navigate('AddEditSubServices', { type: activeTab, data: props?.route?.params?.data })
                          }}>
                            <Image source={Images.EditPen} style={styles.editIcon} />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                  <TouchableOpacity style={styles.fab} onPress={() => {
                    navigation.navigate('AddEditSubServices', { type: activeTab, data: props?.route?.params?.data })
                  }}>
                    <Image source={Images?.PlusWhite} style={{
                      height: DimensionsConfig.screenHeight * 0.028,
                      width: DimensionsConfig.screenHeight * 0.028,
                      resizeMode: 'contain'
                    }} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ height: DimensionsConfig?.screenHeight * 0.7, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles?.AddServiceHeadingTxt}>{"Add a Combine & Save\n Service"}</Text>
                  <TouchableOpacity style={styles?.AddServiceBtnView} onPress={() => {
                    navigation.navigate('AddEditSubServices', { type: activeTab, data: props?.route?.params?.data })
                  }}>
                    <View style={styles.plusCircle}>
                      <Image source={Images?.PlusWhite} style={{
                        height: DimensionsConfig.screenHeight * 0.02,
                        width: DimensionsConfig.screenHeight * 0.02,
                        resizeMode: 'contain'
                      }} />
                    </View>
                    <Text style={styles?.AddServidsTxt}>Add a service</Text></TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddUpdateServiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6EFF9',
    borderRadius: DimensionsConfig?.screenHeight * 0.015,
    padding: DimensionsConfig?.screenHeight * 0.008,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DimensionsConfig?.screenHeight * 0.015,
    borderRadius: DimensionsConfig?.screenHeight * 0.015,
  },
  tabInactive: {
    backgroundColor: Colors?.white,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors?.black
  },
  inactiveText: {
    color: '#a0a0a0',
  },
  subContainer: {
    padding: DimensionsConfig?.screenHeight * 0.014
  },
  AddServiceHeadingTxt: {
    color: '#0D0E11',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center'
  },
  AddServiceBtnView: {
    padding: DimensionsConfig?.screenHeight * 0.014,
    backgroundColor: Colors?.primary,
    borderRadius: DimensionsConfig?.screenHeight * 0.01,
    flexDirection: 'row',
    alignItems : 'center'
  },
  plusCircle: {
    height: DimensionsConfig.screenHeight * 0.025,
    width: DimensionsConfig.screenHeight * 0.025,
    borderRadius: DimensionsConfig.screenHeight * 0.025 / 2,
    borderWidth: 1,
    borderColor: Colors?.white,
    marginRight: DimensionsConfig.screenHeight * 0.01,
    alignItems : 'center',
    justifyContent: 'center'
  },
  AddServidsTxt: {
    color: Colors?.white,
    fontSize: 13,
    fontWeight: '600',
  },
  insideConatiner: {
    padding: DimensionsConfig.screenHeight * 0.015,
  },
  serviceItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DimensionsConfig.screenHeight * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  serviceInfo: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  price: {
    fontSize: 14,
    color: '#8D10B5',
    fontWeight: '600',
    marginTop: DimensionsConfig.screenHeight * 0.008,
  },
  details: {
    fontSize: 12,
    color: '#9E98AC',
    fontWeight: '400',
    marginTop: DimensionsConfig.screenHeight * 0.008,
  },
  addons: {
    fontSize: 12,
    color: '#301E39',
    fontWeight: '400',
    marginTop: DimensionsConfig.screenHeight * 0.008,
  },
  editButton: {
    padding: DimensionsConfig.screenHeight * 0.014,
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: DimensionsConfig.screenHeight * 0.07,
    height: DimensionsConfig.screenHeight * 0.07,
    backgroundColor: '#A020F0',
    borderRadius: DimensionsConfig.screenHeight * 0.07 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  editIcon: {
    height: DimensionsConfig.screenHeight * 0.026,
    width: DimensionsConfig.screenHeight * 0.026,
    resizeMode: 'contain'
  }
})