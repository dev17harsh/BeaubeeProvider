import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import BreakDuratinModal from '../components/Modal.js/BreakDurationModal';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDetailAction } from '../redux/action/GetUserDetailAction';
import { useIsFocused } from '@react-navigation/native';
// import TimingsModal from '../components/Modal/TimingsModal';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const professionalsData = [
  { id: 1, day: 'Monday', time: '06:00-17:00' },
  { id: 1, day: 'Tuesday', time: '06:00-17:00' },
  { id: 1, day: 'Wednesday', time: '06:00-17:00' },
  { id: 1, day: 'Thusday', time: '06:00-17:00' },
  { id: 1, day: 'Friday', time: '06:00-17:00' },
  { id: 1, day: 'Saturday', time: '06:00-17:00' },
  { id: 1, day: 'Sunday', time: '06:00-17:00' },
];

const imageArray = [
  { image: Images.image55 },
  { image: Images.image11 },
  { image: Images.image33 },
  { image: Images.image44 },
  { image: Images.Image1 },
  { image: Images.image22 },
];

const timings = [
  { day: 'Monday', time: '10:00AM - 9:00PM' },
  { day: 'Tuesday', time: '10:00AM - 9:00PM' },
  { day: 'Wednesday', time: '10:00AM - 9:00PM' },
  { day: 'Thursday', time: '10:00AM - 9:00PM' },
  { day: 'Friday', time: '10:00AM - 9:00PM' },
  { day: 'Saturday', time: '10:00AM - 9:00PM' },
  { day: 'Sunday', time: '10:00AM - 9:00PM' },
];

const BusinessProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const UserDetailData = useSelector((state) => state.getUserDetailData);
  const isFocused = useIsFocused()
  const [breakModal, setbreakModal] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [userDetail, setUserDetail] = useState({});


  useEffect(() => {
    dispatch(GetUserDetailAction())
  }, [isFocused])

  useEffect(() => {
    // console.log('UserDetailData?.respons', UserDetailData?.response)
    if (UserDetailData?.response?.result) {
      setUserDetail(UserDetailData?.response?.result)
    }
  }, [UserDetailData])

  const breakVisibleModal = () => {
    setbreakModal(!breakModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <BreakDuratinModal visible={breakModal} onClose={breakVisibleModal} />
        <AppHeader title={'Business Profile'} />

        <ScrollView style={styles.Scrollcontainer}>
          {/* Business Image */}
          <Image
            resizeMode="cover"
            source={userDetail?.cover_profile == null ? Images.image22 : { uri: userDetail?.cover_profile }}
            imageStyle={styles?.businessImage}
            style={styles?.businessImage}>
          </Image>
          {console.log('userDetail' , userDetail)}
          <Image source={{ uri: userDetail?.profile }} style={[styles.homeServiceIcon]} />

          <View style={{ alignItems: 'center', marginTop: - (mobileW * 10) / 100 }}>
            {/* User Info */}
            <View style={{
              alignItems: 'center',
              marginBottom: (mobileW * 2) / 100
            }}>
              {userDetail?.business_name ? (<Text style={styles.name}>{userDetail?.business_name}</Text>) : null}
              {userDetail?.email ? (<Text style={styles.email}>{userDetail?.email}</Text>) : null}
              {userDetail?.mobile ? (<Text style={styles.phone}>{userDetail?.mobile}</Text>) : null}
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfileBusiness');
              }}
              activeOpacity={0.8}
              style={styles.editButton}>
              <Image source={Images?.Edit} style={styles.icon} />
              <Text style={styles.editButtonText}>Edit Account</Text>
            </TouchableOpacity>
          </View>
          {/* Business Details */}
          <View
            style={{
              paddingHorizontal: (mobileW * 3) / 100,
              paddingVertical: (mobileW * 2) / 100,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddTimingLocation')}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image
                source={Images?.locationBAck}
                style={styles.locationIcons}
              />
              <View style={[styles.txtView]}>
                <Text style={styles.itemLabel}>Locations</Text>
                {userDetail?.business_locations?.length > 0 ? (<Text style={styles.itemDescription}>
                  {userDetail?.business_locations[0]?.address}
                </Text>) : null}
              </View>
              <Image source={Images?.EditBlack} style={styles.forwardDicicon} />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate('Wishlist')}
              activeOpacity={0.8}
              style={styles.itemContainer1}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image source={Images?.timeBack} style={styles.locationIcons} />
                <Text style={styles.itemLabel}>Opening Hours</Text>
                <TouchableOpacity>
                  <Image
                    source={Images?.EditBlack}
                    style={[styles.forwardDicicon, { right: 15 }]}
                  />
                </TouchableOpacity>
              </View>
              {userDetail?.buiness_time?.length > 0 && (
              <View style={styles.dayView}>
                
                  <FlatList
                    data={
                      showDate ? userDetail?.buiness_time : userDetail?.buiness_time.slice(0, 1)
                    } // Show all items or just the first
                    renderItem={({ item }) => (
                      <View
                        style={{
                          width: (mobileW * 85) / 100,
                          paddingVertical: (mobileW * 1) / 100,
                        }}>
                        <View style={{ flexDirection: 'row', width: '82%', justifyContent: 'space-between' }}>
                          <Text style={styles.dayTxt}>{item.day_of_week}</Text>
                          <Text style={styles.timeTxt}>{item.start_time} - {item.end_time}</Text>
                        </View>
                      </View>
                    )}
                  />

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowDate(!showDate)}
                  style={{ alignSelf: 'flex-start' }}>
                  <Image source={Images?.Plus} style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate('Wishlist')}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image source={Images?.breakBack} style={styles.locationIcons} />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>10 minute break</Text>
                <Text style={styles.itemDescription}>
                  Breaks in between services
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => breakVisibleModal()}>
                <Image
                  source={Images?.EditBlack}
                  style={styles.forwardDicicon}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image source={Images?.lockBack} style={styles.locationIcons} />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Password</Text>
                <Text style={styles.itemDescription}>Change password</Text>
              </View>
              <Image source={Images?.EditBlack} style={styles.forwardDicicon} />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate('Wishlist')}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image source={Images?.crossBack} style={styles.locationIcons} />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Cancellation Policy</Text>
                <Text style={styles.itemDescription}>20% within 24 hours</Text>
              </View>
              <Image source={Images?.EditBlack} style={styles.forwardDicicon} />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate('Wishlist')}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image
                source={Images?.discountBack}
                style={styles.locationIcons}
              />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Discount Code</Text>
                <Text style={styles.itemDescription}>3 active promos</Text>
              </View>
              <Image source={Images?.EditBlack} style={styles.forwardDicicon} />
            </TouchableOpacity>
          </View>
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
  Scrollcontainer: {
    backgroundColor: '#FFFFFF',
  },
  businessImage: {
    width: (mobileW * 110) / 100,
    height: 200,
    alignItems: 'center',
    alignSelf: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  homeServiceBadge: {
    color: Colors.white,
    fontWeight: 'bold',
    paddingVertical: 4,
    fontSize: (mobileW * 2.5) / 100,
  },
  homeServiceIcon: {
    width: (mobileW * 24) / 100,
    height: (mobileW * 24) / 100,
    // bottom: (mobileH * -19) / 100,
    alignSelf: 'center',
    top: (mobileH * -6) / 100,
    borderWidth: (mobileW * 1) / 100,
    borderColor: Colors.white,
    borderRadius: (mobileW * 12) / 100,
  },
  businessName: {
    fontSize: (mobileW * 5) / 100,
    fontWeight: '900',
    marginTop: 8,
    color: Colors.black,
  },
  rating: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#333333',
  },
  infoContainer: {
    marginTop: 16,
    width: (mobileW * 90) / 100,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  openBadge: {
    color: '#ffffff',
    backgroundColor: 'green',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  infoText: {
    color: '#666666',
  },
  distanceText: {
    color: Colors?.black,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#A0A0A0',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeTab: {
    color: '#A020F0',
    borderBottomColor: '#A020F0',
    borderBottomWidth: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  professionalsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  professionalName: {
    marginTop: 4,
    fontSize: 14,
  },
  serviceList: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 5) / 100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  serviceName: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  servicePriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    color: '#A020F0',
    marginRight: 8,
  },
  tabContainer: {
    paddingVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  // activeTab: {
  //   borderBottomColor: '#A020F0',
  // },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: Colors.black,
    fontSize: 14,
  },
  professionalsList: {
    paddingVertical: 8,
    marginTop: (mobileH * 2) / 100,
  },
  professionalCard: {
    alignItems: 'center',
    marginRight: 16,
    paddingHorizontal: (mobileW * 1) / 100,
  },
  professionalImage: {
    width: (mobileW * 20) / 100,
    height: (mobileW * 20) / 100,
    borderRadius: (mobileW * 10) / 100,
  },
  professionalName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    marginTop: (mobileW * 2) / 100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  forwardcon: {
    width: (mobileW * 3.5) / 100,
    height: (mobileW * 3.5) / 100,
    left: (mobileW * 2) / 100,
  },
  plusIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  locationIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    tintColor: Colors.primary,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 5) / 100,
    backgroundColor: '#ffffff',
    marginTop: (mobileW * 3) / 100,
    borderRadius: (mobileW * 2.5) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    // elevation: 3,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    marginVertical: (mobileW * 4) / 100,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  straightLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: (mobileW * 4) / 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#301E39',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textLight,
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textLight,
    marginBottom: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4ECFC',
    paddingHorizontal: (mobileW * 6) / 100,
    paddingVertical: (mobileW * 3) / 100,
    borderRadius: (mobileW * 3) / 100,
  },
  editButtonText: {
    color: Colors.primary,
    fontSize: 14,
    marginLeft: 15,
    fontWeight: '600',
  },
  icon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  itemContainer1: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  txtView: {
    width: (mobileW * 68) / 100,
  },
  itemLabel: {
    fontSize: 14,
    color: Colors.textDark,
    marginLeft: 10,
    flex: 1,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 12,
    color: Colors.textBrown,
    marginLeft: 10,
    fontWeight: '400',
  },
  dayView: {
    width: '98%',
    backgroundColor: Colors.semiPurpleLight,
    borderRadius: (mobileW * 1.8) / 100,
    marginTop: (mobileW * 3) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 3) / 100,
    paddingVertical: (mobileW * 2.5) / 100,
  },
  dayTxt: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
    // width: '40%',
  },
  timeTxt: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
  },
  forwardDicicon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  plusIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  locationIcons: {
    width: (mobileW * 10) / 100,
    height: (mobileW * 10) / 100,
    resizeMode: 'contain',
  },
});

export default BusinessProfile;
