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
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const NewPromotions = ({navigation}) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader title={'New Promotions'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.paymentMethodContainer}>
            <View>
              <Text style={styles.selectTitle}>Customer</Text>
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Discount in %'}</Text>
                <TextInputPaper
                  style={styles.textInputStyle}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="%"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter %"
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
                <FlatList
                  data={tagOptions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderTag}
                  numColumns={3}
                  contentContainerStyle={styles.tagContainer}
                />
              </View>
              <View style={styles.straightLine} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Expiery'}</Text>
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

          <View style={styles.paymentMethodContainer}>
            <View>
              <Text style={styles.selectTitle}>First Order</Text>
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Discount in %'}</Text>
                <TextInputPaper
                  style={styles.textInputStyle}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="%"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter %"
                />
              </View>
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Discount in $'}</Text>
                <TextInputPaper
                  style={styles.textInputStyle}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="%"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter $"
                />
              </View>
              <View style={styles.straightLine} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Expiery'}</Text>
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

          <View style={styles.paymentMethodContainer}>
            <View>
              <Text style={styles.selectTitle}>Prepaid Packages</Text>
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Discount in %'}</Text>
                <TextInputPaper
                  style={styles.textInputStyle}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="%"
                  // onChangeText={text => setText(text)}
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
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="%"
                  // onChangeText={text => setText(text)}
                  mode="outlined"
                  placeholder="Enter $"
                />
              </View>
              <View>
                <FlatList
                  data={checkboxOptions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderCheckbox}
                  contentContainerStyle={styles.checkboxContainer}
                />
              </View>
              <View style={styles.straightLine} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Expiery'}</Text>
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

          <View style={styles.paymentMethodContainer}>
            <View>
              <Text style={styles.selectTitle}>Free AHS Travel Fee</Text>
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{'Enter Expiery'}</Text>
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

          <View style={styles.paymentMethodContainerForDetails}>
            <View>
              <Text style={styles.selectTitle}>Promo Details</Text>
              <View style={styles.methodDetailsForDetails}>
                <Text style={styles.methodTextForDetails}>
                  {'Add further details or terms and conditions'}
                </Text>
                <TextInputPaper
                  style={styles.textInputStyleForDetails}
                  outlineColor={Colors?.OrGray}
                  activeOutlineColor={Colors?.gray}
                  label="Details"
                  // onChangeText={text => setText(text)}
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
            <CommonButton title={'Post'} />
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
