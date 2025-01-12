import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import { mobileH, mobileW } from '../components/utils';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';

const tabs = ['Hair', 'Makeup', 'Skincare', 'Nails'];
const services = [
  {
    id: 1,
    category: 'Hair',
    title: 'Buzz Cut',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 2,
    category: 'Hair',
    title: 'Straight Hair',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 3,
    category: 'Hair',
    title: 'Bald/Skinfade',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 4,
    category: 'Hair',
    title: 'Kids Cut',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 5,
    category: 'Makeup',
    title: 'Basic Makeup',
    price: '$60.00',
    rating: '45%',
    reviews: 50,
    duration: '50 minutes',
    image: Images?.Makeup,
  },
  {
    id: 6,
    category: 'Makeup',
    title: 'Basic Makeup for bride',
    price: '$20.00',
    rating: '35%',
    reviews: 50,
    duration: '20 minutes',
    image: Images?.Makeup,
  },
  {
    id: 7,
    category: 'Makeup',
    title: 'Simple Makeup',
    price: '$90.00',
    rating: '85%',
    reviews: 50,
    duration: '40 minutes',
    image: Images?.Makeup,
  },
  {
    id: 8,
    category: 'Makeup',
    title: 'Top cate Makeup',
    price: '$180.00',
    rating: '65%',
    reviews: 50,
    duration: '70 minutes',
    image: Images?.Makeup,
  },
];

