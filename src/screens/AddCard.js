import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {TextInput as TextInputPaper} from 'react-native-paper';
import {Images} from '../assets/images';
import InputField from '../components/InputField';
import {DimensionsConfig} from '../theme/dimensions';
import { Colors } from '../theme/colors';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
export default function AddCardDetails({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
          <Image source={Images.BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Debit/Credit Card</Text>
        <TouchableOpacity>
          <Image style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: (mobileW * 5) / 100}}>
        <View
          style={{
            marginLeft: (mobileW * 5) / 100,
            paddingVertical: (mobileW * 3) / 100,
            marginTop: (mobileW * 3) / 100,
          }}>
          <TextInputPaper
            style={{width: (mobileW * 90) / 100 , backgroundColor: '#fff' , fontSize: 14}}
            outlineColor={Colors?.primary}
             activeOutlineColor={Colors?.primary}
            label="Name on card"
            // onChangeText={text => setText(text)}
            placeholder="Name on card"
            mode="outlined"
          />
        </View>

        <View
          style={{
            marginLeft: (mobileW * 5) / 100,
            paddingVertical: (mobileW * 3) / 100,
          }}>
          <TextInputPaper
            style={{width: (mobileW * 90) / 100 , backgroundColor: '#fff' , fontSize: 14}}
            outlineColor={Colors?.primary}
             activeOutlineColor={Colors?.primary}
            label="Card Number"
            // onChangeText={text => setText(text)}
            placeholder="Card Number"
            mode="outlined"
          />
        </View>

        <View
          style={{
            width: mobileW,
            paddingHorizontal: (mobileW * 5) / 100,
            marginTop: (mobileW * 3) / 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInputPaper
           style={{width: (mobileW * 53) / 100 , backgroundColor: '#fff' , fontSize: 14}}
           outlineColor={Colors?.primary}
            activeOutlineColor={Colors?.primary}
            label="Card Expiery"
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Card Expiery"
          />
          <TextInputPaper
            style={{width: (mobileW * 33) / 100 , backgroundColor: '#fff' , fontSize: 14}}
            outlineColor={Colors?.primary}
             activeOutlineColor={Colors?.primary}
            label="CVV"
            // onChangeText={text => setText(text)}
            placeholder="CVV"
            mode="outlined"
          />
        </View>

        <TouchableOpacity
          // onPress={() => navigation.navigate('AddAddress')}
          style={styles.selectLocationButton}>
          <Text style={styles.selectionButtonTxt}>Save Card</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    backgroundColor: '#ffffff',
    paddingVertical: (mobileW * 8) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  backButton: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
  spacingBtwInput: {
    marginVertical: DimensionsConfig?.screenHeight * 0.012,
    marginLeft: (mobileW * 5) / 100,
  },
  selectLocationButton: {
    backgroundColor: '#8D10B5',
    width: (mobileW * 90) / 100,
    paddingVertical: (mobileW * 3) / 100,
    borderRadius: (mobileW * 3) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: (mobileH * 50) / 100,
  },
  selectionButtonTxt: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  AddressIcon: {
    width: (mobileW * 13) / 100,
    height: (mobileW * 13) / 100,
  },
});
