import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use appropriate icon library
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';
import { TextInput as TextInputPaper } from 'react-native-paper';
import CustomSwitch from '../components/CustomSwitch';
import { Images } from '../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddSubServiceAction, AddSubServiceRemoveAction } from '../redux/action/AddSubServiceAction';

const AddEditSubServices = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const addSubServiceData = useSelector((state) => state.addSubServiceData);
  const [isTierPricing, setIsTierPricing] = useState(false);
  const [gender, setGender] = useState('both');
  const [tcAccepted, setTcAccepted] = useState(false);
  const [serviceAvailabel, setServiceAvailabel] = useState(false);
  const [addOnName, setAddOnName] = useState('');
  const [addOnServiceCharges, setAddOnServiceCharges] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [addOns, setAddOns] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');
  const [tier1, setTier1] = useState(0);
  const [tier2, setTier2] = useState(0);
  const [tier3, setTier3] = useState(0);
  const [termCondition, setTermCondition] = useState('');

  useEffect(() => {
    if (addSubServiceData?.response?.message == 'success') {
      navigation.goBack()
      dispatch(AddSubServiceRemoveAction({}))
    }
  }, [addSubServiceData])


  const handleAdd = () => {
    if (addOns.length >= 5) {
      // Alert.alert('Limit Reached', 'You can only add up to 5 add-ons.');
      return;
    }
    if (addOnName && addOnServiceCharges && timeDuration) {
      const newAddOn = { addOnName, addOnServiceCharges, timeDuration };
      setAddOns([...addOns, newAddOn]);
      setAddOnName('');
      setAddOnServiceCharges('');
      setTimeDuration('');
    } else {
      Alert.alert('Incomplete Fields', 'Please fill all fields before adding.');
    }
  };

  // Delete an add-on by index
  const handleDelete = (index) => {
    const updatedAddOns = addOns.filter((_, i) => i !== index);
    setAddOns(updatedAddOns);
  };

  const transformAddOn = (schedule) => {
    return {
      addOnName: schedule.map(item => item.addOnName),
      serviceCharges: schedule.map(item => item.serviceCharges),
      timeDuration: schedule.map(item => item.timeDuration),
    };
  }

  const onPressSave = async () => {
    const userId = await AsyncStorage.getItem('token')
    const values = transformAddOn(addOns)
    const formData = new FormData();
    formData.append('business_id', userId);
    formData.append('category_id', props?.route?.params?.data?.category_id);
    formData.append('service_type', props?.route?.params?.type);
    formData.append('service', values.addOnName);
    formData.append('price', values.serviceCharges);
    formData.append('duration', values.timeDuration);
    formData.append('description', serviceDesc);
    formData.append('tier_pricing_status', isTierPricing ? 'Yes' : 'No');
    formData.append('tier1', tier1);
    formData.append('tier2', tier2);
    formData.append('tier3', tier3);
    formData.append('home_service', serviceAvailabel ? 'Yes' : 'No');
    formData.append('gender', gender);
    formData.append('term_condition_status', tcAccepted ? 'Yes' : 'No');
    formData.append('term_condition', termCondition);
    console.log('formData', formData)

    await dispatch(AddSubServiceAction(formData));
  }

  return (
    <SafeAreaView style={styles.mainConatiner}>
      <View style={styles.mainConatiner}>
        <AppHeader title={props?.route?.params?.type == 'Service' ? 'Add Service' : 'Add Combine & Save'} />
        <ScrollView contentContainerStyle={styles.container}>
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={'#EEE6F1'}
            activeOutlineColor={Colors?.primary}
            label="Service Name"
            mode="outlined"
            value={serviceName}
            onChangeText={setServiceName}
          />
          <TextInputPaper
            style={[
              styles.textInputStyle,
              { height: DimensionsConfig?.screenHeight * 0.1 },
            ]}
            outlineColor={'#EEE6F1'}
            activeOutlineColor={Colors?.primary}
            label="Service Description"
            mode="outlined"
            value={serviceDesc}
            onChangeText={setServiceDesc}
          />

          <View style={styles.row}>
            <TextInputPaper
              style={[styles.textInputStyle, { width: '48%' }]}
              outlineColor={'#EEE6F1'}
              activeOutlineColor={Colors?.primary}
              label="Service Charges"
              mode="outlined"
              value={serviceCharge}
              keyboardType={'numeric'}
              onChangeText={setServiceCharge}
            />
            <TextInputPaper
              style={[styles.textInputStyle, { width: '48%' }]}
              outlineColor={'#EEE6F1'}
              activeOutlineColor={Colors?.primary}
              label="Time Duration"
              mode="outlined"
              value={serviceDuration}
              keyboardType={'numeric'}
              onChangeText={setServiceDuration}
            />
          </View>

          <View style={styles.switchRow}>
            <CustomSwitch
              isEnabled={isTierPricing}
              toggleSwitch={() => setIsTierPricing(!isTierPricing)}
            />
            <Text style={styles.label}>Tier Pricing</Text>
          </View>

          {isTierPricing && (
            <View style={{ marginTop: 10 }}>
              <TextInputPaper
                style={styles.textInputStyle}
                outlineColor={'#EEE6F1'}
                activeOutlineColor={Colors?.primary}
                label="Tier 1"
                value={`${tier1}`}
                keyboardType={'numeric'}
                onChangeText={setTier1}
                mode="outlined"
              />
              <TextInputPaper
                style={styles.textInputStyle}
                outlineColor={'#EEE6F1'}
                activeOutlineColor={Colors?.primary}
                label="Tier 2"
                value={`${tier2}`}
                keyboardType={'numeric'}
                onChangeText={setTier2}
                mode="outlined"
              />
              <TextInputPaper
                style={styles.textInputStyle}
                outlineColor={'#EEE6F1'}
                activeOutlineColor={Colors?.primary}
                label="Tier 3"
                value={`${tier3}`}
                keyboardType={'numeric'}
                onChangeText={setTier3}
                mode="outlined"
              />
              {/* <TextInputPaper
                style={styles.textInputStyle}
                outlineColor={'#EEE6F1'}
                activeOutlineColor={Colors?.primary}
                label="Tier 4"
                value="$ 40"
                mode="outlined"
              /> */}
            </View>
          )}

          <Text style={styles.sectionTitle}>
            Add-ons (Optional) (5 Maximum)
          </Text>
          <FlatList
            data={addOns}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '98%', marginBottom: 10 }}>
                <View>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#301E39',
                  }}>{`Add On ${index + 1}: ${item.addOnName}`}</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#301E39',
                  }}>{`Charges: ${item.serviceCharges}`}</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#301E39',
                  }}>{`Duration: ${item.timeDuration}`}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(index)}
                >
                  <Image source={Images?.CrossIcon} style={styles.crossIcon} />
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.sectionTitle}>Add on {addOns.length + 1}</Text>
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={'#EEE6F1'}
            activeOutlineColor={Colors?.primary}
            label="Add On Name"
            mode="outlined"
            value={addOnName}
            onChangeText={setAddOnName}
          />
          <View style={styles.row}>
            <TextInputPaper
              style={[styles.textInputStyle, { width: '48%' }]}
              outlineColor={'#EEE6F1'}
              activeOutlineColor={Colors?.primary}
              label="Service Charges"
              mode="outlined"
              value={addOnServiceCharges}
              keyboardType={'numeric'}
              onChangeText={setAddOnServiceCharges}
            />
            <TextInputPaper
              style={[styles.textInputStyle, { width: '48%' }]}
              outlineColor={'#EEE6F1'}
              activeOutlineColor={Colors?.primary}
              label="Time Duration"
              mode="outlined"
              keyboardType={'numeric'}
              value={timeDuration}
              onChangeText={setTimeDuration}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          <View style={styles?.HorizontalLine} />

          <Text style={styles.sectionTitle}>
            Will this service be available at customer’s home?
          </Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              onPress={() => setServiceAvailabel(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: DimensionsConfig.screenHeight * 0.012,
              }}>
              <Image
                source={
                  serviceAvailabel
                    ? Images?.selectedButton
                    : Images?.unSelectedButton
                }
                style={styles?.RadioIcon}
              />
              <Text style={styles.radio}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setServiceAvailabel(false)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: DimensionsConfig.screenHeight * 0.012,
              }}>
              <Image
                source={
                  !serviceAvailabel
                    ? Images?.selectedButton
                    : Images?.unSelectedButton
                }
                style={styles?.RadioIcon}
              />
              <Text style={styles.radio}>No</Text>
            </TouchableOpacity>
          </View>

          <View style={styles?.HorizontalLine} />

          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              onPress={() => setGender('both')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: DimensionsConfig.screenHeight * 0.012,
              }}>
              <Image
                source={
                  gender === 'both'
                    ? Images?.selectedButton
                    : Images?.unSelectedButton
                }
                style={styles?.RadioIcon}
              />
              <Text style={styles.radio}>Both</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: DimensionsConfig.screenHeight * 0.012,
              }}>
              <Image
                source={
                  gender === 'female'
                    ? Images?.selectedButton
                    : Images?.unSelectedButton
                }
                style={styles?.RadioIcon}
              />
              <Text style={styles.radio}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: DimensionsConfig.screenHeight * 0.012,
              }}>
              <Image
                source={
                  gender === 'male'
                    ? Images?.selectedButton
                    : Images?.unSelectedButton
                }
                style={styles?.RadioIcon}
              />
              <Text style={styles.radio}>Male</Text>
            </TouchableOpacity>
          </View>

          <View style={styles?.HorizontalLine} />

          <View style={{
            padding: DimensionsConfig?.screenHeight * 0.024,
            borderWidth: DimensionsConfig?.screenHeight * 0.001,
            borderRadius: DimensionsConfig?.screenHeight * 0.01,
            borderColor: '#EEE6F1'
          }}>

            <Text style={styles.sectionTitle}>Customer T&C</Text>
            <Text style={styles.descTitle}>
              Would you like to add any terms & conditions for your customers
              prior to or during the appointment? (E.g. Hair must be washed, bring
              your own braiding hair, treatment area must be shaved, etc.)
            </Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                onPress={() => setTcAccepted(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: DimensionsConfig.screenHeight * 0.012,
                  marginBottom: DimensionsConfig.screenHeight * 0.012,
                }}>
                <Image
                  source={
                    tcAccepted ? Images?.selectedButton : Images?.unSelectedButton
                  }
                  style={styles?.RadioIcon}
                />
                <Text style={styles.radio}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTcAccepted(false)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: DimensionsConfig.screenHeight * 0.012,
                }}>
                <Image
                  source={
                    !tcAccepted
                      ? Images?.selectedButton
                      : Images?.unSelectedButton
                  }
                  style={styles?.RadioIcon}
                />
                <Text style={styles.radio}>No</Text>
              </TouchableOpacity>
            </View>

            <TextInput editable={tcAccepted} style={styles.input} placeholder="T&C" value={termCondition} onChangeText={setTermCondition} />
          </View>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('AddUpdateServiceScreen')}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>Add more T&C</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => onPressSave()}
            style={styles.saveButton}>
            <Text style={styles.saveTxtBTn}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  container: {
    flexGrow: 1,
    padding: DimensionsConfig?.screenHeight * 0.024,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  textInputStyle: {
    height: DimensionsConfig?.screenHeight * 0.064,
    marginBottom: 10,
    fontSize: 13,
    backgroundColor: '#fff',
  },
  halfInput: {
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: DimensionsConfig?.screenHeight * 0.014,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
    marginLeft: DimensionsConfig?.screenHeight * 0.013,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#301E39',
    // marginTop: DimensionsConfig?.screenHeight * 0.024,
    marginBottom: DimensionsConfig?.screenHeight * 0.016,
  },
  descTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#554F67',
    // marginTop: DimensionsConfig?.screenHeight * 0.024,
    marginBottom: DimensionsConfig?.screenHeight * 0.02,
  },
  addButton: {
    backgroundColor: '#EEE6F1',
    borderRadius: DimensionsConfig?.screenHeight * 0.012,
    paddingVertical: DimensionsConfig?.screenHeight * 0.02,
    alignItems: 'center',
    marginTop: DimensionsConfig?.screenHeight * 0.016,
  },
  addButtonText: {
    color: '#8D10B5',
    fontWeight: '600',
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radio: {
    fontSize: 14,
    fontWeight: '400',
    color: '#301E39',
  },
  radioSelected: {
    fontSize: 16,
    color: '#A020F0',
    fontWeight: 'bold',
  },
  RadioIcon: {
    height: DimensionsConfig.screenHeight * 0.025,
    width: DimensionsConfig.screenHeight * 0.025,
    resizeMode: 'contain',
    marginRight: DimensionsConfig.screenHeight * 0.008,
  },
  HorizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: DimensionsConfig.screenHeight * 0.03,
  },
  crossIcon: {
    height: DimensionsConfig.screenHeight * 0.018,
    width: DimensionsConfig.screenHeight * 0.018,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: DimensionsConfig?.screenHeight * 0.012,
    paddingVertical: DimensionsConfig?.screenHeight * 0.02,
    alignItems: 'center',
    marginTop: DimensionsConfig?.screenHeight * 0.016,
  },
  saveTxtBTn: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  }
});

export default AddEditSubServices;
