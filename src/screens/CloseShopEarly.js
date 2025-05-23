import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { UpdateFutureBookingsAction, UpdateFutureBookingsRemoveAction } from '../redux/action/UpdateFutureBookingsAction';
import { GetUserDetailAction } from '../redux/action/GetUserDetailAction';
import { UpdateShopCloselyAction, UpdateShopCloselyRemoveAction } from '../redux/action/UpdateShopCloselyAction';
import { GetLeftBookingsAction } from '../redux/action/GetLeftBookingsAction';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const data = [
  {
    id: '1',
    image: Images.Image1,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '2',
    image: Images.Image2,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '1',
    image: Images.Image1,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '2',
    image: Images.Image2,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '1',
    image: Images.Image1,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '2',
    image: Images.Image2,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '1',
    image: Images.Image1,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  {
    id: '2',
    image: Images.Image2,
    name: 'Business Name',
    categories: ['Hair', 'Makeup', 'Skincare'],
    rating: 5.0,
    reviews: 214,
  },
  // Add more entries as needed
];

const CloseShopEarly = ({ navigation }) => {
  const [isEnable, setisEnable] = useState(false);
  const [listData, setListData] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const UserDetailData = useSelector((state) => state.getUserDetailData);
  const updateFutureBookingsData = useSelector((state) => state.updateFutureBookingsData);
  const updateShopCloselyData = useSelector((state) => state.updateShopCloselyData);
  const getLeftBookingsData = useSelector((state) => state.getLeftBookingsData);


  useEffect(() => {
    if (UserDetailData?.response?.result) {
      // console.log('UserDetailData?.respons', UserDetailData?.response?.result)
      setisEnable(UserDetailData?.response?.result?.is_pouse_future_booking == 'true' ? false : true)
    }
  }, [UserDetailData])


  useEffect(() => {
    if (getLeftBookingsData?.response?.message == 'success') {
        console.log('getLeftBookingsData?.respons', getLeftBookingsData?.response?.message)
        setListData(getLeftBookingsData?.response?.result)
      } else {
        setListData([])
      }
  }, [getLeftBookingsData])

  useEffect(() => {
    if (updateFutureBookingsData?.response?.message == 'success') {
      dispatch(UpdateFutureBookingsRemoveAction())
      dispatch(GetUserDetailAction())
      navigation.goBack()
      // console.log('updateFutureBookingsData?.response?.result' , updateFutureBookingsData?.response?.result)
    }
  }, [updateFutureBookingsData])

  useEffect(() => {
    if (updateShopCloselyData?.response?.message == 'success') {
      dispatch(UpdateShopCloselyRemoveAction())
      dispatch(GetUserDetailAction())
      navigation.goBack()
      // console.log('updateShopCloselyData?.response?.result' , updateShopCloselyData?.response?.result)
    }
  }, [updateShopCloselyData])

  useEffect(() => {
    if (isFocused) {
      getListData()
    }

  }, [isFocused])

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const getListData = () => {
    const todayDate = getCurrentDate()
    dispatch(GetLeftBookingsAction({
      date: todayDate
    }))
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // e.g., April
    const year = date.getFullYear();
    
    return `${day} ${month}, ${year}`;
  }


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={Images?.image33} style={styles.image} />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.name}>{item.customer_name}</Text>
          <TouchableOpacity style={styles.heartIcon}>
            <Image source={Images.heartIcon} style={styles.heartIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          {/* {item.categories.includes('Hair') && ( */}
          <View
            style={{
              right: 10,
              paddingHorizontal: (mobileW * 2) / 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: (mobileW * 1) / 100,
            }}>
            <Image source={Images.Hair} style={styles.listIcons} />
            <Text style={styles.iconText}>{item?.services[0]?.service}</Text>
          </View>
          {/* )} */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: (mobileW * 1) / 100,
          }}>
          <Image source={Images?.calenderIcon} style={styles.listIcons} />
          <Text style={styles.iconText}>{formatDate(item?.appointment_date)} (from {item?.appointment_start_time}- {item?.appointment_end_time})</Text>
        </View>
        <View style={styles.rating}>
          <Image source={Images?.locationIcon} style={styles.listIcons} />
          <Text style={styles.ratingText}>
            {'Home'}
          </Text>
        </View>
      </View>
    </View>
  );

  const onPressUpdateBookingStatus = () => {
    dispatch(UpdateFutureBookingsAction({
      status: true
    }))
  }

  const onPressUpdateShopCloselyStatus = () => {
    dispatch(UpdateShopCloselyAction({
      status: true
    }))
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Images.BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Close Shop Early</Text>
        <TouchableOpacity>
          <Image style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.topLabel}>You have {listData.length > 0 ? listData.length : 0} existing bookings</Text>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list} 
        showsVerticalScrollIndicator={false}
      />
      <View style={{
        width: '90%',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onPressUpdateShopCloselyStatus()
          }}
          style={[
            styles.pauseButton,
          ]}>
          <Text style={styles.pauseButtonText}>
            Cancel All Bookings and Close Early
          </Text>
        </TouchableOpacity>
        {isEnable ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.cancelButton,
            ]}
            onPress={() => {
              onPressUpdateBookingStatus()
            }}
          >
            <Text style={styles.cancelButtonText}>
              Pause Bookings
            </Text>
          </TouchableOpacity>) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: mobileH * 0.2
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    backgroundColor: '#ffffff',
    paddingVertical: (mobileW * 7) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  listIcons: {
    width: (mobileW * 3.8) / 100,
    height: (mobileW * 3.8) / 100,
    left: (mobileW * 2) / 100,
    tintColor: '#9E98AC',
    resizeMode: "contain"
  },
  ratingIcons: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    left: (mobileW * 2) / 100,
  },
  heartIconStyle: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  iconText: {
    color: '#9E98AC',
    fontWeight: '400',
    left: (mobileW * 3) / 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
  wallectWithBackIcon: {
    width: (mobileW * 17) / 100,
    height: (mobileW * 17) / 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // padding: 12,
    marginBottom: (mobileW * 3) / 100,
    borderBottomWidth: (mobileW * 0.1) / 100,
    borderBottomColor: '#9E98AC',
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 3) / 100,
  },
  image: {
    width: (mobileW * 25) / 100,
    height: (mobileW * 25) / 100,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D1152',
    marginBottom: 4,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (mobileW * 2) / 100,
  },
  ratingText: {
    marginLeft: (mobileW * 3) / 100,
    color: '#555',
  },
  heartIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLabel: {
    fontSize: (mobileW * 4.2) / 100,
    color: Colors.black,
    left: (mobileW * 4) / 100,
    fontWeight: '600',
    marginTop: 10
  },
  pauseButton: {
    width: '100%',
    padding: 15,
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
    width: '100%',
    padding: 15,
    backgroundColor: '#f2f2f2', // Default background color
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#a14ebe',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CloseShopEarly;
