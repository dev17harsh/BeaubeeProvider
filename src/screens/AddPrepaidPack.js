import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { DimensionsConfig } from '../theme/dimensions';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
import AppHeader from '../components/AppHeader';
import { TextInput as TextInputPaper } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import CommonButton from '../components/CommonButton';
import { Dropdown } from 'react-native-element-dropdown';
import { GetCategoryAction } from '../redux/action/GetCategoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetSelectedServicesAction } from '../redux/action/GetSelectedServicesAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { GetServicesDetailAction } from '../redux/action/GetServicesDetailAction';
import { AddPrepaidPackageAction, AddPrepaidPackageRemoveAction } from '../redux/action/AddPrepaidPackageAction';
import ToastMessage from '../components/ToastMessage';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const data = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];
const AddPrepaidPack = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const getSelectedServiceData = useSelector((state) => state.getSelectedServiceData);
  const getServicesDetailData = useSelector((state) => state.getServicesDetailData);
  const addPrepaidPackageData = useSelector((state) => state.addPrepaidPackageData);
  const [categorieValue, setCategorieValue] = useState(null);
  const [serviceValue, setServiceValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [tancc, settancc] = useState(false);
  const [categories, setCategories] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [prepay, setPrepay] = useState('');
  const [price, setPrice] = useState('');
  const [options, setOptions] = useState([]);
  const [TCMessage, setTCMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    color: ''
  });

  useEffect(() => {
    // console.log('addPrepaidPackageData?.response', addPrepaidPackageData?.response)
    if (addPrepaidPackageData?.response?.message == 'success') {
      navigation.goBack()
      dispatch(
        AddPrepaidPackageRemoveAction({})
      )
    }
  }, [addPrepaidPackageData])


  useEffect(() => {
    if (getSelectedServiceData?.response?.result) {
      // console.log('getSelectedServiceData?.response?.result', getSelectedServiceData?.response?.result)
      const dropdownData = formatCategorieDropdownData(getSelectedServiceData?.response?.result);

      setCategories(dropdownData)
    }
  }, [getSelectedServiceData])

  useEffect(() => {
    // console.log('getServicesDetailData?.response?.result?.length' , getServicesDetailData?.response?.result?.length)
    if (Array.isArray(getServicesDetailData?.response?.result)) {
      const dropdownData = formatServiceDropdownData(getServicesDetailData?.response?.result);
      setServicesData(dropdownData)
    } else {
      setServicesData([])
    }
  }, [getServicesDetailData])


  useEffect(() => {
    GetSelectedServices()
  }, [isFocused])

  const GetSelectedServices = async () => {
    const userId = await AsyncStorage.getItem('token')
    const params = {
      business_id: userId
    }
    dispatch(GetSelectedServicesAction(params))
  }

  const showToast = () => {
    setToastVisible(true);
  };


  const fetchSubServiceData = async (category_id) => {
    const userId = await AsyncStorage.getItem('token')
    // console.log('category_id===>' , category_id)
    dispatch(GetServicesDetailAction({
      business_id: userId,
      category_id: category_id,
      service_type: ''
    }))
  }


  const formatCategorieDropdownData = (data) => {
    return data.map(item => ({
      label: item.category, // Use the "name" for the label
      value: item.category_id // Use the "id" for the value
    }));
  };

  const formatServiceDropdownData = (data) => {
    return data.map(item => ({
      label: item.service, // Use the "name" for the label
      value: item.service_id // Use the "id" for the value
    }));
  };


  const handleAdd = () => {
    if (prepay && price) {
      const newOption = {
        id: options.length + 1,
        prepay: parseFloat(prepay),
        price: parseFloat(price)
      };
      setOptions([...options, newOption]);
      setPrepay('');
      setPrice('');
    }
  };

  const handleDelete = (id) => {
    const updatedOptions = options.filter(item => item.id !== id);
    setOptions(updatedOptions);
  };

  const totalAmount = options.reduce((sum, item) => sum + item.price, 0);


  const onPressSave = async () => {
    const userId = await AsyncStorage.getItem('token')
    // console.log('selectedCustomer?.user_id', selectedCustomer?.user_id, selectedImage)
    if (categorieValue == null) {
      showToast()
      setToastData({
        message: 'Please select Category Id',
        color: Colors?.red
      })
    }
    else if (serviceValue == null) {
      showToast()
      setToastData({
        message: 'Please select Service Id',
        color: Colors?.red
      })
    } else if (options.length == 0) {
      showToast()
      setToastData({
        message: 'Please Add some Options',
        color: Colors?.red
      })
    }
    else {
      const formData = new FormData();
      const termValue = [TCMessage]
      formData.append('business_id', userId.toString());
      formData.append('category_id', categorieValue);
      formData.append('service_id', serviceValue);
      formData.append('total_price', totalAmount);
      formData.append('options', JSON.stringify(options));
      formData.append('terms', JSON.stringify(termValue));
      console.log("formData ====>", formData)
      dispatch(AddPrepaidPackageAction(formData))
    }
  }


  const dropDownCategory = () => {
    return (
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Category' : '...'}
        value={categorieValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCategorieValue(item.value);
          fetchSubServiceData(item.value)
          setIsFocus(false);
        }}
      />
    );
  };

  const dropDownService = () => {
    return (
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={servicesData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Service' : '...'}
        value={serviceValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setServiceValue(item.value);
          setIsFocus(false);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} >
       <ToastMessage
        visible={toastVisible}
        message={toastData.message}
        onClose={() => setToastVisible(false)}
        toastStyle={{
          backgroundColor: toastData.color
        }}
      />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <AppHeader title={'Add Prepaid Package'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: (mobileW * 5) / 100,
              marginTop: (mobileW * 3) / 100,
            }}>
            <Text style={styles.selectTitle}>Package</Text>
            <View style={{ paddingVertical: (mobileW * 3) / 100 }}>
              {dropDownCategory()}
            </View>
            {servicesData.length > 0 && (
              <View style={{ paddingVertical: (mobileW * 3) / 100 }}>
                {dropDownService()}
              </View>
            )}

            <View style={styles.paymentMethodContainer}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.selectTitle}>Option {options.length + 1}</Text>
                  <Text style={styles.selectTitle}>Total: ${totalAmount}</Text>
                </View>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Prepay'}</Text>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#ccc'}
                    activeOutlineColor={'#888'}
                    label="Enter no"
                    mode="outlined"
                    placeholder="Enter no"
                    maxLength={2}
                    value={prepay}
                    onChangeText={setPrepay}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.methodDetails}>
                  <View>
                    <Text style={styles.methodText}>{'Price'}</Text>
                    <Text style={styles.methodTexttxt}>
                      {'Price per treatment'}
                    </Text>
                  </View>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#ccc'}
                    activeOutlineColor={'#888'}
                    label="$"
                    mode="outlined"
                    placeholder="Enter Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType='numeric'
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingVertical: (mobileH * 2) / 100 }}>
              <CustomButton
                style={{ backgroundColor: Colors.semiPurpleLight }}
                textStyle={{ color: Colors.primary }}
                onPress={handleAdd}
                title={'Add'}
              />
            </View>
            {options.length > 0 && (
              <View style={styles.paymentMethodContainer}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.optionContainer}>
                      <View>
                        {/* <Text style={styles.optionText}>Option {index + 1}:</Text> */}
                        <Text style={[styles.methodText, { marginBottom: DimensionsConfig.screenHeight * 0.005 }]}>Prepay: <Text style={styles.methodTexttxt}>{item.prepay}</Text></Text>
                        <Text style={styles.methodText}>Price: <Text style={styles.methodTexttxt}>${item.price}</Text></Text>
                      </View>
                      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButtonContainer}>
                        {/* <Text style={styles.deleteButtonText}>Delete</Text> */}
                        <Image
                          source={Images?.deleteButton}
                          style={styles.deleteButton}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>)}

            <View style={styles.paymentMethodContainer}>
              <View>
                <Text style={styles.selectTitle}>Customer T&C</Text>
                <View style={styles.methodDetails}>
                  <Text style={styles.tandCTxt}>
                    {
                      'Would you like to add any terms & conditions for your customers prior to or during the appointment? (E.g. Hair must be washed, bring your own braiding hair, treatment area must be shaved, etc.)'
                    }
                  </Text>
                </View>
                <View style={styles.checkUncheckMainView}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => settancc(true)}
                    style={styles.checkUncheck}>
                    <Image
                      resizeMode="contain"
                      source={
                        tancc ? Images.selectedButton : Images.unSelectedButton
                      }
                      style={styles.cardIcons}
                    />
                    <Text style={[styles.tandCTxt, { left: (mobileW * 2) / 100 }]}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => settancc(false)}
                    style={styles.checkUncheck}>
                    <Image
                      resizeMode="contain"
                      source={
                        !tancc ? Images.selectedButton : Images.unSelectedButton
                      }
                      style={styles.cardIcons}
                    />
                    <Text style={[styles.tandCTxt, { left: (mobileW * 2) / 100 }]}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.methodDetails}>
                  <TextInputPaper
                    style={styles.tancTextInput}
                    outlineColor={Colors?.OrGray}
                    activeOutlineColor={Colors?.gray}
                    disabled={!tancc}
                    label="T&C"
                    onChangeText={text => setTCMessage(text)}
                    value={TCMessage}
                    mode="outlined"
                    placeholder="Enter T&C"
                  />
                </View>
                {/* <CustomButton
                  style={{ backgroundColor: Colors.semiPurpleLight, marginTop: mobileW * 3 / 100 }}
                  textStyle={{ color: Colors.primary }}
                  title={'Add more T&C'}
                /> */}
              </View>
            </View>

            <View
              style={{
                width: (mobileW * 92) / 100,
                marginBottom: (mobileW * 5) / 100,
              }}>
              <CommonButton title={'Save'} onPress={onPressSave} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddPrepaidPack;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: '#F6EFF9',
    shadowRadius: 5,
    width: (mobileW * 90) / 100,
    marginVertical: (mobileW * 3) / 100,
  },
  paymentMethodContainerForDetails: {
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
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '88%',
    paddingVertical: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 1) / 100,
  },
  methodDetailsForDetails: {
    width: '88%',
    paddingVertical: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 1) / 100,
  },
  cardIcons: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  methodText: {
    fontSize: 16,
    color: '#000',
    width: (mobileW * 40) / 100,
  },
  tandCTxt: {
    fontSize: 14,
    color: '#554F67',
    fontWeight: '400',
    width: (mobileW * 80) / 100,
  },
  methodTexttxt: {
    fontSize: 14,
    color: Colors.OrGray,
    width: (mobileW * 40) / 100,
    marginTop: (mobileW * 1) / 100,
  },
  methodTextForDetails: {
    fontSize: 16,
    color: '#000',
    width: (mobileW * 90) / 100,
  },
  straightLine: {
    width: '90%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    // left:-13,
    marginVertical: (mobileW * 5) / 100,
  },
  selectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#301E39',
  },
  textInputStyle: {
    width: (mobileW * 40) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  tancTextInput: {
    width: (mobileW * 82) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  textInputStylePackage: {
    width: (mobileW * 90) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  textInputStyleForDetails: {
    width: (mobileW * 80) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
    left: (mobileW * 3) / 100,
    height: (mobileH * 20) / 100,
    textAlignVertical: 'top',
    marginTop: (mobileW * 4) / 100,
  },
  checkboxContainer: {},
  checkbox: {
    borderRadius: (mobileW * 2) / 100,
    paddingVertical: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 2) / 100,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    marginTop: (mobileW * 3) / 100,
    width: (mobileW * 30) / 100,
  },
  selectedCheckbox: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  checkboxText: {
    fontSize: 16,
    color: '#6C5CE7',
    marginLeft: 10,
  },
  selectedCheckboxText: {
    color: '#6C5CE7',
  },
  tagContainer: {
    marginTop: 20,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 5,
  },
  selectedTag: {
    backgroundColor: Colors.primary,
  },
  unselectedTag: {
    backgroundColor: Colors.semiPurpleLight,
  },
  tagText: {
    fontSize: 14,
    color: Colors.black,
  },
  selectedTagText: {
    color: '#FFFFFF',
  },
  dropdown: {
    height: (mobileW * 12) / 100,
    borderColor: '#F6EFF9',
    borderWidth: 0.5,
    borderRadius: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 92) / 100,
    marginTop: (mobileW * 2) / 100,
  },
  checkUncheck: { flexDirection: 'row', width: (mobileW * 15) / 100 },
  checkUncheckMainView: {
    width: (mobileW * 35) / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: (mobileW * 2) / 100,
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center'
  },
  optionText: {
    fontSize: 16,
  },
  deleteButtonContainer: {
  },
  deleteButton: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
});
