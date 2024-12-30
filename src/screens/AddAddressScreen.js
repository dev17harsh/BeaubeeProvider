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
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
export default function AddAddressScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <AppHeader title={'Address Details'} />
        <ScrollView
          contentContainerStyle={{paddingBottom: (mobileW * 5) / 100}}>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: (mobileW * 2) / 100,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              marginTop: (mobileW * 5) / 100,
            }}>
            <Image
              source={Images.MapImage2}
              style={{
                width: (mobileW * 90) / 100,
                height: (mobileW * 40) / 100,
                borderTopLeftRadius: (mobileW * 2.3) / 100,
                borderTopRightRadius: (mobileW * 2.3) / 100,
              }}
            />
            <View
              style={{
                width: (mobileW * 90) / 100,
                //   height: (mobileW * 10) / 100,
                paddingHorizontal: (mobileW * 5) / 100,
                paddingVertical: (mobileW * 4) / 100,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomLeftRadius: (mobileW * 2.3) / 100,
                borderBottomRightRadius: (mobileW * 2.3) / 100,
              }}>
              <View>
                <Text style={{fontSize: 15, color: '#0D0E11', fontWeight: '600'}}>
                  Location Name
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#554F67',
                    marginTop: (mobileW * 1) / 100,
                    fontWeight:'400'
                  }}>
                  Scheme no. 78 Vijay nagar indore
                </Text>
              </View>
              <Image source={Images.EditPen} style={styles.backIcon} />
            </View>
          </View>
          <View
            style={{
              width: mobileW,
              paddingHorizontal: (mobileW * 5) / 100,
              marginTop: (mobileW * 5) / 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInputPaper
              style={{
                width: (mobileW * 43) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              outlineColor={Colors?.primary}
              activeOutlineColor={Colors?.primary}
              label="Flat/Villa No."
              // value="Flat/Villa No."
              placeholder="Flat add here"
              // onChangeText={text => setText(text)}
              mode="outlined"
            />
            <TextInputPaper
              style={{
                width: (mobileW * 43) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              outlineColor={Colors?.primary}
              activeOutlineColor={Colors?.primary}
              label="Building/Villa"
              // onChangeText={text => setText(text)}
              placeholder="Building name here"
              mode="outlined"
            />
          </View>

          <View
            style={{
              width: mobileW,
              paddingHorizontal: (mobileW * 5) / 100,
              marginTop: (mobileW * 5) / 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInputPaper
              style={{
                width: (mobileW * 43) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              outlineColor={Colors?.primary}
              activeOutlineColor={Colors?.primary}
              label="Street"
              // onChangeText={text => setText(text)}
              mode="outlined"
              placeholder="Street name here"
            />
            <TextInputPaper
              style={{
                width: (mobileW * 43) / 100,
                fontSize: 14,
                backgroundColor: '#fff',
              }}
              label="Area"
              outlineColor={Colors?.primary}
              activeOutlineColor={Colors?.primary}
              // onChangeText={text => setText(text)}
              placeholder="Area name here"
              mode="outlined"
            />
          </View>

          <View
            style={{
              marginLeft: (mobileW * 5) / 100,
              paddingVertical: (mobileW * 5) / 100,
            }}>
            <InputField
              placeholder="Directions"
              // value={'email'}
              //   onChangeText={setEmail}
            />
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              width: (mobileW * 60) / 100,
              justifyContent: 'space-around',
              marginLeft: (mobileW * 3) / 100,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={Images.Home2} style={styles.AddressIcon} />
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontWeight: '400',
                  color: '#000',
                  marginTop: (mobileW * 1) / 100,
                }}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={Images.workImage} style={styles.AddressIcon} />
  
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontWeight: '400',
                  color: '#000',
                  marginTop: (mobileW * 1) / 100,
                }}>
                Work
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={Images.Location2} style={styles.AddressIcon} />
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontWeight: '400',
                  color: '#000',
                  marginTop: (mobileW * 1) / 100,
                }}>
                Other
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddBusinessTimingScreen')}
          style={styles.selectLocationButton}>
          <Text style={styles.selectionButtonTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    borderRadius: DimensionsConfig?.buttonHeight * 0.18,
    paddingVertical: DimensionsConfig?.buttonHeight * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: (mobileH * 15) / 100,
    position: 'absolute',
    bottom: (mobileH * 2) / 100,
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
