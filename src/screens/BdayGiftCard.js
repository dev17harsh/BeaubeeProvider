import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, TextInput as TextInputPaper } from 'react-native-paper';
import { Images } from '../assets/images';
import InputField from '../components/InputField';
import { DimensionsConfig } from '../theme/dimensions';
import { Colors } from '../theme/colors';
import AppHeader from '../components/AppHeader';
import { Dropdown } from 'react-native-element-dropdown';
import { mobileH, mobileW } from '../components/utils';
import CommonButton from '../components/CommonButton';
import ListProfessionalModal from '../components/ListProfessionalModal';
import SelectPackageModal from '../components/Modal.js/SelectPackageModal';
import CustomSwitch from '../components/CustomSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetSendGiftCardAction } from '../redux/action/GetSendGiftCardAction';
import { UpdateGiftCardForCustomerAction, UpdateGiftCardForCustomerRemoveAction } from '../redux/action/UpdateGiftCardForCustomerAction';
import { GetGiftCardForCustomerAction } from '../redux/action/GetGiftCardForCustomerAction';
export default function BdayGiftCard({ navigation }) {

  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const getSendGiftData = useSelector((state) => state.getSendGiftData);
  const updateGiftCardForCustomerData = useSelector((state) => state.updateGiftCardForCustomerData);
  const getGiftCardForCustomerData = useSelector((state) => state.getGiftCardForCustomerData);

  const [isEnable, setisEnable] = useState(false);

  const [bookingNumbervalue, setBookingNumberValue] = useState(null);
  const [amountvalue, setAmountValue] = useState(null);
  const [isBookingFocus, setIsBookingFocus] = useState(false);
  const [isAmountFocus, setIsAmountFocus] = useState(false);
  const [birthdayMsg, setBirthdayMsg] = useState('');
  const [selectedOption, setSelectedOption] = useState('savedPayment'); // Default selection
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [isPackageModal, setisPackageModal] = useState(false);

  const [sendedGiftCardData, setSendedGiftCardData] = useState([])
  const typingTimeoutRef = useRef(null);


  useEffect(() => {
    if (updateGiftCardForCustomerData?.response?.message == 'success') {
      dispatch(
        UpdateGiftCardForCustomerRemoveAction({})
      )
    }
  }, [updateGiftCardForCustomerData])



  useEffect(() => {
    // console.log('getSendGiftData?.response?.result' , getSendGiftData?.response?.result)
    if (getSendGiftData?.response?.result) {
      setSendedGiftCardData(getSendGiftData?.response?.result)
    }
  }, [getSendGiftData])


  useEffect(() => {
    // console.log('getGiftCardForCustomerData?.response?.result' , getGiftCardForCustomerData?.response?.result)
    if (getGiftCardForCustomerData?.response?.result) {
      // setSendedGiftCardData(getSendGiftData?.response?.result)
      setisEnable(getGiftCardForCustomerData?.response?.result?.enable_gift_card == 'true' ? true : false)
      setBirthdayMsg(getGiftCardForCustomerData?.response?.result?.gift_message)
      setAmountValue(getGiftCardForCustomerData?.response?.result?.gift_amount)
      setBookingNumberValue(getGiftCardForCustomerData?.response?.result?.enable_after_no_of_booking)
    }
  }, [getGiftCardForCustomerData])


  useEffect(() => {
    dispatch(GetSendGiftCardAction())
    dispatch(GetGiftCardForCustomerAction())
  }, [isFocused])



  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const handlePackageModalOpen = () => setisPackageModal(true);
  const handlePackageModalClose = () => setisPackageModal(false);
  const bookingNumberdata = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const amountdata = [
    { label: '$ 10', value: '10' },
    { label: '$ 20', value: '20' },
    { label: '$ 30', value: '30' },
    { label: '$ 40', value: '40' },
    { label: '$ 50', value: '50' },
  ];

  const BookingNumberdropDown = () => {
    return (
      <View>
        {/* Label positioned above dropdown */}
        <View style={{
          position: 'absolute',
          top: -10,
          left: 5,
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 4,
          maxWidth: '80%',
          zIndex: 1,
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: !isEnable ? '#D3D3D3' :  '#554F67',
          }}>Enable after this number of bookings</Text>
        </View>

        <Dropdown
          style={[styles.dropdown, isBookingFocus && { borderColor: '#665f78' }]}
          data={bookingNumberdata}
          disable={!isEnable}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isBookingFocus ? 'Select' : '...'}
          value={bookingNumbervalue}
          placeholderStyle={[styles.placeholderStyle, !isEnable && {color :  '#D3D3D3'}]}
          selectedTextStyle={[styles.selectedTextStyle, !isEnable && {color :  '#D3D3D3'}]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          onFocus={() => setIsBookingFocus(true)}
          onBlur={() => setIsBookingFocus(false)}
          onChange={item => {
            setBookingNumberValue(item.value);
            setIsBookingFocus(false);
            dispatch(UpdateGiftCardForCustomerAction(
              {
                action: 'enable_after_no_of_booking',
                status: item.value
              }
            ))
          }}
        />
      </View>
    );
  };

  const AmountdropDown = () => {
    return (
      <View>
        {/* Label positioned above dropdown */}
        <View style={{
          position: 'absolute',
          top: -10,
          left: 5,
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 4,
          maxWidth: '80%',
          zIndex: 1,
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color:!isEnable ? '#D3D3D3' :  '#554F67',
          }}>Gift Amount</Text>
        </View>

        <Dropdown
          style={[styles.dropdown, isAmountFocus && { borderColor: '#665f78' }]}
          data={amountdata}
          disable={!isEnable}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isAmountFocus ? 'Select' : '...'}
          value={amountvalue}
          placeholderStyle={[styles.placeholderStyle, !isEnable && {color :  '#D3D3D3'}]}
          selectedTextStyle={[styles.selectedTextStyle, !isEnable && {color :  '#D3D3D3'}]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          onFocus={() => setIsAmountFocus(true)}
          onBlur={() => setIsAmountFocus(false)}
          onChange={item => {
            setAmountValue(item.value);
            setIsAmountFocus(false);
            dispatch(UpdateGiftCardForCustomerAction(
              {
                action: 'gift_amount',
                status: item.value
              }
            ))
          }}
        />
      </View>
    );
  };

  const toggleOpen = () => {
    setisEnable(!isEnable);
    dispatch(UpdateGiftCardForCustomerAction(
      {
        action: 'enable_gift_card',
        status: !isEnable
      }
    ))
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Covers 4th to 20th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    return formattedDate;
  };


  const handleTextChange = (text) => {
    setBirthdayMsg(text);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout
    typingTimeoutRef.current = setTimeout(() => {
      handleAfterTyping(text);
    }, 500); // Trigger after 500ms of no typing
  };

  const handleAfterTyping = (text) => {
    console.log('Final text:', text);
    dispatch(UpdateGiftCardForCustomerAction(
      {
        action: 'gift_message',
        status: text
      }
    ))
    // Your action here (e.g., API call)
  };

  const renderPaymentMethod = items => {
    const item = items.item;
    return (
      <View
        style={{
          paddingHorizontal: (mobileW * 3) / 100,
        }}>
        <View style={styles.paymentMethodContainer}>
          <View style={styles.methodDetails}>
            <Image
              resizeMode="cover"
              source={{ uri: item?.card_background }}
              style={styles.cardIcons}
            />
            <View style={{ left: (mobileH * 1.5) / 100 }}>
              <Text style={styles.nameText}>To : {item.customer_name}</Text>
              <Text style={styles.methodText}>On : {formatDate(item.date)}</Text>
            </View>
          </View>
          <View style={styles.straightLinegiftCard} />
          <View>
            <Text style={styles.bdayText}>{item?.title}</Text>
            <Text style={[styles.nameText, { color: Colors.primary }]}>
              ${item.amount}.00
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ListProfessionalModal
          visible={isModalProfessionalVisible}
          onClose={handleCloseModal}
        // onSelect={e => storeDataToState(e)}
        />
        <SelectPackageModal
          visible={isPackageModal}
          onClose={handlePackageModalClose}
        // onSelect={e => storeDataToState(e)}
        />
        {/* Header */}
        <AppHeader title={'Birthday Gift Cards'} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: (mobileW * 5) / 100,
            paddingHorizontal: (mobileW * 2) / 100,
            marginTop: (mobileW * 4) / 100,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: (mobileW * 3) / 100,
              alignItems: 'center',
              width: (mobileW * 96) / 100,
            }}>
            <Text style={styles.selectTitle}>
              Enable gift cards for regular customers
            </Text>
            <CustomSwitch
              isEnabled={isEnable}
              toggleSwitch={() => {
                toggleOpen();
              }}
            />
          </View>
          <View style={{ marginTop: (mobileH * 3) / 100 }}>
            {/* <TextInput
              style={{
                width: (mobileW * 90) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              outlineColor={Colors?.OrGray}
              activeOutlineColor={Colors?.gray}
              label="Enable after this number of bookings"
              // onChangeText={text => setText(text)}
              mode="outlined"
              placeholder="Number of bookings"
            /> */}
            {BookingNumberdropDown()}
          </View>
          <View style={{ marginTop: (mobileH * 3) / 100 }}>
            {/* <TextInput
              style={{
                width: (mobileW * 90) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              outlineColor={Colors?.OrGray}
              activeOutlineColor={Colors?.gray}
              label="Gift Amount"
              // onChangeText={text => setText(text)}
              mode="outlined"
              placeholder="Enter gift amount"
            /> */}
            {AmountdropDown()}
          </View>
          <View style={{ marginTop: (mobileH * 2) / 100 }}>
            <TextInput
              style={{
                width: (mobileW * 90) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              disabled={!isEnable}
              outlineColor={'#EEE6F1'}
              activeOutlineColor={'#EEE6F1'}
              placeholderTextColor={'#554F67'}
              label="Birthday Message"
              value={birthdayMsg}
              onChangeText={handleTextChange}
              mode="outlined"
              placeholder="Enter birthday message"
            />
          </View>
          <View style={styles.straightLine} />
          <Text
            style={[
              styles.sentGiftCart,
              { alignSelf: 'flex-start', left: (mobileW * 3) / 100 },
            ]}>
            Gift Cards Sent
          </Text>
          <FlatList
            data={sendedGiftCardData}
            renderItem={(item, index) => renderPaymentMethod(item)}
            keyExtractor={item => item.gift_card_id}
            contentContainerStyle={{ paddingBottom: (mobileW * 18) / 100 }}
          />
        </ScrollView>
        <View
          style={{
            width: '95%',
            position: 'absolute',
            alignSelf: 'center',
            bottom: 15,
          }}>
          <CommonButton
            onPress={() => {
              navigation.navigate('SensGiftCard');
            }}
            title={'Send a Gift Card'}
          />
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
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: (mobileW * 2) / 100,
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
  },
  txtView: {
    width: (mobileW * 68) / 100,
  },
  itemLabel: {
    fontSize: (mobileW * 4) / 100,
    color: '#333333',
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
  },
  straightLine: {
    width: '92%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 5) / 100,
  },
  straightLinegiftCard: {
    width: '100%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 3) / 100,
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  dropdown: {
    height: (mobileW * 13) / 100,
    borderColor: '#EEE6F1',
    borderWidth: 0.5,
    borderRadius: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 90) / 100,
    // left: 10,
    // marginTop: (mobileW * 2) / 100,
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
    fontSize: 14,
    color: Colors.OrGray,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#301E39',
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
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    left: 12,
  },
  paymentMethodContainer: {
    justifyContent: 'space-between',
    paddingVertical: (mobileW * 5) / 100,
    backgroundColor: '#ffffff',
    marginTop: (mobileW * 3) / 100,
    borderRadius: (mobileW * 2.5) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: (mobileW * 90) / 100,
    marginVertical: (mobileW * 3) / 100,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcons: {
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    borderRadius: (mobileW * 6) / 100,
  },
  methodText: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '400',
    paddingVertical: (mobileW * 0.8) / 100,
  },
  nameText: {
    fontSize: 14,
    color: Colors.textDark,
    fontWeight: '700',
  },
  bdayText: {
    fontSize: 16,
    color: Colors.textDark,
    paddingVertical: (mobileW * 0.5) / 100,
    fontWeight: '700',
  },
  sentGiftCart: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
  },
});
