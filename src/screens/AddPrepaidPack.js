import React, {useState} from 'react';
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
import {DimensionsConfig} from '../theme/dimensions';
import {Images} from '../assets/images';
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
import {TextInput as TextInputPaper} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import CommonButton from '../components/CommonButton';
import {Dropdown} from 'react-native-element-dropdown';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const data = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
  {label: 'Option 4', value: '4'},
];
const AddPrepaidPack = ({navigation}) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [tancc, settancc] = useState(false);

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
  };

  const handleTagPress = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag)); // Deselect
    } else {
      setSelectedTags([...selectedTags, tag]); // Select
    }
  };

  const renderCheckbox = ({item}) => (
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

  const renderTag = ({item}) => (
    <TouchableOpacity
      style={[
        styles.tag,
        selectedTags.includes(item) ? styles.selectedTag : styles.unselectedTag,
      ]}
      onPress={() => handleTagPress(item)}>
      <Text
        style={[
          styles.tagText,
          selectedTags.includes(item) && styles.selectedTagText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const dropDownCategory = () => {
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
        placeholder={!isFocus ? 'Category' : '...'}
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

  const dropDownService = () => {
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
        placeholder={!isFocus ? 'Service' : '...'}
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
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}} >
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader title={'Add Prepaid Package'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: (mobileW * 5) / 100,
            marginTop: (mobileW * 3) / 100,
          }}>
          <Text style={styles.selectTitle}>Package</Text>
          <View style={{paddingVertical: (mobileW * 3) / 100}}>
            {dropDownCategory()}
          </View>

          <View style={{paddingVertical: (mobileW * 3) / 100}}>
            {dropDownService()}
          </View>

          <View style={styles.paymentMethodContainer}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.selectTitle}>Option 1</Text>
                <Text style={styles.selectTitle}>Total: $30</Text>
              </View>
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Prepay'}</Text>
                <TextInputPaper
                  style={styles.textInputStyle}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="Enter no"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter no"
                />
              </View>

              <View style={styles.methodDetails}>
                <View>
                  <Text style={styles.methodText}>{'Expiery'}</Text>
                  <Text style={styles.methodTexttxt}>
                    {'Price per treatment'}
                  </Text>
                </View>
                <TextInputPaper
                  style={styles.textInputStyle}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="%"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter Expiery"
                />
              </View>
            </View>
          </View>

          <View style={{paddingVertical: (mobileH * 2) / 100}}>
            <CustomButton
              style={{backgroundColor: Colors.semiPurpleLight}}
              textStyle={{color: Colors.primary}}
              title={'Add'}
            />
          </View>

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
                  <Text style={[styles.tandCTxt, {left: (mobileW * 2) / 100}]}>
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
                  <Text style={[styles.tandCTxt, {left: (mobileW * 2) / 100}]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.methodDetails}>
                <TextInputPaper
                  style={styles.tancTextInput}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="T&C"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter T&C"
                />
              </View>
              <CustomButton
                style={{backgroundColor: Colors.semiPurpleLight,marginTop:mobileW*3/100}}
                textStyle={{color: Colors.primary}}
                title={'Add more T&C'}
              />
            </View>
          </View>

          <View
            style={{
              width: (mobileW * 92) / 100,
              marginBottom: (mobileW * 5) / 100,
            }}>
            <CommonButton title={'Save'} />
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
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    fontWeight: '700',
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
  checkUncheck: {flexDirection: 'row', width: (mobileW * 15) / 100},
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
});