const CustomerProfile = ({navigation}) => {
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [ProfessionalData, setProfessionalData] = useState(null);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);
  const [activeTab, setActiveTab] = useState('Bookings'); // Track the active tab
  const [isServiceSelectorVisible, setServiceSelectorVisible] = useState(false);
  const [chosenService, setChosenService] = useState(null);
  const [UpcomingVal, setUpcomingVal] = useState('upcoming');

  const storeDataToState = data => {
    setProfessionalData(data);
    console.log('datadatadata', data);
  };

  const handleServiceSelect = service => {
    setChosenService(service);
  };

  const data = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
    {label: 'Option 4', value: '4'},
  ];

  const tabView = () => {
    return (
      <View style={styles.tabContainer}>
        {['Bookings', 'Prepaid', 'Notes'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab, // Highlight active tab
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText, // Highlight active text
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={'Customer Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={
            {
              // paddingHorizontal: (mobileW * 5) / 100,
            }
          }>
          <View>
            <View activeOpacity={0.8} style={styles.itemContainer1}>
              <View style={styles.containerView}>
                <Image
                  source={Images?.image11}
                  resizeMode="contain"
                  style={styles.personImage}
                />
                <View style={styles.txtView}>
                  <Text style={[styles.nameLabel, {left: 9}]}>
                    {'Jasmine Smith'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      left: 9,
                    }}>
                    {Array.from({length: 5}).map((_, index) => (
                      <Image
                        key={index}
                        source={Images.starIcon}
                        style={{
                          width: (mobileW * 4) / 100,
                          height: (mobileW * 4) / 100,
                          marginRight: 1,
                        }}
                      />
                    ))}
                    <Text style={styles.emailLabel}>{'5.0'}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleOpenModal()}>
                  <Image
                    source={Images?.threeDot}
                    style={styles.forwardIcon1}
                  />
                </TouchableOpacity>
              </View>
              <View activeOpacity={0.8} style={styles.itemContainer}>
                <View style={styles.containerView}>
                  <View style={styles.amountView}>
                    <Text style={[styles.amountLabel, {left: 9}]}>$241.00</Text>
                    <Text style={styles.emailLabel}>BeauBee Credit</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleOpenModal()}>
                    <Image
                      source={Images?.cardPayment}
                      style={styles.walletIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.callingView}>
                <View style={styles.phoneView}>
                  <Image source={Images.Calling} style={styles.phoneImage} />
                  <Text style={styles.phooneTxt}>Phone</Text>
                </View>
                <Text style={styles.phoneNumber}>+1234567890</Text>
              </View>

              <View style={styles.callingView}>
                <View style={styles.phoneView}>
                  <Image source={Images.mail} style={styles.phoneImage} />
                  <Text style={styles.phooneTxt}>Email</Text>
                </View>
                <Text style={styles.phoneNumber}>Test@gmail.com</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: (mobileW * 5) / 100,
            }}>
            {tabView()}
          </View>
          <View
            style={{
              width: mobileW,
              marginTop: (mobileW * 1) / 100,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              height: (mobileH * 10) / 100,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setUpcomingVal('upcoming')}
              style={{
                width: '45%',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: UpcomingVal === 'upcoming' ? 4 : 4,
                borderBottomColor:
                  UpcomingVal === 'upcoming' ? Colors.primary : Colors.white,
              }}>
              <Text style={[styles.upcomingTabText, {paddingVertical: 13}]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setUpcomingVal('previous')}
              style={{
                width: '45%',
                alignItems: 'center',
                justifyContent: 'center',
                justifyContent: 'center',
                borderBottomWidth: UpcomingVal === 'previous' ? 4 : 4,
                borderBottomColor:
                  UpcomingVal === 'previous' ? Colors.primary : Colors.white,
              }}>
              <Text style={[styles.upcomingTabText, {paddingVertical: 13}]}>
                Previous
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: Colors.borderColor,
            }}></View>

          <View activeOpacity={0.8} style={styles.itemContainer1}>
            {(activeTab === 'Bookings' || activeTab === 'Prepaid') && (
              <>
                <View style={styles.containerView}>
                  <Image
                    source={Images?.image11}
                    resizeMode="contain"
                    style={styles.personImage1}
                  />
                  <View style={styles.txtView}>
                    <Text style={[styles.itemLabel, {left: 9}]}>
                      {'Straight Hair'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        left: 9,
                      }}>
                      <Image
                        source={Images.Hair}
                        tintColor={'#9E98AC'}
                        style={{
                          width: (mobileW * 4) / 100,
                          height: (mobileW * 4) / 100,
                        }}
                      />

                      <Text style={styles.emailLabel}>{'Hair'}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={Images?.threeDot}
                      style={styles.forwardIcon1}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.straightLine} />
              </>
            )}
            <View style={styles.callingView1}>
              <Image source={Images.calenderIcon} style={styles.phoneImage} />
              <Text style={styles.phoneNumber1}>
                23 March, 2022 (from 1:00-2:00)
              </Text>
            </View>

            <View style={styles.callingView1}>
              <Image
                source={Images.locationIcon}
                tintColor={Colors.OrGray}
                resizeMode="contain"
                style={styles.phoneImage}
              />
              <Text style={styles.phoneNumber1}>Home</Text>
            </View>
            {(activeTab === 'Bookings' || activeTab === 'Notes') && (
              <>
                <View style={styles.straightLine} />
                <Text style={[styles.phoneNumber1, {marginTop: 8 , color:'#301E39' , fontSize: 14 , fontWeight: '400'}]}>
                  <Text style={[styles.itemLabel]}>Note:</Text> Integer
                  tincidunt cras dapibus. Vivamus elementum semper nisi. Aenean
                  vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                  dapibus in, viverra quis.
                </Text>
              </>
            )}
            {activeTab === 'Notes' && (
              <View style={{width: '100%', marginTop: 20}}>
                <CustomButton
                  style={{backgroundColor: Colors.semiPurpleLight}}
                  title={'Edit Notes'}
                  textStyle={{color: Colors.primary, fontSize: 14}}
                />
              </View>
            )}
          </View>

          <View style={{height: 20}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  uploadContainer: {
    height: (mobileH * 50) / 100,
    borderRadius: 15,
    backgroundColor: Colors.purpleLite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: (mobileW * 4) / 100,
  },
  uploadButton: {
    borderRadius: 10,
    padding: 10,
  },
  uploadIcon: {
    fontSize: 24,
    color: '#6A1B9A',
  },
  uploadText: {
    marginTop: 10,
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
  },
  optionContainer: {
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F2E9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#D5A3FF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#3C1A78',
  },
  disabledText: {
    color: '#A0A0A0',
  },
  arrow: {
    fontSize: 18,
    color: '#A0A0A0',
  },
  postButton: {
    backgroundColor: '#DADADA',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  serviceIcon: {
    width: (mobileW * 7) / 100,
    height: (mobileW * 9) / 100,
  },
  itemContainer1: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3.5) / 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 82) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3.5) / 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  serviceContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  imageBackView: {
    backgroundColor: '#F5F0FF',
    borderRadius: (mobileW * 5.5) / 100,
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: (mobileW * 10) / 100,
    height: (mobileW * 10) / 100,
  },
  personImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 6) / 100,
  },
  personImage1: {
    width: (mobileW * 13) / 100,
    height: (mobileW * 13) / 100,
    borderRadius: (mobileW * 2.5) / 100,
  },
  serviceImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 1.5) / 100,
  },
  walletIcon: {
    width: (mobileW * 8) / 100,
    height: (mobileW * 8) / 100,
  },
  forwardIcon1: {
    width: (mobileW * 4.5) / 100,
    height: (mobileW * 4.5) / 100,
    resizeMode: 'contain',
  },
  txtView: {
    width: (mobileW * 66) / 100,
    justifyContent: 'center',
  },
  amountView: {
    width: (mobileW * 68) / 100,
    justifyContent: 'center',
  },
  nameLabel: {
    fontSize: 17,
    color: '#301E39',
    fontWeight: '700',
  },
  itemLabel: {
    fontSize: 15,
    color: '#301E39',
    fontWeight: '600',
  },
  amountLabel: {
    fontSize: 17,
    color: '#301E39',
    fontWeight: '700',
  },
  emailLabel: {
    fontSize: 12,
    color: '#301E39',
    marginLeft: 4,
    fontWeight: '400',
    paddingVertical: (mobileW * 0.6) / 100,
  },
  itemDescription: {
    fontSize: (mobileW * 3.2) / 100,
    color: '#c2becb',
    marginLeft: 10,
    fontWeight: '400',
  },
  servicePrice: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: (mobileW * 4) / 100,
  },
  titleService: {
    fontSize: 15,
    color: '#301E39',
    fontWeight: '600',
    paddingVertical: (mobileW * 0.5) / 100,
  },
  catName: {
    fontSize: (mobileW * 3.4) / 100,
    color: '#333333',
    fontWeight: '500',
    paddingVertical: (mobileW * 0.5) / 100,
  },
  duration: {
    fontSize: (mobileW * 3.4) / 100,
    color: '#333333',
    fontWeight: '400',
    paddingVertical: (mobileW * 0.5) / 100,
  },
  headerLabel: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    fontWeight: '500',
  },
  cardLabel: {
    fontSize: 14.5,
    color: '#301e39',
    flex: 1,
    fontWeight: '400',
    left: 10,
  },
  straightLine: {
    width: '100%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 2) / 100,
    marginTop: (mobileW * 4) / 100,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  dropdown: {
    height: (mobileW * 12) / 100,
    borderColor: '#D8DAE7',
    borderWidth: (mobileW * 0.25) / 100,
    borderRadius: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 90) / 100,
    marginTop: (mobileW * 5) / 100,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcons: {
    width: (mobileW * 9) / 100,
    height: (mobileW * 9) / 100,
  },
  methodText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  plusIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  cartStyleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (mobileW * 4) / 100,
  },
  callingView: {
    flexDirection: 'row',
    marginTop: (mobileW * 3) / 100,
    alignItems: 'center',
    width: (mobileW * 80) / 100,
    justifyContent: 'space-between',
  },
  callingView1: {
    flexDirection: 'row',
    marginTop: (mobileW * 3) / 100,
    alignItems: 'center',
    width: (mobileW * 80) / 100,
  },
  phoneView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneImage: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  phooneTxt: {
    left: 7,
    fontSize: 14.5,
    fontWeight: '600',
    color: '#301E39',
  },
  phoneNumber: {fontWeight: '400', fontSize: 14, color: '#301E39'},
  phoneNumber1: {fontWeight: '400', fontSize: 12, color: '#301E39', left: 3},
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6EDF8', // Light background color
    padding: 6,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#fff', // Highlight active tab
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  activeTabText: {
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
  upcomingTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default CustomerProfile;
