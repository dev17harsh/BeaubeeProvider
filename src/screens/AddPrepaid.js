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
import AppHeader from '../components/AppHeader';
import ListProfessionalModal from '../components/ListProfessionalModal';
import ServiceSelector from '../components/Modal.js/ServiceSelector';
import {mobileH, mobileW} from '../components/utils';
import {Images} from '../assets/images';
import CommonButton from '../components/CommonButton';
import {Colors} from '../theme/colors';
import Storage from '../components/Storage';
import SelectPackageModal from '../components/Modal.js/SelectPackageModal';
import {Dropdown} from 'react-native-element-dropdown';

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

const AddPrepaid = ({navigation}) => {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [ProfessionalData, setProfessionalData] = useState(null);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const [isServiceSelectorVisible, setServiceSelectorVisible] = useState(false);
  const [chosenService, setChosenService] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [isSelected, setIsSelected] = useState('card');
  // Callback to handle selected service data from ServiceSelector
  const handleServiceSelection = service => {
    setChosenService(service);
    console.log('Chosen Service:', service);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={'Add Prepaid'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListProfessionalModal
          visible={isModalProfessionalVisible}
          onClose={handleCloseModal}
          onSelect={e => storeDataToState(e)}
        />
        <SelectPackageModal
          visible={isServiceSelectorVisible}
          onClose={() => setServiceSelectorVisible(false)}
          onSelect={handleServiceSelect}
          tabs={tabs}
          services={services}
        />
        {/* Upload Section */}
        <View
          style={{
            paddingHorizontal: (mobileW * 5) / 100,
            marginTop: (mobileW * 5) / 100,
          }}>
          <Text style={styles.headerLabel}>Customer</Text>
          {ProfessionalData == null ? (
            <TouchableOpacity
              onPress={() => handleOpenModal()}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image
                source={Images?.AddProfissional}
                resizeMode="contain"
                style={styles.icon}
              />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Select Customer</Text>
              </View>
              <Image source={Images?.forwardIcon} style={styles.forwardIcon} />
            </TouchableOpacity>
          ) : (
            <View activeOpacity={0.8} style={styles.itemContainer}>
              <Image
                source={ProfessionalData?.image}
                resizeMode="contain"
                style={styles.personImage}
              />
              <View style={styles.txtView}>
                <Text style={[styles.itemLabel, {left: 9}]}>
                  {ProfessionalData.name}
                </Text>
                <Text style={styles.emailLabel}>{ProfessionalData.email}</Text>
              </View>
              <TouchableOpacity onPress={() => handleOpenModal()}>
                <Image source={Images?.EditPen} style={styles.forwardIcon1} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.straightLine} />
          <Text style={styles.headerLabel}>Package</Text>
          {chosenService == null ? (
            <TouchableOpacity
              onPress={() => setServiceSelectorVisible(true)}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image
                source={Images?.selectService}
                resizeMode="contain"
                style={styles.icon}
              />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Select Service</Text>
              </View>
              <Image source={Images?.forwardIcon} style={styles.forwardIcon} />
            </TouchableOpacity>
          ) : (
            <View activeOpacity={0.8} style={styles.serviceContainer}>
              <Image
                source={chosenService?.image}
                resizeMode="contain"
                style={styles.serviceImage}
              />
              <View style={[styles.txtView, {left: 8}]}>
                <Text style={styles.titleService}>{chosenService.name}</Text>
              </View>
              <TouchableOpacity
                style={[styles.txtView]}
                onPress={() => setServiceSelectorVisible(true)}>
                <Image source={Images?.EditPen} style={styles.forwardIcon1} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.straightLine} />
          <Text style={styles.headerLabel}>Number of treatment</Text>
          {dropDown()}
          <View style={styles.straightLine} />
          <Text style={styles.headerLabel}>Payment Method</Text>
          <TouchableOpacity
            onPress={() => setIsSelected('card')}
            style={styles.cartStyleView}>
            <Image
              source={
                isSelected === 'card'
                  ? Images.selectedButton
                  : Images.unSelectedButton
              }
              style={styles.plusIcon}
            />
            <Text style={styles.cardLabel}>
              Customer’s saved payment method
            </Text>
          </TouchableOpacity>

          {/* Pay cash in store */}
          {isSelected === 'card' && (
            <View style={styles.paymentMethodContainer}>
              <View style={styles.methodDetails}>
                <Image
                  resizeMode="contain"
                  source={Images?.cardPayment}
                  style={styles.cardIcons}
                />
                <Text style={styles.methodText}>{'********** 5334'}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setIsSelected('cash')}
            style={styles.cartStyleView}>
            <Image
              source={
                isSelected === 'cash'
                  ? Images.selectedButton
                  : Images.unSelectedButton
              }
              style={styles.plusIcon}
            />
            <Text style={styles.cardLabel}>Pay cash in store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsSelected('other')}
            style={styles.cartStyleView}>
            <Image
              source={
                isSelected === 'other'
                  ? Images.selectedButton
                  : Images.unSelectedButton
              }
              style={styles.plusIcon}
            />
            <Text style={styles.cardLabel}>Other</Text>
          </TouchableOpacity>
          <View style={{height: 20}} />
          {/* Post Button */}
          <CommonButton
            onPress={() => navigation.goBack()}
            title={'Done'}
          />
          <View style={{height: 50}} />
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
  itemContainer: {
    flexDirection: 'row',
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
  serviceImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 1.5) / 100,
  },
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  forwardIcon1: {
    width: (mobileW * 4.5) / 100,
    height: (mobileW * 4.5) / 100,
    tintColor: Colors.primary,
  },
  txtView: {
    width: (mobileW * 66) / 100,
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 15,
    color: '#301E39',
    fontWeight: '600',
  },
  emailLabel: {
    fontSize: (mobileW * 3) / 100,
    color: '#333333',
    marginLeft: 10,
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
    marginVertical: (mobileW * 5) / 100,
    marginTop: (mobileW * 7) / 100,
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
});

export default AddPrepaid;
