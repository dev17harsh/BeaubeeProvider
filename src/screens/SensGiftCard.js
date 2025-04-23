import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import { mobileH, mobileW } from '../components/utils';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
import { TextInput as TextInputPaper } from 'react-native-paper';
import CommonButton from '../components/CommonButton';
import SelectGiftCardModal from '../components/Modal.js/SelectGiftCardModal';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetGiftCardBackgroundAction } from '../redux/action/GetGiftCardBackgroundAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SendGiftAction, SendGiftRemoveAction } from '../redux/action/SendGiftAction';
import ToastMessage from '../components/ToastMessage';

const data = [
  { image: Images.backImage1 },
  { image: Images.backImage2 },
  { image: Images.backImage1 },
  { image: Images.backImage2 },
];

const paymentMethods = [
  {
    id: '1',
    icon: Images.applePayment,
    number: 'Apple Pay',
  },
  {
    id: '2',
    icon: Images.cardPayment,
    number: 'Debit/Credit Card',
  },
  {
    id: '3',
    icon: Images.GiftPayment,
    number: 'Gift Card',
  },
  {
    id: '4',
    icon: Images.paypalPayment,
    number: 'Paypal',
  },
  {
    id: '5',
    icon: Images.CreditPayment,
    number: 'Credit',
  },
];

const SensGiftCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const getGiftCardBackgroundData = useSelector((state) => state.getGiftCardBackgroundData);
  const sendGiftsData = useSelector((state) => state.sendGiftsData);
  const [giftCardBackgroundData, setGiftCardBackgroundData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalProfessionalVisible, setModalProfessionalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [Note, setNote] = useState('');

  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    color: ''
  });

  useEffect(() => {
    // console.log('getGiftCardBackgroundData?.response?.result' , getGiftCardBackgroundData?.response?.result)
    if (getGiftCardBackgroundData?.response?.result) {
      setGiftCardBackgroundData(getGiftCardBackgroundData?.response?.result)
    }
  }, [getGiftCardBackgroundData])

  useEffect(() => {
    if (sendGiftsData?.response?.message == 'success') {
      navigation.goBack()
      dispatch(
        SendGiftRemoveAction({})
      )
    }
  }, [sendGiftsData])


  useEffect(() => {
    dispatch(GetGiftCardBackgroundAction())
  }, [isFocused])


  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);
  const showToast = () => {
    setToastVisible(true);
  };


  const handleAmountChange = (text) => {
    // Remove any non-numeric characters except for the decimal point
    let numericValue = text.replace(/[^0-9.]/g, '');

    // Update the state with the formatted value
    setAmount(numericValue ? `$${numericValue}` : '');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {
      setSelectedImage(item?.id)
    }}>
      <Image
        resizeMode="contain"
        source={{ uri: item?.image }}
        style={[styles.cardIcons, selectedImage == item.id && { borderColor: Colors.primary }]}
      />
    </TouchableOpacity>
  );

  const renderPaymentMethod = ({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedId(item.id);
        }}
        style={styles.paymentMethodContainer}>
        <View style={styles.methodDetails}>
          <Image
            resizeMode="contain"
            source={item.icon}
            style={styles.cardIconsPayment}
          />
          <Text style={styles.methodText}>{item.number}</Text>
        </View>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={
              isSelected ? Images.selectedButton : Images.unSelectedButton
            }
            style={styles.forwardIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const onPressPost = async () => {
    const userId = await AsyncStorage.getItem('token')
    // console.log('selectedCustomer?.user_id', selectedCustomer?.user_id, selectedImage)
    if (selectedImage == null) {
      showToast()
      setToastData({
        message: 'Please Select Card Image',
        color: Colors?.red
      })
    } else if (!selectedCustomer?.user_id) {
      showToast()
      setToastData({
        message: 'Please Select Customer',
        color: Colors?.red
      })
    } else if (title == '') {
      showToast()
      setToastData({
        message: 'Please Entered Title',
        color: Colors?.red
      })
    } else if (amount == '') {
      showToast()
      setToastData({
        message: 'Please Entered Amount',
        color: Colors?.red
      })
    } else if (Note == '') {
      showToast()
      setToastData({
        message: 'Please Entered Note',
        color: Colors?.red
      })
    } else {
      const formData = new FormData();
      formData.append('business_id', userId);
      formData.append('customer_id', selectedCustomer?.user_id ? selectedCustomer?.user_id : '');
      formData.append('card_background_id', selectedImage);
      formData.append('title', title);
      formData.append('message', Note);
      formData.append('amount', amount);
      dispatch(SendGiftAction(formData))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ToastMessage
        visible={toastVisible}
        message={toastData.message}
        onClose={() => setToastVisible(false)}
        toastStyle={{
          backgroundColor: toastData.color
        }}
      />
      {/* Header */}
      <AppHeader title={'Send Gift Card'} />
      <SelectGiftCardModal
        visible={isModalProfessionalVisible}
        onClose={handleCloseModal}
        onSelect={e => {
          setSelectedCustomer(e)
        }}
      />
      {/* Content */}
      <ScrollView
        style={{
          paddingHorizontal: (mobileW * 2) / 100,
          backgroundColor: Colors.white,
          marginTop: (mobileW * 3) / 100,
        }}>
        <Text style={styles.selectTitle}>Customer Background</Text>
        <FlatList
          horizontal
          data={giftCardBackgroundData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: (mobileW * 4) / 100 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.selectTitle}>Details</Text>
        {selectedCustomer == null ? (
          <TouchableOpacity
            onPress={() => handleOpenModal()}
            activeOpacity={0.8}
            style={styles.containerSelctCustomer}>
            <Image source={Images?.businessprofile} style={styles.icon} />
            <Text style={styles.itemLabel}>Select Customer</Text>
            <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
          </TouchableOpacity>
        ) : (
          <View
            style={[styles.containerSelctCustomer]}>
            <Image
              source={{ uri: selectedCustomer.user_image }}
              resizeMode='cover'
              style={[styles.icon, { borderRadius: (mobileW * 5.5) / 100, }]}
            />
            <View style={{ width: '75%', marginLeft: 10 }}>
              <Text style={[styles.itemLabel, { marginLeft: 0 }]}>{selectedCustomer?.first_name ? `${selectedCustomer?.first_name} ${selectedCustomer?.last_name}`: selectedCustomer?.customer_name}</Text>
              <Text style={{
                color: '#9E98AC',
                fontSize: 12,
                fontWeight: '400'
              }}>{selectedCustomer.email}</Text>
            </View>
            <TouchableOpacity onPress={() => handleOpenModal()}>
              <Image source={Images?.EditPen} style={styles.forwardIcon} />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            alignItems: 'center',
            marginTop: (mobileH * 3) / 100,
            paddingBottom: (mobileH * 8) / 100,
          }}>
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric" // Ensures only numeric input
            mode="outlined"
            placeholder="Enter Amount"
          />
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
            mode="outlined"
            placeholder="Enter Title"
          />
          <TextInputPaper
            style={styles.textInputStyleNote}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Note"
            multiline
            value={Note}
            onChangeText={text => setNote(text)}
            mode="outlined"
            placeholder="Enter Note"
          />
          <View
            style={{
              marginTop: (mobileW * 5) / 100,
              width: '100%',
            }}>
            <Text style={styles.paymentMethodText}>Payment Method</Text>
          </View>
          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentMethod}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('PaymentMethod');
            }}>
            <Image source={Images.Add} style={styles.backIcon} />
            <Text style={styles.addButtonText}>Add payment method</Text>
          </TouchableOpacity>
          <View
            style={{
              width: (mobileW * 90) / 100,
              marginTop: (mobileW * 3) / 100,
            }}>
            <CommonButton onPress={() => { onPressPost() }} title={'Post'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  itemContainer: {
    marginRight: 10,
    // borderColor:'yellow'
  },
  cardIcons: {
    width: (mobileW * 45) / 100,
    height: (mobileW * 29) / 100,
    borderRadius: (mobileW * 4) / 100,
    resizeMode: 'cover',
    // backgroundColor: 'red',
    borderWidth: (mobileW * 1.5) / 100,
    borderColor: Colors.white,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    left: 12,
  },
  containerSelctCustomer: {
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
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  icon: {
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
  },
  itemLabel: {
    fontSize: 14,
    color: Colors.textDark,
    marginLeft: 10,
    flex: 1,
    fontWeight: '600',
  },
  forwardDicicon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  textInputStyle: {
    width: (mobileW * 90) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    marginTop: (mobileW * 4) / 100,
  },
  textInputStyleNote: {
    width: (mobileW * 90) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    marginTop: (mobileW * 4) / 100,
    height: (mobileH * 18) / 100,
    textAlignVertical: 'top',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 4) / 100,
    backgroundColor: '#ffffff',
    marginTop: (mobileW * 3) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    // elevation: 3,
    borderWidth: 1,
    borderColor: '#F6EFF9',
    width: (mobileW * 90) / 100,
    borderRadius: (mobileW * 3) / 100,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  cardIconsPayment: {
    width: (mobileW * 8) / 100,
    height: (mobileW * 8) / 100,
  },
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-start',
    left: (mobileW * 3) / 100,
  },
  addButtonText: {
    color: Colors?.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  paymentMethodText: {
    color: Colors.textDark,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default SensGiftCard;
