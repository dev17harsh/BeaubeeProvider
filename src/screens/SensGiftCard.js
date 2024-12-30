import React, {useState} from 'react';
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
import {mobileH, mobileW} from '../components/utils';
import {Images} from '../assets/images';
import {Colors} from '../theme/colors';
import {TextInput as TextInputPaper} from 'react-native-paper';
import CommonButton from '../components/CommonButton';
import SelectGiftCardModal from '../components/Modal.js/SelectGiftCardModal';

const data = [
  {image: Images.backImage1},
  {image: Images.backImage2},
  {image: Images.backImage1},
  {image: Images.backImage2},
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

const SensGiftCard = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        resizeMode="contain"
        source={item?.image}
        style={styles.cardIcons}
      />
    </View>
  );

  const renderPaymentMethod = ({item}) => {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader title={'Send Gift Card'} />
      <SelectGiftCardModal
        visible={isModalProfessionalVisible}
        onClose={handleCloseModal}
        // onSelect={e => storeDataToState(e)}
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
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: (mobileW * 4) / 100}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.selectTitle}>Details</Text>

        <TouchableOpacity
          onPress={() => handleOpenModal()}
          activeOpacity={0.8}
          style={styles.containerSelctCustomer}>
          <Image source={Images?.businessprofile} style={styles.icon} />
          <Text style={styles.itemLabel}>Select Customer</Text>
          <Image source={Images?.forwardIcon} style={styles.forwardDicicon} />
        </TouchableOpacity>
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
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Enter Amount"
          />
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Title"
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Enter Title"
          />
          <TextInputPaper
            style={styles.textInputStyleNote}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Note"
            multiline
            // onChangeText={text => setText(text)}
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
            <CommonButton onPress={()=>navigation.navigate('Profile')} title={'Post'} />
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
    backgroundColor: 'red',
    borderWidth: (mobileW * 1.5) / 100,
    borderColor: Colors.white,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
    fontWeight:'600',
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
