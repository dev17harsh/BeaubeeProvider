import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../assets/images';
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
import {mobileH, mobileW} from '../components/utils';
import CommonButton from '../components/CommonButton';
import SelectCustomer from '../components/Modal.js/SelectCustomer';
import SelectBookingModal from '../components/Modal.js/SelectBookingModal';
const data = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
  {label: 'Option 4', value: '4'},
];
export default function Support({navigation}) {
  const [selectedOption, setSelectedOption] = useState('feebback');
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [isPackageModal, setisPackageModal] = useState(false);
  const [clientBooking, setclientBooking] = useState('client');
  const [customerData, setcustomerData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const handlePackageModalOpen = () => setisPackageModal(true);
  const handlePackageModalClose = () => setisPackageModal(false);

  const storeDataToState = data => {
    setcustomerData(data);
  };

  const storeServiceToState = data => {
    console.log('=>>>>>>>>>', data);
    setStoreData(data);
  };

  const ReportPress = () => {
    return (
      <View>
        <Text style={styles.selectTitle}>What do you want to report</Text>
        <View
          style={{
            paddingVertical: (mobileH * 2) / 100,
            paddingHorizontal: (mobileW * 3) / 100,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setclientBooking('client')}
            style={styles.selectedView}>
            <Image
              source={
                clientBooking === 'client'
                  ? Images.selectedButton
                  : Images.unSelectedButton
              }
              style={styles.plusIcon}
            />
            <Text style={styles.payMethod}>Client</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setclientBooking('booking')}
            style={[styles.selectedView, {left: (mobileW * 10) / 100}]}>
            <Image
              source={
                clientBooking === 'booking'
                  ? Images.selectedButton
                  : Images.unSelectedButton
              }
              style={styles.plusIcon}
            />
            <Text style={styles.payMethod}>Booking</Text>
          </TouchableOpacity>
        </View>
        {clientBooking === 'client' && (
          <>
            {customerData == null ? (
              <TouchableOpacity
                onPress={() => handleOpenModal()}
                activeOpacity={0.8}
                style={styles.itemContainer}>
                <Text style={styles.itemLabel}>Select Client</Text>
                <Image
                  source={Images?.forwardIcon}
                  style={styles.forwardDicicon}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.itemContainer}>
                <Image
                  source={customerData?.image}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{customerData?.name}</Text>
                  <View style={styles.ratingRow}>
                    <Image
                      source={Images?.activeStar}
                      style={styles.starIcon}
                    />
                    <Text style={styles.rating}>
                      {customerData?.rating + '.0'}
                    </Text>
                    <Text style={styles.review}>
                      {''}({customerData?.reviews} Reviews)
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setcustomerData(null)}>
                  <Image
                    source={Images?.deleteButton}
                    style={styles.deleteButton}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        {clientBooking === 'booking' && (
          <>
            {storeData === null ? (
              <TouchableOpacity
                onPress={() => handlePackageModalOpen()}
                activeOpacity={0.8}
                style={styles.itemContainer}>
                <Text style={styles.itemLabel}>Select Booking</Text>
                <Image
                  source={Images?.forwardIcon}
                  style={styles.forwardDicicon}
                />
              </TouchableOpacity>
            ) : (
              <View activeOpacity={0.8} style={styles.card}>
                <Image source={storeData?.image} style={styles.image} />
                <View style={styles.content}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.name}>{storeData?.name}</Text>
                    <TouchableOpacity
                      onPress={() => setStoreData(null)}
                      activeOpacity={0.8}>
                      <Image
                        source={Images.deleteButton}
                        style={styles.deleteButton}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.categories}>
                    {storeData?.categories?.includes('Hair') && (
                      <View
                        style={{
                          right: 8,
                          paddingHorizontal: (mobileW * 2) / 100,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: (mobileW * 1) / 100,
                        }}>
                        <Image source={Images.Hair} style={styles.listIcons} />
                        <Text style={styles.iconText}>Hair</Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: (mobileW * 1) / 100,
                    }}>
                    <Image
                      source={Images?.calenderIcon}
                      style={styles.listIcons}
                    />
                    <Text style={styles.iconText}>
                      23 March, 2022 (from 1:00-2:00)
                    </Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Image
                      source={Images?.locationIcon}
                      style={styles.listIcons}
                    />
                    <Text style={styles.ratingText}>{'Home'}</Text>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SelectCustomer
          visible={isModalProfessionalVisible}
          onClose={handleCloseModal}
          onSelect={e => storeDataToState(e)}
        />
        <SelectBookingModal
          visible={isPackageModal}
          onClose={handlePackageModalClose}
          onSelect={e => storeServiceToState(e)}
        />
        {/* Header */}
        <AppHeader title={'Support'} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: (mobileW * 5) / 100,
            paddingHorizontal: (mobileW * 2) / 100,
            marginTop: (mobileW * 4) / 100,
          }}>
          <Text style={styles.selectTitle}>Submit Report or Feedback ?</Text>
          <Text style={[styles.payMethod, {marginTop: 10}]}>
            Please review alll of the details of your booking
          </Text>

          <View
            style={{
              paddingVertical: (mobileH * 2) / 100,
              paddingHorizontal: (mobileW * 3) / 100,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedOption('feebback')}
              style={styles.selectedView}>
              <Image
                source={
                  selectedOption === 'feebback'
                    ? Images.selectedButton
                    : Images.unSelectedButton
                }
                style={styles.plusIcon}
              />
              <Text style={styles.payMethod}>Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedOption('report')}
              style={[styles.selectedView, {left: (mobileW * 10) / 100}]}>
              <Image
                source={
                  selectedOption === 'report'
                    ? Images.selectedButton
                    : Images.unSelectedButton
                }
                style={styles.plusIcon}
              />
              <Text style={styles.payMethod}>Report</Text>
            </TouchableOpacity>
          </View>
          {selectedOption === 'report' && ReportPress()}
          <View>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              placeholder="Type here..."
              maxLength={500}
              placeholderTextColor={'#9E98AC'}
              style={{
                width: (mobileW * 90) / 100,
                height: (mobileW * 30) / 100,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: Colors.lightGray,
                borderRadius: (mobileW * 2) / 100,
                padding: (mobileW * 3) / 100,
                fontSize: 14,
                fontWeight: '400',
              }}
            />
          </View>
          <Text style={[styles.limitWords]}>Limit of 500 words</Text>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: (mobileW * 90) / 100,
            alignSelf: 'center',
          }}>
          <CommonButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    backgroundColor: Colors?.white,
    paddingVertical: (mobileW * 8) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    marginTop: (mobileW * 2) / 100,
    marginVertical: (mobileW * 3) / 100,
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
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
  },
  forwardDicicon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
    marginRight: (mobileW * 2) / 100,
  },
  txtView: {
    width: (mobileW * 68) / 100,
  },
  itemLabel: {
    fontSize: 14,
    color: '#301E39',
    marginLeft: 10,
    flex: 1,
    fontWeight: '600',
  },
  straightLine: {
    width: '92%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 5) / 100,
  },
  selectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color:Colors.textDark,
    left: 12,
  },
  dropdown: {
    height: (mobileW * 13) / 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 90) / 100,
    left: 10,
    marginTop: (mobileW * 4) / 100,
  },
  dropdownQue: {
    height: (mobileW * 8) / 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 65) / 100,
    right: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
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
  plusIcon: {
    width: (mobileW * 4.5) / 100,
    height: (mobileW * 4.5) / 100,
  },
  selectedView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 1.5) / 100,
  },
  payMethod: {
    fontSize: 14,
    fontWeight: '400',
    color: '#554F67',
    left: 12,
  },
  limitWords: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9E98AC',
    right: (mobileW * 4) / 100,
    alignSelf: 'flex-end',
    marginTop: (mobileW * 1.8) / 100,
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
    elevation: 3,
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: (mobileW * 90) / 100,
    marginVertical: (mobileW * 3) / 100,
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
  textContainer: {
    flex: 1,
  },
  profileImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 7) / 100,
    marginRight: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 1) / 100,
  },
  rating: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 4,
    fontWeight: '700',
  },
  review: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 4,
    fontWeight: '300',
  },
  starIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  nameText: {
    fontSize: (mobileW * 3.5) / 100,
    color: Colors.black,
    fontWeight: '600',
  },
  deleteButton: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
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
    padding: (mobileW * 2) / 100,
    borderRadius: (mobileW * 2) / 100,
    borderWidth: 1,
    borderColor: '#F6EFF9',
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
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
    marginBottom: 4,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingTxt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (mobileW * 2) / 100,
  },
  ratingText: {
    marginLeft: (mobileW * 2.3) / 100,
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
    marginTop: 10,
  },
  heartIconStyle: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  listIcons: {
    width: (mobileW * 3.8) / 100,
    height: (mobileW * 3.8) / 100,
    // left: (mobileW * 2) / 100,
    tintColor: '#9E98AC',
    resizeMode: 'contain',
  },
  iconText: {
    color: '#301E39',
    fontWeight: '400',
    fontSize: 12,
    left: (mobileW * 2) / 100,
  },
});
