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
import CommonButton from '../components/CommonButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetSelectedServicesAction } from '../redux/action/GetSelectedServicesAction';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllServicesAction } from '../redux/action/GetAllServicesAction';
import { CreatePromotionAction, CreatePromotionRemoveAction } from '../redux/action/CreatePromotionAction';
import ToastMessage from '../components/ToastMessage';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const NewPromotions = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const getSelectedServiceData = useSelector((state) => state.getSelectedServiceData);
  const getAllServicesData = useSelector((state) => state.getAllServicesData);
  const createPromoData = useSelector((state) => state.createPromoData);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    color: ''
  });
  const [selectedCheckbox, setSelectedCheckbox] = useState('Storewide');
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [customerDiscount, setCustomerDiscount] = useState('')
  const [customerExpiryDate, setCustomerExpiryDate] = useState(null);
  const [showCustomerDatePicker, setCustomerShowDatePicker] = useState(false);
  const [firstOrderExpiryDate, setFirstOrderExpiryDate] = useState(null);
  const [showFirstOrderDatePicker, setFirstOrderShowDatePicker] = useState(false);
  const [prepaidExpiryDate, setPrepaidExpiryDate] = useState(null);
  const [showPrepaidDatePicker, setPrepaidShowDatePicker] = useState(false);
  const [freeAHSExpiryDate, setFreeAHSExpiryDate] = useState(null);
  const [showFreeAHSDatePicker, setShowFreeAHSDatePicker] = useState(false);
  const [discountTypeInFOrder, setDiscountTypeInFOrder] = useState('per')
  const [discountInPer, setDiscountInPer] = useState('')
  const [discountInDollar, setDiscountInDollar] = useState('')
  const [prepaidDiscount, setPrepaidDiscount] = useState('')
  const [prepaidAmount, setPrepaidAmount] = useState('')
  const [prepaidCheckBox, setSelectedPrepaidCheckbox] = useState('');
  const [promoDetail, setPromoDetail] = useState('');



  useEffect(() => {
    GetSelectedServices()
  }, [isFocused])


  useEffect(() => {
    if (getSelectedServiceData?.response?.result) {
      setCategories(getSelectedServiceData?.response?.result)
    }
  }, [getSelectedServiceData])

  useEffect(() => {
    if (createPromoData?.response?.message == 'success') {
      navigation.goBack()
      dispatch(
        CreatePromotionRemoveAction({})
      )
    } else if (createPromoData?.response?.message) {
      showToast()
      setToastData({
        message: createPromoData?.response?.message,
        color: Colors?.red
      })
      dispatch(
        CreatePromotionRemoveAction({})
      )
    }
  }, [createPromoData])

  useEffect(() => {
    if (getAllServicesData?.response?.result) {
      setAllServices(getAllServicesData?.response?.result)
    }
  }, [getAllServicesData])

  const GetSelectedServices = async () => {
    const userId = await AsyncStorage.getItem('token')
    const params = {
      business_id: userId
    }
    dispatch(GetSelectedServicesAction(params))
    dispatch(GetAllServicesAction(params))
  }

  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 30);

  const checkboxOptions = ['Storewide', 'Category', 'Service'];
  const tagOptions = [
    'Hair Cut',
    'Trim',
    'Buzz Cut',
    'Mohawk',
    'Pompadour',
    'Undercut',
    'Fade',
    'Crew Cut',
    'Shaggy',
    'Caesar Cut',
    'Taper',
    'Bowl Cut',
  ];

  const handleCheckboxPress = option => {
    setSelectedCheckbox(option);
    setSelectedTags([])
  };

  const handleTagPress = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag)); // Deselect
    } else {
      setSelectedTags([...selectedTags, tag]); // Select
    }
  };

  const renderCheckbox = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.checkbox,
        selectedCheckbox === item && styles.selectedCheckbox,
      ]}
      onPress={() => handleCheckboxPress(item)}>
      <Image
        resizeMode="contain"
        source={
          selectedCheckbox === item ? Images?.CheckMark : Images.Unchecked
        }
        style={styles.cardIcons}
      />
      <Text
        style={[
          styles.checkboxText,
          selectedCheckbox === item && styles.selectedCheckboxText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderPrepaidCheckbox = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.checkbox,
        prepaidCheckBox === item && styles.selectedCheckbox,
      ]}
      onPress={() => setSelectedPrepaidCheckbox(item)}>
      <Image
        resizeMode="contain"
        source={
          prepaidCheckBox === item ? Images?.CheckMark : Images.Unchecked
        }
        style={styles.cardIcons}
      />
      <Text
        style={[
          styles.checkboxText,
          prepaidCheckBox === item && styles.selectedCheckboxText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTag = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tag,
        selectedTags.includes(item?.category_id) ? styles.selectedTag : styles.unselectedTag,
      ]}
      onPress={() => handleTagPress(item?.category_id)}>
      <Text
        style={[
          styles.tagText,
          selectedTags.includes(item?.category_id) && styles.selectedTagText,
        ]}>
        {item?.category}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceTag = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tag,
        selectedTags.includes(item?.service_id) ? styles.selectedTag : styles.unselectedTag,
      ]}
      onPress={() => handleTagPress(item?.service_id)}>
      <Text
        style={[
          styles.tagText,
          selectedTags.includes(item?.service_id) && styles.selectedTagText,
        ]}>
        {item?.service}
      </Text>
    </TouchableOpacity>
  );

  const onPressPost = async () => {
    if (customerDiscount == '') {
      showToast()
      setToastData({
        message: 'Please Enter Customer Discount',
        color: Colors?.red
      })
    } else if (customerExpiryDate == null) {
      showToast()
      setToastData({
        message: 'Please Select Expiery Date',
        color: Colors?.red
      })
    } else {
      const userId = await AsyncStorage.getItem('token')
      const formData = new FormData();
      formData.append('business_id', userId);
      formData.append('promo_type', selectedCheckbox.toString());
      formData.append('discount', customerDiscount.toString());
      formData.append('target_ids', JSON.stringify(selectedTags));
      formData.append('expiry_date', customerExpiryDate.toString());
      formData.append('first_order_discount_percentage', discountInPer.toString());
      formData.append('first_order_discount_dollor', discountInDollar.toString());
      formData.append('first_order_expiry', firstOrderExpiryDate.toString());
      formData.append('prepaid_discount', prepaidDiscount.toString());
      formData.append('prepaid_min_amount', prepaidAmount.toString());
      formData.append('prepaid_promo_type', prepaidCheckBox.toString());
      formData.append('prepaid_expiry', prepaidExpiryDate.toString());
      formData.append('free_ahs_expiry', freeAHSExpiryDate.toString());
      formData.append('promo_details', promoDetail.toString());

      console.log('formData', formData)
      dispatch(CreatePromotionAction(formData))
    }
  }

  const showToast = () => {
    setToastVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ToastMessage
        visible={toastVisible}
        message={toastData.message}
        onClose={() => setToastVisible(false)}
        toastStyle={{
          backgroundColor: toastData.color
        }}
      />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <AppHeader title={'New Promotions'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.paymentMethodContainer}>
              <View>
                <Text style={styles.selectTitle}>Customer</Text>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Discount in %'}</Text>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#EEE6F1'}
                    activeOutlineColor={'#EEE6F1'}
                    label="Enter %"
                    keyboardType='numeric'
                    maxLength={2}
                    value={customerDiscount}
                    onChangeText={text => setCustomerDiscount(text)}
                    mode="outlined"
                    placeholder=""
                  />
                </View>
                <View style={styles.straightLine} />
                <View>
                  <FlatList
                    data={checkboxOptions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCheckbox}
                    contentContainerStyle={styles.checkboxContainer}
                  />
                </View>
                {/* Render Tags using FlatList */}
                <View>
                  {selectedCheckbox == 'Category' ? (
                    <FlatList
                      data={categories}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderTag}
                      numColumns={3}
                      contentContainerStyle={styles.tagContainer}
                    />
                  ) : selectedCheckbox == 'Service' ? (
                    <FlatList
                      data={allServices}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderServiceTag}
                      numColumns={3}
                      contentContainerStyle={styles.tagContainer}
                    />
                  ) : null}
                </View>
                <View style={styles.straightLine} />
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Expiery'}</Text>
                  <TouchableOpacity onPress={() => {
                    setCustomerShowDatePicker(true)
                  }} style={[styles.textInputStyle, { borderColor: '#EEE6F1', borderWidth: 1, padding: DimensionsConfig.screenHeight * 0.02, borderRadius: DimensionsConfig.screenHeight * 0.006 }]}>
                    <Text style={{
                      color: '#9E98AC',
                      fontSize: 14,
                      fontWeight: '400'
                    }}>{customerExpiryDate || 'Select Expiry'}</Text>
                  </TouchableOpacity>
                  {showCustomerDatePicker && (
                    <DateTimePicker
                      value={customerExpiryDate || minimumDate}
                      mode="date"
                      display="default"
                      minimumDate={minimumDate}
                      onChange={(event, selectedDate) => {
                        setCustomerShowDatePicker(false);
                        if (selectedDate) {
                          const formattedDate = selectedDate.toISOString().slice(0, 10);
                          setCustomerExpiryDate(formattedDate);
                        }
                      }}
                    />)}
                </View>
              </View>
            </View>

            <View style={styles.paymentMethodContainer}>
              <View>
                <Text style={styles.selectTitle}>First Order</Text>
                <View style={styles.methodDetails}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity onPress={() => {
                      setDiscountTypeInFOrder('per')
                      setDiscountInDollar('')
                    }}>
                      <Image
                        resizeMode="contain"
                        source={
                          discountTypeInFOrder === 'per' ? Images?.CheckMark : Images.Unchecked
                        }
                        // source={Images?.CheckMark}
                        style={[styles.cardIcons, { marginRight: DimensionsConfig.screenHeight * 0.004 }]}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.methodText, { width: (mobileW * 34) / 100, }]}>{'Discount in %'}</Text>
                  </View>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#EEE6F1'}
                    activeOutlineColor={'#EEE6F1'}
                    disabled={discountTypeInFOrder === 'per' ? false : true}
                    label="%"
                    value={discountInPer}
                    onChangeText={text => setDiscountInPer(text)}
                    keyboardType='numeric'
                    maxLength={2}
                    mode="outlined"
                    placeholder="Enter %"
                  />
                </View>
                <View style={styles.methodDetails}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity onPress={() => {
                      setDiscountTypeInFOrder('dollar')
                      setDiscountInPer('')
                    }}>
                      <Image
                        resizeMode="contain"
                        source={
                          discountTypeInFOrder === 'dollar' ? Images?.CheckMark : Images.Unchecked
                        }
                        // source={Images?.CheckMark}
                        style={[styles.cardIcons, { marginRight: DimensionsConfig.screenHeight * 0.004 }]}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.methodText, { width: (mobileW * 34) / 100, }]}>{'Discount in $'}</Text>
                  </View>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#EEE6F1'}
                    activeOutlineColor={'#EEE6F1'}
                    label="%"
                    disabled={discountTypeInFOrder === 'dollar' ? false : true}
                    value={discountInDollar}
                    keyboardType='numeric'
                    onChangeText={text => setDiscountInDollar(text)}
                    mode="outlined"
                    placeholder="Enter $"
                  />
                </View>
                <View style={styles.straightLine} />
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Expiery'}</Text>
                  <TouchableOpacity onPress={() => {
                    setFirstOrderShowDatePicker(true)
                  }} style={[styles.textInputStyle, { borderColor: '#EEE6F1', borderWidth: 1, padding: DimensionsConfig.screenHeight * 0.02, borderRadius: DimensionsConfig.screenHeight * 0.006 }]}>
                    <Text style={{
                      color: '#9E98AC',
                      fontSize: 14,
                      fontWeight: '400'
                    }}>{firstOrderExpiryDate || 'Select Expiry'}</Text>
                  </TouchableOpacity>
                  {showFirstOrderDatePicker && (
                    <DateTimePicker
                      value={firstOrderExpiryDate || minimumDate}
                      mode="date"
                      display="default"
                      minimumDate={minimumDate}
                      onChange={(event, selectedDate) => {
                        setFirstOrderShowDatePicker(false);
                        if (selectedDate) {
                          const formattedDate = selectedDate.toISOString().slice(0, 10);
                          setFirstOrderExpiryDate(formattedDate);
                        }
                      }}
                    />)}
                </View>
              </View>
            </View>

            <View style={styles.paymentMethodContainer}>
              <View>
                <Text style={styles.selectTitle}>Prepaid Packages</Text>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Discount in %'}</Text>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#EEE6F1'}
                    activeOutlineColor={'#EEE6F1'}
                    label="%"
                    value={prepaidDiscount}
                    onChangeText={text => setPrepaidDiscount(text)}
                    keyboardType='numeric'
                    maxLength={2}
                    mode="outlined"
                    placeholder="Enter %"
                  />
                </View>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>
                    {'When you buy treatments of amount'}
                  </Text>
                  <TextInputPaper
                    style={styles.textInputStyle}
                    outlineColor={'#EEE6F1'}
                    activeOutlineColor={'#EEE6F1'}
                    label="%"
                    value={prepaidAmount}
                    onChangeText={text => setPrepaidAmount(text)}
                    keyboardType='numeric'
                    mode="outlined"
                    placeholder="Enter $"
                  />
                </View>
                <View>
                  <FlatList
                    data={checkboxOptions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderPrepaidCheckbox}
                    contentContainerStyle={styles.checkboxContainer}
                  />
                </View>
                <View style={styles.straightLine} />
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Expiery'}</Text>
                  <TouchableOpacity onPress={() => {
                    setPrepaidShowDatePicker(true)
                  }} style={[styles.textInputStyle, { borderColor: '#EEE6F1', borderWidth: 1, padding: DimensionsConfig.screenHeight * 0.02, borderRadius: DimensionsConfig.screenHeight * 0.006 }]}>
                    <Text style={{
                      color: '#9E98AC',
                      fontSize: 14,
                      fontWeight: '400'
                    }}>{prepaidExpiryDate || 'Select Expiry'}</Text>
                  </TouchableOpacity>
                  {showPrepaidDatePicker && (
                    <DateTimePicker
                      value={prepaidExpiryDate || minimumDate}
                      mode="date"
                      display="default"
                      minimumDate={minimumDate}
                      onChange={(event, selectedDate) => {
                        setPrepaidShowDatePicker(false);
                        if (selectedDate) {
                          const formattedDate = selectedDate.toISOString().slice(0, 10);
                          setPrepaidExpiryDate(formattedDate);
                        }
                      }}
                    />)}
                </View>
              </View>
            </View>

            <View style={styles.paymentMethodContainer}>
              <View>
                <Text style={styles.selectTitle}>Free AHS Travel Fee</Text>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodText}>{'Expiery'}</Text>
                  <TouchableOpacity onPress={() => {
                    setShowFreeAHSDatePicker(true)
                  }} style={[styles.textInputStyle, { borderColor: '#EEE6F1', borderWidth: 1, padding: DimensionsConfig.screenHeight * 0.02, borderRadius: DimensionsConfig.screenHeight * 0.006 }]}>
                    <Text style={{
                      color: '#9E98AC',
                      fontSize: 14,
                      fontWeight: '400'
                    }}>{freeAHSExpiryDate || 'Select Expiry'}</Text>
                  </TouchableOpacity>
                  {showFreeAHSDatePicker && (
                    <DateTimePicker
                      value={freeAHSExpiryDate || minimumDate}
                      mode="date"
                      display="default"
                      minimumDate={minimumDate}
                      onChange={(event, selectedDate) => {
                        setShowFreeAHSDatePicker(false);
                        if (selectedDate) {
                          const formattedDate = selectedDate.toISOString().slice(0, 10);
                          setFreeAHSExpiryDate(formattedDate);
                        }
                      }}
                    />)}
                </View>
              </View>
            </View>

            <View style={styles.paymentMethodContainerForDetails}>
              <View>
                <Text style={styles.selectTitle}>Promo Details</Text>
                <View style={styles.methodDetailsForDetails}>
                  <Text style={styles.methodTextForDetails}>
                    {'Add further details or terms and conditions'}
                  </Text>
                  <TextInputPaper
                    style={styles.textInputStyleForDetails}
                    outlineColor={'#EEE6F1'}
                    activeOutlineColor={'#EEE6F1'}
                    label="Details"
                    value={promoDetail}
                    onChangeText={text => setPromoDetail(text)}
                    mode="outlined"
                    placeholder="Add Details"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: (mobileW * 92) / 100,
                marginBottom: (mobileW * 5) / 100,
              }}>
              <CommonButton title={'Post'} onPress={() => {
                onPressPost()
              }} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewPromotions;

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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    fontSize: 14,
    color: '#000',
    width: (mobileW * 40) / 100,
  },
  methodTextForDetails: {
    fontSize: 14,
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
    fontWeight: '700',
    color: '#000',
  },
  textInputStyle: {
    width: (mobileW * 40) / 100,
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
    fontSize: 14,
    color: '#301E39',
    marginLeft: 10,
  },
  selectedCheckboxText: {
    color: '#301E39',
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
    backgroundColor: '#F6EFF9',
  },
  tagText: {
    fontSize: 14,
    color: Colors.black,
  },
  selectedTagText: {
    color: '#FFFFFF',
  },
});