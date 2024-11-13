import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const paymentMethods = [
  {
    id: '1',
    icon: Images.applePayment,
    number: 'Apple Pay',
  },
  {
    id: '2',
    icon: Images.cardPayment,
    number: 'Debit/Credit Card',
  },
  {
    id: '3',
    icon: Images.GiftPayment,
    number: 'Gift Card',
  },
  {
    id: '4',
    icon: Images.paypalPayment,
    number: 'Paypal',
  },
  {
    id: '5',
    icon: Images.CreditPayment,
    number: 'Credit',
  },
];

const PaymentMethod = ({ navigation, ...props }) => {
  const renderPaymentMethod = ({ item }) => {
    return (
      <View style={styles.paymentMethodContainer}>
        <View style={styles.methodDetails}>
          <Image
            resizeMode="contain"
            source={item.icon}
            style={styles.cardIcons}
          />
          <Text style={styles.methodText}>{item.number}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddCard');
          }}
        >
          <Image
            resizeMode="contain"
            source={Images.forwardIcon}
            style={styles.forwardIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          props?.route?.params?.type == 'Add' && { justifyContent: 'center' },
        ]}
      >
        {props?.route?.params?.type == 'Add' ? null : (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={Images.BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {props?.route?.params?.type == 'Add'
            ? 'Add Payment Method'
            : 'Select Payment Method'}
        </Text>
        <TouchableOpacity>
          <Image style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {/* Payment Method List */}
      <View style={{ paddingHorizontal: (mobileW * 5) / 100 }}>
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 10,
            marginTop: (mobileW * 5) / 100,
          }}
        />
      </View>

      {/* Add Later Button */}
      {props?.route?.params?.type == 'Add' && (
        <TouchableOpacity
          style={styles.addLaterButton}
          onPress={() => {
            navigation.navigate('MainApp')
          }}
        >
          <Text style={styles.AddLaterTxt}>Add Later</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 6) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  cardIcons: {
    width: (mobileW * 9) / 100,
    height: (mobileW * 9) / 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
  AddLaterTxt: {
    color: Colors?.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 3) / 100,
    backgroundColor: '#ffffff',
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  addLaterButton: {
    position: 'absolute',
    bottom: 25, 
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default PaymentMethod;
