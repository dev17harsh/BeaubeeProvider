import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Images} from '../assets/images';
import AppHeader from '../components/AppHeader';
import {Colors} from '../theme/colors';
import {DimensionsConfig} from '../theme/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDetailAction } from '../redux/action/GetUserDetailAction';

const AddTimingLocation = ({navigation}) => {
  const dispatch = useDispatch();
    const UserDetailData = useSelector((state) => state.getUserDetailData);
  const [locations, setLocations] = useState([]);



   useEffect(() => {
      dispatch(GetUserDetailAction())
    }, [])
  
    useEffect(() => {
      console.log('UserDetailData?.respons', UserDetailData?.response?.result?.business_locations)
      if (UserDetailData?.response?.result) {
        setLocations(UserDetailData?.response?.result?.business_locations)
      }
    }, [UserDetailData])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <AppHeader title={'Addresses and Timings'} />
        <View style={styles.subContainer}>
          {/* FlatList for displaying locations */}
          <FlatList
            data={locations}
            keyExtractor={item => item?.business_location_id?.toString()}
            renderItem={({item}) => (
              <View style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <View style={styles.iconContainer}>
                    <Image source={Images?.locationIcon} style={styles.icon} />
                  </View>
                  <View>
                    <Text style={styles.title}>{item.address}</Text>
                    <Text style={styles.description}>{item.area}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Image
                    source={Images?.VerticalThreeDot}
                    style={styles.moreIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {/* "Add new address" Section */}
          <TouchableOpacity
            style={styles.addNewAddress}
            onPress={() => {
              navigation.navigate('AddressMapScreen' , { type: 'profile' });
            }}>
            <Image source={Images?.Add} style={styles.addIcon} />
            <Text style={styles.addNewAddressText}>Add new address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subContainer: {
    // flex: 1,
    padding: DimensionsConfig.screenHeight * 0.015,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: DimensionsConfig.screenHeight * 0.02,
    borderWidth: 1,
    borderColor: '#F6EFF9',
    borderRadius: DimensionsConfig.screenHeight * 0.015,
    marginBottom: DimensionsConfig.screenHeight * 0.02,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: DimensionsConfig.screenHeight * 0.06,
    width: DimensionsConfig.screenHeight * 0.06,
    backgroundColor: '#F6EFF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DimensionsConfig.screenHeight * 0.03,
    marginRight: DimensionsConfig.screenHeight * 0.01,
  },
  icon: {
    height: DimensionsConfig.screenHeight * 0.028,
    width: DimensionsConfig.screenHeight * 0.028,
    resizeMode: 'contain',
  },
  moreIcon: {
    height: DimensionsConfig.screenHeight * 0.018,
    width: DimensionsConfig.screenHeight * 0.018,
    resizeMode: 'contain',
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
  addNewAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DimensionsConfig.screenHeight * 0.02,
  },
  addIcon: {
    height: DimensionsConfig.screenHeight * 0.025,
    width: DimensionsConfig.screenHeight * 0.025,
    resizeMode: 'contain',
  },
  addNewAddressText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors?.primary,
    marginLeft: 8,
  },
});

export default AddTimingLocation;
