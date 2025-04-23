import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Images } from '../assets/images';
import CustomSwitch from '../components/CustomSwitch';
import { Colors } from '../theme/colors';
import BookingModal from '../components/Modal.js/BookingModal';
import PrepaidOptionModal from '../components/Modal.js/PrepaidOptionModal';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateFutureBookingsAction, UpdateFutureBookingsRemoveAction } from '../redux/action/UpdateFutureBookingsAction';
import { GetUserDetailAction } from '../redux/action/GetUserDetailAction';
import { useIsFocused } from '@react-navigation/native';
import { UpdateShopCloselyAction, UpdateShopCloselyRemoveAction } from '../redux/action/UpdateShopCloselyAction';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const UserDetailData = useSelector((state) => state.getUserDetailData);
  const updateFutureBookingsData = useSelector((state) => state.updateFutureBookingsData);
  const updateShopCloselyData = useSelector((state) => state.updateShopCloselyData);
  const [isEnable, setisEnable] = useState(false);
  const [isEnable1, setisEnable1] = useState(false);
  const [pauseBookingModal, setpauseBookingModal] = useState(false);
  const [showPrepaidOptionModal, setshowPrepaidOptionModal] = useState(false);
  const [CloseShop, setCloseShop] = useState(false);

  useEffect(() => {
    if (UserDetailData?.response?.result) {
      // console.log('UserDetailData?.respons', UserDetailData?.response?.result)
      setisEnable(UserDetailData?.response?.result?.is_pouse_future_booking == 'true' ? false : true)
      setisEnable1(UserDetailData?.response?.result?.is_close_shop_early == 'true' ? false : true)
    }
  }, [UserDetailData])

  useEffect(() => {
    if (updateFutureBookingsData?.response?.message == 'success') {
      dispatch(UpdateFutureBookingsRemoveAction())
      dispatch(GetUserDetailAction())
      setpauseBookingModal(false)
      setCloseShop(false);
      // console.log('updateFutureBookingsData?.response?.result' , updateFutureBookingsData?.response?.result)
    }
  }, [updateFutureBookingsData])

  useEffect(() => {
    if (updateShopCloselyData?.response?.message == 'success') {
      dispatch(UpdateShopCloselyRemoveAction())
      dispatch(GetUserDetailAction())
      setCloseShop(false)
      setpauseBookingModal(false)
      // console.log('updateShopCloselyData?.response?.result' , updateShopCloselyData?.response?.result)
    }
  }, [updateShopCloselyData])

  useEffect(() => {
    if (isFocused) {
      dispatch(GetUserDetailAction())
    }

  }, [isFocused])


  const toggleOpen1 = () => {
    setisEnable1(!isEnable1);
  };

  const bookingPause = () => {
    setpauseBookingModal(true);
  };

  const onPressUpdateBookingStatus = () => {
    dispatch(UpdateFutureBookingsAction({
      status: isEnable
    }))
  }

  const onPressUpdateShopCloselyStatus = () => {
    dispatch(UpdateShopCloselyAction({
      status: isEnable1
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {pauseBookingModal && (<BookingModal
          modalText={!isEnable ? 'Are you sure you want to resume the bookings for today?' : 'Are you sure you want to pause the bookings for today?'}
          buttonText={!isEnable ? 'Resume Bookings' : 'Pause Bookings'}
          midText={
            isEnable && 'You’ll have to manually turn the bookings on to continue receiving bookings.'
          }
          visible={pauseBookingModal}
          onFirstBtn={() => {
            onPressUpdateBookingStatus()
          }}
          onClose={() => {
            setpauseBookingModal(false)
          }}
          buttonBackgroundColor={!isEnable ? Colors.primary : Colors.red}
        />)}
        <BookingModal
          modalText={'You have 3 existing bookings today!'}
          buttonText={'Cancel All Bookings and Close Early'}
          midText={
            'Closing shop early will cancel them and you will be charged Beaubee commission fees If you would like to keep them you can choose to pause bookings instead on the bookings page. '
          }
          onFirstBtn={() => {
            navigation.navigate('CloseShopEarly');
            setCloseShop(false);
          }}
          visible={CloseShop}
          onClose={() => {
            onPressUpdateBookingStatus()
          }}
          type={CloseShop}
          cancelButtonText={!isEnable ? 'Resume Bookings' : 'Pause Bookings'}
          thirdButtonText={'Back'}
          onClickThird={() => {
            setCloseShop(false);
          }}
        />

        <PrepaidOptionModal

          visible={showPrepaidOptionModal}
          onClose={() => {
            setshowPrepaidOptionModal(false)
          }}
          onFirstBtn={() => {
            navigation.navigate('AddPrepaidPack');
            setshowPrepaidOptionModal(false)
          }}
          onSecondBtn={() => {
            navigation.navigate('AddPrepaid');
            setshowPrepaidOptionModal(false)
          }}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Image source={Images?.BellNotification} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: (mobileH * 5) / 100 }}>
          {/* Static Profile Options */}
          <View style={styles.topContainer}>
            <View style={styles.topViewContainer}>
              <Text style={styles.topLabel}>Pause all future bookings</Text>
              <Image source={Images?.Information} style={styles.infoIcon} />
              <CustomSwitch
                isEnabled={isEnable}
                toggleSwitch={() => {
                  bookingPause();
                }}
              />
            </View>
            <View style={styles.topViewContainer}>
              <Text style={styles.topLabel}>Close shop early for the day</Text>
              <Image source={Images?.Information} style={styles.infoIcon} />
              <CustomSwitch
                isEnabled={isEnable1}
                toggleSwitch={() => {
                  // toggleOpen1();
                  if (isEnable1) {
                    setCloseShop(true);
                  }
                  else {
                    onPressUpdateShopCloselyStatus()
                  }
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('BusinessProfile')}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.businessprofile} style={styles.icon} />
            {/* Icons */}
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Business Profile</Text>
              <Text style={styles.itemDescription}>
                Manage addresses and other info
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ServiceScreen')}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.service} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Service</Text>
              <Text style={styles.itemDescription}>
                Add, Change and Edit Service
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.itemContainer}
            onPress={() => {
              navigation.navigate('RosterScreen');
            }}>
            <Image source={Images?.roster} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Roster</Text>
              <Text style={styles.itemDescription}>Manage Staff Service</Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('StaffProfile');
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.staff} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Staff</Text>
              <Text style={styles.itemDescription}>Manage Staff Service</Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Promotions');
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.promotions} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Promotions</Text>
              <Text style={styles.itemDescription}>Manage Promotions</Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('AddPrepaid');
              setshowPrepaidOptionModal(true)
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.prepaid} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Prepaid</Text>
              <Text style={styles.itemDescription}>Manage Promotions</Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SettingScreen');
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.settings} style={styles.icon} />
            {/* Icons */}
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Settings</Text>
              <Text style={styles.itemDescription}>
                Notifications and Privacy
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BdayGiftCard');
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.gift} style={styles.icon} />
            {/* Icons */}
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Gift Cards Settings</Text>
              <Text style={styles.itemDescription}>
                Gift Cards for Customers
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Analytics');
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.analytics} style={styles.icon} />
            {/* Icons */}
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Analytics</Text>
              <Text style={styles.itemDescription}>
                View Business Analytics
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BlockClients');
            }}
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <Image source={Images?.block} style={styles.icon} />
            {/* Icons */}
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Blocked Clients</Text>
              <Text style={styles.itemDescription}>
                Gift Cards for Customers
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.itemContainer}
            onPress={() => {
              navigation.navigate('Support');
            }}>
            <Image source={Images?.support} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Support</Text>
              <Text style={styles.itemDescription}>
                Provide feedback or report an issue
              </Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.itemContainer}>
            <Image source={Images?.help} style={styles.icon} />
            {/* Icons */}
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Help</Text>
              <Text style={styles.itemDescription}>Terms and Conditions</Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.itemContainer}>
            <Image source={Images?.resources} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.itemLabel}>Resources</Text>
              <Text style={styles.itemDescription}>Grow your business</Text>
            </View>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.footer}
            onPress={() => {
              navigation.navigate('FootprintScreen');
            }}>
            <Image source={Images?.footprint} style={styles.icon} />
            <View style={styles.txtView}>
              <Text style={styles.footerItemLabel}>Footprint</Text>
              <Text style={styles.footerDescription}>The Business Impact</Text>
            </View>
            <Image
              source={Images?.forwardIcon}
              style={[styles.forwardDicicon, { tintColor: '#FFFFFF' }]}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: (mobileW * 2) / 100,
    marginTop: (mobileW * 4) / 100,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    left: 5,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#ffffff',
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    borderRadius: (mobileW * 8) / 100,
    paddingVertical: (mobileW * 1) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tagIcon: {
    width: (mobileW * 5.5) / 100,
    height: (mobileW * 5.5) / 100,
  },

  searchBarContainer: {
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  searchBarText: {
    color: '#A1A1A1',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  imageBackView: {
    backgroundColor: '#F5F0FF',
    borderRadius: (mobileW * 5.5) / 100,
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtView: {
    width: (mobileW * 68) / 100,
  },
  icon: {
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
  },
  forwardDicicon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  itemLabel: {
    fontSize: 14.5,
    color: '#301E39',
    marginLeft: 10,
    flex: 1,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 12,
    color: '#9E98AC',
    marginLeft: 10,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: '#8D10B5',
  },
  footerItemLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  footerItemDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
  },
  topContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: Colors.white,
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 2) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  topLabel: {
    marginLeft: 5,
    width: (mobileW * 60) / 100,
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  infoIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    tintColor: Colors.primary,
  },
  bellIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  topViewContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 2) / 100,
  },
});

export default ProfileScreen;
