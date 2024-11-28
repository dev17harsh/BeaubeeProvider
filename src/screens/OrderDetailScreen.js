import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import {Colors} from '../theme/colors';
import {Images} from '../assets/images';
import {DimensionsConfig} from '../theme/dimensions';
import CommonButton from '../components/CommonButton';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const OrderDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader title={'Order Detail'} />

      <ScrollView style={styles.Scrollcontainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View
            style={[
              styles.infoContainer,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Image
              source={Images?.personImage}
              style={styles.professionalImage}
            />
            <View
              style={{
                width: (mobileW * 48) / 100,
                justifyContent: 'space-between',
                paddingVertical: (mobileW * 1) / 100,
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 4.5) / 100,
                  color: Colors.black,
                  fontWeight: '600',
                }}>
                Business
              </Text>
              <Text style={styles.emailPhone}>kynthiajohnson@email.com</Text>
              <Text style={styles.emailPhone}>+123 456 7890</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: (mobileW * 1) / 100,
              }}>
              <Image source={Images?.starIcon} style={styles.backIcon} />
              <Text style={styles.ratingText}>{'5.0'}</Text>
            </View>
          </View>
        </View>

        {/* Detail Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detail</Text>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Business</Text>
              <Text style={styles.value}>Kynthia's Hair Salon</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Service</Text>
              <Text style={styles.value}>Straight Hair</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Price</Text>
              <Text style={[styles.value, styles.price]}>$60.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>Straight Hair</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Appointment Date</Text>
              <Text style={styles.value}>29th March, 2022</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Appointment Time</Text>
              <Text style={styles.value}>12:00PM-1:00PM</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Professional</Text>
              <Text style={styles.value}>Linda Johnson</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Service Location</Text>
              <Text style={styles.value}>Your location</Text>
            </View>
            <View style={styles.straightLine}/>
            <Text style={styles.label}>Note from customer:</Text>
            <Text style={styles.value}>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae eleifend ac.</Text>
          </View>
        </View>

        <View style={styles?.horizontalLine} />

        {/* Cost Breakdown Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost Breakdown</Text>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Straight Hair</Text>
              <Text style={styles.value}>$60.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Visiting Charges</Text>
              <Text style={styles.value}>$10.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.totalLabel]}>Total</Text>
              <Text style={[styles.value, styles.totalValue]}>$70.00</Text>
            </View>
          </View>
        </View>

        <View style={[styles?.horizontalLine, {marginVertical: 10}]} />

        {/* Address Section */}
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.mapContainer}>
          <Image source={Images.MapImage2} style={styles.mapImage} />
          <View style={styles.locationAddress}>
            <View>
              <Text style={styles.locationName}>Location Name</Text>
              <Text style={styles.locationNameAdd}>
                Scheme no. 78 Vijay nagar indore
              </Text>
            </View>
            <Image source={Images.EditPen} style={styles.backIcon} />
          </View>
        </View>

        {/* Payment Method Section */}
        {/* <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethodContainer}>
          <View style={styles.methodDetails}>
            <Image
              resizeMode="contain"
              source={Images?.cardPayment}
              style={styles.cardIcons}
            />
            <Text style={styles.methodText}>{'********** 5334'}</Text>
          </View>
        </View> */}
        <View style={{marginTop:mobileW*3/100}}/>

        <CommonButton title={'Accept'} />

        <CommonButton
          title={'Reschedule'}
          buttonStyle={{backgroundColor: Colors.semiPurpleLight}}
          textStyle={{color: Colors.primary}}
        />

        <CommonButton
          title={'Amend'}
          buttonStyle={{backgroundColor: Colors.semiPurpleLight}}
          textStyle={{color: Colors.primary}}
        />

        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Reject</Text>
        </TouchableOpacity>

        <View style={{marginTop: (mobileH * 5) / 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Scrollcontainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 5) / 100,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F3D56',
    alignSelf: 'center',
    marginBottom: 24,
  },
  section: {
    marginVertical: 14,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 8,
  },
  infoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#3F3D56',
  },
  value: {
    fontSize: 14,
    color: '#3F3D56',
    fontWeight: '600',
  },
  emailPhone: {
    fontSize: (mobileW * 3) / 100,
    color: Colors.darkGrey,
    fontWeight: '600',
  },
  price: {
    color: Colors.primary,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  mapContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (mobileW * 2) / 100,
    elevation: 3,
    marginTop: (mobileW * 5) / 100,
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  mapImage: {
    width: (mobileW * 90) / 100,
    height: (mobileW * 40) / 100,
    borderTopLeftRadius: (mobileW * 2.3) / 100,
    borderTopRightRadius: (mobileW * 2.3) / 100,
  },
  locationName: {fontSize: (mobileW * 4) / 100, color: '#000'},
  locationNameAdd: {
    fontSize: (mobileW * 2.8) / 100,
    color: '#000',
    marginTop: (mobileW * 1) / 100,
  },
  locationAddress: {
    width: (mobileW * 90) / 100,
    paddingHorizontal: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: (mobileW * 2.3) / 100,
    borderBottomRightRadius: (mobileW * 2.3) / 100,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F6',
    borderRadius: 8,
    padding: 16,
  },
  paymentText: {
    fontSize: 14,
    color: '#3F3D56',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  rescheduleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  rescheduleText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  cancelText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  straightLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 3) / 100,
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
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  horizontalLine: {
    height: DimensionsConfig?.screenHeight * 0.001,
    width: '98%',
    backgroundColor: '#E7E7E7',
    marginTop: 10,
    alignSelf: 'center',
  },
  professionalImage: {
    width: (mobileW * 20) / 100,
    height: (mobileW * 20) / 100,
    borderRadius: (mobileW * 10) / 100,
  },
  ratingText: {
    fontSize: (mobileW * 3.5) / 100,
    color: '#333',
    marginLeft: 4,
  },
});

export default OrderDetailScreen;
