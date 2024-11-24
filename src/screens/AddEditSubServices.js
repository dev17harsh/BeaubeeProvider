import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use appropriate icon library
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';
import { TextInput as TextInputPaper } from 'react-native-paper';
import CustomSwitch from '../components/CustomSwitch';
import { Images } from '../assets/images';

const AddEditSubServices = () => {
  const [isTierPricing, setIsTierPricing] = useState(false);
  const [gender, setGender] = useState('both');
  const [tcAccepted, setTcAccepted] = useState(false);
  const [serviceAvailabel, setServiceAvailabel] = useState(false);

  return (
    <View style={styles.mainConatiner}>
      <AppHeader title={"Add Combine & Save"} />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInputPaper
          style={styles.textInputStyle}
          outlineColor={"#EEE6F1"}
          activeOutlineColor={Colors?.primary}
          label="Service Name"
          mode="outlined"
        />
        <TextInputPaper
          style={[styles.textInputStyle, { height: DimensionsConfig?.screenHeight * 0.1 }]}
          outlineColor={"#EEE6F1"}
          activeOutlineColor={Colors?.primary}
          label="Service Description"
          mode="outlined"
        />

        <View style={styles.row}>
          <TextInputPaper
            style={[styles.textInputStyle, { width: '48%' }]}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={Colors?.primary}
            label="Service Charges"
            mode="outlined"
          />
          <TextInputPaper
            style={[styles.textInputStyle, { width: '48%' }]}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={Colors?.primary}
            label="Time Duration"
            mode="outlined"
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
              outlineColor={"#EEE6F1"}
              activeOutlineColor={Colors?.primary}
              label="Tier 1"
              value='$ 10'
              mode="outlined"
            />
            <TextInputPaper
              style={styles.textInputStyle}
              outlineColor={"#EEE6F1"}
              activeOutlineColor={Colors?.primary}
              label="Tier 2"
              value='$ 20'
              mode="outlined"
            />
            <TextInputPaper
              style={styles.textInputStyle}
              outlineColor={"#EEE6F1"}
              activeOutlineColor={Colors?.primary}
              label="Tier 3"
              value='$ 30'
              mode="outlined"
            />
            <TextInputPaper
              style={styles.textInputStyle}
              outlineColor={"#EEE6F1"}
              activeOutlineColor={Colors?.primary}
              label="Tier 4"
              value='$ 40'
              mode="outlined"
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>Add-ons (Optional) (5 Maximum)</Text>
        <Text style={styles.sectionTitle}>Add on 1</Text>
        <TextInputPaper
          style={styles.textInputStyle}
          outlineColor={"#EEE6F1"}
          activeOutlineColor={Colors?.primary}
          label="Add On Name"
          mode="outlined"
        />
        <View style={styles.row}>
          <TextInputPaper
            style={[styles.textInputStyle, { width: '48%' }]}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={Colors?.primary}
            label="Service Charges"
            mode="outlined"
          />
          <TextInputPaper
            style={[styles.textInputStyle, { width: '48%' }]}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={Colors?.primary}
            label="Time Duration"
            mode="outlined"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

        <View style={styles?.HorizontalLine} />

        <Text style={styles.sectionTitle}>Will this service be available at customer’s home?</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity onPress={() => setServiceAvailabel(true)} style={{ flexDirection: 'row', alignItems: 'center', marginRight: DimensionsConfig.screenHeight * 0.012 }}>
            <Image source={serviceAvailabel ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setServiceAvailabel(false)} style={{ flexDirection: 'row', alignItems: 'center' , marginRight: DimensionsConfig.screenHeight * 0.012 }}>
            <Image source={!serviceAvailabel ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>No</Text>
          </TouchableOpacity>
        </View>

        <View style={styles?.HorizontalLine} />

        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.radioGroup}>
        <TouchableOpacity onPress={() => setGender('both')} style={{ flexDirection: 'row', alignItems: 'center', marginRight: DimensionsConfig.screenHeight * 0.012  }}>
            <Image source={gender === 'both' ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>Both</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('female')} style={{ flexDirection: 'row', alignItems: 'center' , marginRight: DimensionsConfig.screenHeight * 0.012 }}>
            <Image source={gender === 'female' ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('male')} style={{ flexDirection: 'row', alignItems: 'center' , marginRight: DimensionsConfig.screenHeight * 0.012 }}>
            <Image source={gender === 'male' ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>Male</Text>
          </TouchableOpacity>
        </View>

        <View style={styles?.HorizontalLine} />

        <Text style={styles.sectionTitle}>Customer T&C</Text>
        <Text style={styles.descTitle}>Would you like to add any terms & conditions for your customers prior to or during the appointment? (E.g. Hair must be washed, bring your own braiding hair, treatment area must be shaved, etc.)</Text>
        <View style={styles.radioGroup}>
        <TouchableOpacity onPress={() => setTcAccepted(true)} style={{ flexDirection: 'row', alignItems: 'center', marginRight: DimensionsConfig.screenHeight * 0.012 , marginBottom: DimensionsConfig.screenHeight * 0.012 }}>
            <Image source={tcAccepted ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTcAccepted(false)} style={{ flexDirection: 'row', alignItems: 'center' , marginRight: DimensionsConfig.screenHeight * 0.012 }}>
            <Image source={!tcAccepted ? Images?.selectedButton : Images?.unSelectedButton} style={styles?.RadioIcon} />
            <Text style={styles.radio}>No</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="T&C" />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add more T&C</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: Colors?.white
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
    marginLeft: DimensionsConfig?.screenHeight * 0.013
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#301E39',
    // marginTop: DimensionsConfig?.screenHeight * 0.024,
    marginBottom: DimensionsConfig?.screenHeight * 0.016,
  },
  descTitle:{
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
    fontSize: 14
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
    marginRight: DimensionsConfig.screenHeight * 0.008
  },
  HorizontalLine:{
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: DimensionsConfig.screenHeight * 0.03
  }
});

export default AddEditSubServices;
