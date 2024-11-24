import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {Images} from '../assets/images';
import AppHeader from '../components/AppHeader';
import {Colors} from '../theme/colors';
import CustomButton from '../components/CustomButton';
import BreakDuratinModal from '../components/Modal.js/BreakDurationModal';
// import TimingsModal from '../components/Modal/TimingsModal';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const ScheduleDay = [
  {day: 'Monday', time: '10:00AM to 09:00PM'},
  {day: 'Tuesday', time: '10:00AM to 09:00PM'},
  {day: 'Wednesday', time: '10:00AM to 09:00PM'},
  {day: 'Thusday', time: '10:00AM to 09:00PM'},
  {day: 'Friday', time: '10:00AM to 09:00PM'},
  {day: 'Saturday', time: '10:00AM to 09:00PM'},
  {day: 'Sunday', time: '10:00AM to 09:00PM'},
];

const StaffDetails = ({navigation}) => {
  const [breakModal, setbreakModal] = useState(false);
  const [availableData, setAvailableData] = useState(false);
  const breakVisibleModal = () => {
    setbreakModal(!breakModal);
  };

  const renderData = items => {
    const item = items.item;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingVertical: (mobileW * 2) / 100,
        }}>
        <Text
          style={{
            color: Colors.black,
          }}>
          {item.day}
        </Text>
        <Text>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BreakDuratinModal visible={breakModal} onClose={breakVisibleModal} />
      <AppHeader title={'Details'} />

      <ScrollView style={styles.Scrollcontainer}>
        {/* Business Image */}

        <Image source={Images?.image22} style={styles.homeServiceIcon} />

        <View style={{alignItems: 'center', marginTop: (mobileW * 3) / 100}}>
          {/* User Info */}
          <Text style={styles.name}>Kynthia Johnson</Text>
          <Text style={styles.email}>kynthiajohnson@email.com</Text>
          <Text style={styles.phone}>+123 456 7890</Text>
        </View>
        {/* Business Details */}
        <View
          style={{
            paddingHorizontal: (mobileW * 3) / 100,
          }}>
          <View style={styles.itemContainer}>
            <View style={[styles.txtView]}>
              <Text style={styles.itemLabel}>Ratings</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images?.starIcon} style={styles?.backIcon} />
              <Text style={styles?.ratingText}>
                {'5.0 '}
                <Text style={[styles.ratingText, styles.reviewTxt]}>
                  ({'191' + ' Ratings'})
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={[styles.txtView]}>
              <Text style={styles.itemLabel}>Service</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Image source={Images?.starIcon} style={styles?.backIcon} /> */}
              <Text style={styles?.ratingText}>
                
                <Text style={[styles.ratingText, styles.reviewTxt]}>
                 Hair
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.itemContainerBio}>
            <View style={[styles.txtView]}>
              <Text style={styles.itemLabel}>Bio</Text>
            </View>
            <Text style={styles.itemDescription}>
              Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
              consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
              in, viverra quis
            </Text>
          </View>

          <View style={styles.itemContainerBio}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={[styles.txtView]}>
                <Text style={styles.itemLabel}>Availability</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAvailableData(!availableData)}>
                <Image
                  source={!availableData? Images?.PlusWithLightBAck:Images.MinusWithLightBack}
                  style={styles?.plusWithBack}
                />
              </TouchableOpacity>
            </View>
            {availableData && (
              <View style={{marginTop: (mobileW * 3) / 100}}>
                <FlatList
                  data={ScheduleDay}
                  renderItem={item => renderData(item)}
                />
              </View>
            )}
          </View>
          <View
            style={{
              marginBottom: (mobileW * 6) / 100,
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
            }}>
            <CustomButton
              title={'Edit'}
              onPress={()=>{
                navigation.navigate('AddProfesssional')
              }}
              style={{
                marginBottom: (mobileW * 3) / 100,
                marginTop: (mobileW * 5) / 100,
                backgroundColor: Colors.semiPurpleLight,
              }}
              textStyle={{color: Colors.primary}}
            />

            <CustomButton
              title={'Delete'}
              style={{
                marginBottom: (mobileW * 3) / 100,
                marginTop: (mobileW * 3) / 100,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
    width: (mobileW * 35) / 100,
    height: (mobileW * 35) / 100,
    borderWidth: (mobileW * 1) / 100,
    borderColor: Colors.white,
    borderRadius: (mobileW * 17.5) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 5) / 100,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
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
    color: '#8D10B5',
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 2) / 100,
    borderWidth: 0.3,
    borderColor: Colors.OrGray,
    justifyContent: 'space-between',
    marginTop: (mobileW * 4) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemContainerBio: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 2) / 100,
    borderWidth: 0.3,
    borderColor: Colors.OrGray,
    justifyContent: 'space-between',
    marginTop: (mobileW * 4) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  txtView: {},
  itemLabel: {
    fontSize: (mobileW * 4) / 100,
    color: '#333333',
    flex: 1,
    fontWeight: '700',
  },
  itemDescription: {
    fontSize: (mobileW * 3.7) / 100,
    color: Colors.gray,
    fontWeight: '400',
    marginTop: (mobileW * 1) / 100,
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
    fontSize: (mobileW * 3.5) / 100,
    color: Colors.black,
    fontWeight: '400',
    width: '60%',
  },
  timeTxt: {
    fontSize: (mobileW * 3.2) / 100,
    color: Colors.black,
    fontWeight: '400',
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
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    resizeMode: 'contain',
  },
  reviewTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray, // Star color
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black, // Star color
    marginRight: 8,
  },
  plusWithBack: {
    width: (mobileW * 6.5) / 100,
    height: (mobileW * 6.5) / 100,
  },
});

export default StaffDetails;
