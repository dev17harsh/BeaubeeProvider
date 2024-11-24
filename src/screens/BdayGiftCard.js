import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TextInput as TextInputPaper} from 'react-native-paper';
import {Images} from '../assets/images';
import InputField from '../components/InputField';
import {DimensionsConfig} from '../theme/dimensions';
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {mobileH, mobileW} from '../components/utils';
import CommonButton from '../components/CommonButton';
import ListProfessionalModal from '../components/ListProfessionalModal';
import SelectPackageModal from '../components/Modal.js/SelectPackageModal';
import CustomSwitch from '../components/CustomSwitch';
const data = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
  {label: 'Option 4', value: '4'},
];
export default function BdayGiftCard({navigation}) {
  const [isEnable, setisEnable] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState('savedPayment'); // Default selection
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [isPackageModal, setisPackageModal] = useState(false);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const handlePackageModalOpen = () => setisPackageModal(true);
  const handlePackageModalClose = () => setisPackageModal(false);
  const dropDown = () => {
    return (
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    );
  };

  const toggleOpen = () => {
    setisEnable(!isEnable);
  };

  const paymentMethods = [
    {
      name: 'Kelvin Nikotis',
      image: Images.image11,
      amount: '30',
      date: '25 th January 2024',
    },
    {
      name: 'Jasmin dois',
      image: Images.image22,
      amount: '50',
      date: '15 th January 2024',
    },
    {
      name: 'Diana Nois',
      image: Images.image33,
      amount: '70',
      date: '12 th January 2024',
    },
    {
      name: 'Ashley Nick',
      image: Images.image44,
      amount: '100',
      date: '17 th January 2024',
    },
    {
      name: 'Kelvin Nikotis',
      image: Images.image55,
      amount: '80',
      date: '28 th January 2024',
    },
    {
      name: "Nick Jone's",
      image: Images.Image1,
      amount: '90',
      date: '31 th January 2024',
    },
  ];

  const renderPaymentMethod = (items) => {
     const item = items.item
    return (
      <View
        style={{
          paddingVertical: (mobileH * 1) / 100,
          paddingHorizontal: (mobileW * 3) / 100,
        }}>
        <View style={styles.paymentMethodContainer}>
          <View style={styles.methodDetails}>
            <Image
              resizeMode="contain"
              source={item?.image}
              style={styles.cardIcons}
            />
            <View style={{left: (mobileH * 1.5) / 100}}>
              <Text style={styles.nameText}>TO : {item.name}</Text>
              <Text style={styles.methodText}>On : {item.date}</Text>
            </View>
          </View>
          <View style={styles.straightLinegiftCard} />
          <View>
            <Text style={styles.bdayText}>{'Happy Birthday 🥳🎉'}</Text>
            <Text style={[styles.nameText, {color: Colors.primary}]}>
              ${item.amount}.00
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
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
        <View style={{marginTop: (mobileH * 3) / 100}}>
          <TextInput
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
          />
        </View>
        <View style={{marginTop: (mobileH * 3) / 100}}>
          <TextInput
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
          />
        </View>
        <View style={{marginTop: (mobileH * 3) / 100}}>
          <TextInput
            style={{
              width: (mobileW * 90) / 100,
              fontSize: 14,
              backgroundColor: '#fff',
            }}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Birthdat Message"
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Enter birthday message"
          />
        </View>
        <View style={styles.straightLine} />
        <Text
          style={[
            styles.selectTitle,
            {alignSelf: 'flex-start', left: (mobileW * 3) / 100},
          ]}>
          Gift Cards Sent
        </Text>
        <FlatList
          data={paymentMethods}
          renderItem={(item, index) => renderPaymentMethod(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: (mobileW * 12) / 100}}
        />
      </ScrollView>
      <View
        style={{
          width: '95%',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 15,
        }}>
        <CommonButton onPress={()=>{navigation.navigate('SensGiftCard')}} title={'Send a Gift Card'}/>
      </View>
    </View>
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
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
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    left: 12,
  },
  paymentMethodContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
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
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 6) / 100,
  },
  methodText: {
    fontSize: 14,
    color: '#000',
    paddingVertical: (mobileW * 0.5) / 100,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  bdayText: {
    fontSize: 15,
    color: '#000',
    paddingVertical: (mobileW * 0.5) / 100,
    fontWeight: '600',
  },
});
